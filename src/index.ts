"use strict";

function isNumber(value: unknown): boolean {
    return ((typeof value === 'number') && (isFinite(value)));
}

function isObject(value: unknown): boolean {
    return ((value !== null) && (typeof value === 'object'));
}

class ParserStream {

    private start: number = 0;
    private end: number = 0;
    private value: string = "";

    constructor(value: string) {
        this.value = value;
    }

    public commit(): void {
        this.start = this.end;
    }

    public rollback(): void {
        this.end = this.start;
    }

    public next(): void {
        this.end++;
    }

    public charCode(): number {
        return this.value.charCodeAt(this.end);
    }

    public char(): string {
        return this.value.charAt(this.end);
    }

    public current(): string {
        return this.value.substring(this.start, this.end);
    }
}

class BaseParser {

    protected stream: ParserStream;
    protected handler: BaseHandler;

    constructor(handler: BaseHandler, stream: ParserStream) {
        this.stream = stream;
        this.handler = handler;
    }

    protected is_char(c: string): boolean {
        const char: string = this.stream.char();
        if (char === c) {
            this.stream.next();
            return true;
        } else {
            return false;
        }
    }

    protected is_symbol(): boolean {
        let result: boolean = false;
        const char: string = this.stream.char();
        switch (char) {
            case ".":
            case "[":
            case "]":
            case "'":
            case '"':
            case "+":
            case "-":
            case "*":
            case "/":
            case "%":
            case "~":
            case "&":
            case "|":
            case "^":
            case ">":
            case "<":
            case "!":
            case "=":
            case "`":
            case "(":
            case ")":
            case "{":
            case "}":
            case "?":
            case ":":
            case ";":
            case ",":
                break;
            default:
                this.stream.next();
                result = true;
        }
        return result;
    }

    // digit ::= ( 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 )
    protected is_digit(): boolean {
        const code: number = this.stream.charCode();
        if ((48 <= code) && (code <= 57)) {
            this.stream.next();
            return true;
        } else {
            return false;
        }
    }

    // number ::= digit *
    protected parse_number(): boolean {
        this.stream.commit();
        let result: boolean = false;
        for (; ;) {
            if (!this.is_digit()) {
                break;
            } else {
                result = true;
            }
        }

        this.handler.symbol("index", this.stream);

        return result;
    }
}

class AttributeParser extends BaseParser {

    // reading ::= ( alpha | "_" | "$" ) *
    protected is_reading(): boolean {
        const code: number = this.stream.charCode();
        const char: string = this.stream.char();
        if (((0x3040 <= code) && (code <= 0x2FFFF)) || //
            ((65 <= code) && (code <= 90)) || ((97 <= code) && (code <= 122)) || // Alphabet
            (char === "_") || (char === "$")) {
            this.stream.next();
            return true;
        } else {
            return false;
        }
    }

    // trailing ::= ( alpha | "_" | "$" | digit ) *
    protected is_trailing(): boolean {
        const code: number = this.stream.charCode();
        const char: string = this.stream.char();
        if (((0x3040 <= code) && (code <= 0x2FFFF)) || //
            ((65 <= code) && (code <= 90)) || ((97 <= code) && (code <= 122)) || // Alphabet
            ((48 <= code) && (code <= 57)) || // Number
            (char === "_") || (char === "$")) {
            this.stream.next();
            return true;
        } else {
            return false;
        }
    }

    // name ::= reading [ trailing ]
    protected parse_name(): boolean {
        this.stream.commit();
        let result: boolean = false;
        for (; ;) {
            if (!this.is_reading()) {
                break;
            } else {
                result = true;
            }
        }
        for (; ;) {
            if (!this.is_trailing()) {
                break;
            } else {
                result = true;
            }
        }

        this.handler.symbol("name", this.stream);

        return result;
    }

    // string = "'" mame "'" | '"' mame '"'
    protected parse_string(): boolean {
        this.stream.commit();
        let result: boolean = false;
        if (this.is_char("'") || this.is_char('"')) {
            if (this.parse_name()) {
                result = (this.is_char("'") || this.is_char('"'))
            }
        }
        return result;
    }

    // attr ::= "." name | '[' string | number ']'
    protected parse_attr(): boolean {
        this.stream.commit();
        let result: boolean = false;
        if (this.is_char(".")) {
            result = this.parse_name();
        } else {
            if (this.is_char("[")) {
                if (this.parse_string() || this.parse_number()) {
                    if (this.is_char("]")) {
                        result = true;
                    } else {
                        this.stream.rollback();
                    }
                } else {
                    this.stream.rollback();
                }
            } else {
                this.stream.rollback();
            }
        }
        return result;
    }

    // attrs ::= attr *
    protected parse_attrs(): void {
        this.stream.commit();
        for (; ;) {
            if (!this.parse_attr()) {
                this.stream.rollback();
                break;
            }
        }
    }

    // path ::= attr [ attrs ]
    protected parse_path(): void {
        this.stream.commit();
        if (this.parse_attr()) {
            this.parse_attrs();
        }
    }

    public parse(): void {
        this.parse_path();
    }
}



abstract class BaseHandler {
    abstract symbol(type: string, stream: ParserStream): void;
}


class ValueHandler extends BaseHandler {

    public value: any = null;

    constructor(value: any) {
        super();
        this.value = value;
    }

    public symbol(type: string, stream: ParserStream): void {
        switch (type) {
            case "index":
                const index = stream.current()
                this.value = this.sibling(this.value, stream.current());
                break;
            case "name":
                this.value = this.child(this.value, stream.current());
                break;
        }
    }

    public sibling(array: any[], index: string): any {
        let result: any;
        result = undefined;
        if (Array.isArray(array)) {
            return array[Number(index)];
        }
        return result;
    }

    public child(obj: any, attr: string): any {
        let result: any;
        result = undefined;
        if (isObject(obj)) {
            if (attr in obj) {
                result = obj[attr];
            }
        }
        return result;
    }

}

class AttrPath {

    static traverse(obj: any, path: string): any {
        const handler: ValueHandler = new ValueHandler(obj);
        new AttributeParser(handler, new ParserStream(path)).parse();
        return handler.value;
    }

}

module.exports = AttrPath;

