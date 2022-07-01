/**
 * Copyright © 2020 2021 2022 7thCode.(http://seventh-code.com/)
 * This software is released under the MIT License.
 * opensource.org/licenses/mit-license.php
 */

"use strict";

/**
 * isNumber
 *
 * @remarks
 * 値が数か
 *
 * @param value - 値
 * @returns 数か
 */
function isNumber(value: unknown): boolean {
    return ((typeof value === 'number') && (isFinite(value)));
}

/**
 * isObject
 *
 * @remarks
 * 値がオブジェクトか.
 * [],{}はオブジェクト。
 *
 * @param value - 値
 * @returns オブジェクトか
 */
function isObject(value: unknown): boolean {
    return ((value !== null) && (typeof value === 'object'));
}

/**
 */
class ParserStream {

    private start: number = 0;
    private end: number = 0;
    private value: string = "";

    /**
     　*
     　* @remarks
     　*/
    constructor(value: string) {
        this.value = value;
    }

    /**
     　* commit
     　*
     　* @remarks パース済み終端を決定
     　*/
    public commit(): void {
        this.start = this.end;
    }

    /**
     　* rollback
     　*
     　* @remarks パース済み終端を決定時点まで復元
     　*/
    public rollback(): void {
        this.end = this.start;
    }

    /**
     　* next
     　*
     　* @remarks パース済み終端を一文字進める
     　*/
    public next(): void {
        this.end++;
    }

    /**
     　* charCode
     　*
     　* @remarks 現状の文字コード
     　*/
    public charCode(): number {
        return this.value.charCodeAt(this.end);
    }

    /**
     　* char
     　*
     　* @remarks 現状の文字
     　*/
    public char(): string {
        return this.value.charAt(this.end);
    }

    /**
     * current
     *
     * @remarks 現状の文字列
     */
    public current(): string {
        return this.value.substring(this.start, this.end);
    }
}

/**
 * BaseParser
 * @remarks
 */
abstract class BaseParser {

    protected stream: ParserStream;
    protected handler: BaseHandler;

    /**
     *
     * @remarks
     */
    constructor(handler: BaseHandler, stream: ParserStream) {
        this.stream = stream;
        this.handler = handler;
    }

    /**
     * is_s
     *
     * S ::= ( " " | tab ) *
     *
     * @remarks Spaces or Tabs
     */
    protected is_s(): boolean {
        let result: boolean = false;
        const code: number = this.stream.charCode();
        while (((code === 32) || (code === 9))) {
            this.stream.next();
            result = true;
        }
        return result;
    }

    /**
     * is_char
     *
     * @param c
     *
     * @remarks 文字を比較
     */
    protected is_char(c: string): boolean {
        let result: boolean = false;
        const char: string = this.stream.char();
        if (char === c) {
            this.stream.next();
            result = true;
        }
        return result;
    }

    /**
     * is_symbol
     * @remarks
     */
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

    /**
     * is_digit
     * digit ::= ( 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 )
     */
    protected is_digit(): boolean {
        const code: number = this.stream.charCode();
        return ((48 <= code) && (code <= 57));
    }

    /**
     * parse_number
     * number ::= digit *
     */
    protected parse_number(): boolean {
        let result: boolean = false;
        this.stream.commit();
        while (this.is_digit()) {
            this.stream.next();
            result = true;
        }
        this.handler.symbol("index", this.stream);
        return result;
    }
}

/**
 */
class AttributeParser extends BaseParser {

    /**
     * is_reading
     * reading ::= ( alpha | "_" | "$" ) *
     */
    protected is_reading(): boolean {
        const code: number = this.stream.charCode();
        return (((0x3040 <= code) && (code <= 0x2FFFF)) || //
            ((65 <= code) && (code <= 90)) || ((97 <= code) && (code <= 122)) || // Alphabet
            (code === 95) || (code === 36)); // _ $
    }

    /**
     * is_trailing
     * trailing ::= ( alpha | "_" | "$" | digit ) *
     */
    protected is_trailing(): boolean {
        const code: number = this.stream.charCode();
        return (((0x3040 <= code) && (code <= 0x2FFFF)) || //
            ((65 <= code) && (code <= 90)) || ((97 <= code) && (code <= 122)) || // Alphabet
            ((48 <= code) && (code <= 57)) || // Number
            (code === 95) || (code === 36)); // _ $
    }

    /**
     * parse_name
     * name ::= reading [ trailing ]
     */
    protected parse_name(): boolean {
        let result: boolean = false;
        this.stream.commit();
        while (this.is_reading()) {
            this.stream.next();
            result = true;
        }
        while (this.is_trailing()) {
            this.stream.next();
            result = true;
        }
        this.handler.symbol("name", this.stream);
        return result;
    }

    /**
     * parse_string
     * string = "'" mame "'" | '"' mame '"'
     */
    protected parse_string(): boolean {
        let result: boolean = false;
        this.stream.commit();
        if (this.is_char("'") || this.is_char('"')) {
            if (this.parse_name()) {
                result = (this.is_char("'") || this.is_char('"'));
            }
        }
        return result;
    }

    /**
     * parse_attr
     * attr ::= "." name | '[' string | number ']'
     */
    protected parse_attr(): boolean {
        let result: boolean = false;
        this.stream.commit();
        if (this.is_char(".")) {
            result = this.parse_name();
        } else {
            if (this.is_char("[")) {
                if (this.parse_string() || this.parse_number()) {
                    if (this.is_char("]")) {
                        result = true;
                    }
                }
            }
        }
        return result;
    }

    /**
     * parse_attrs
     * attrs ::= attr *
     */
    protected parse_attrs(): boolean {
        let result: boolean = false;
        this.stream.commit();
        while (this.parse_attr()) {
            result = true;
        }
        return result;
    }

    /**
     * parse_path
     * path ::= attr [ attrs ]
     */
    protected parse_path(): void {
        this.stream.commit();
        if (this.parse_attr()) {
            this.parse_attrs();
        }
    }

    /**
     * parse
     * @remarks
     */
    public parse(): void {
        this.parse_path();
    }
}


/**
 * BaseHandler
 * @remarks
 */
abstract class BaseHandler {
    abstract symbol(type: string, stream: ParserStream): void;
}

/**
 * ValueHandler
 * @remarks
 */
class ValueHandler extends BaseHandler {

    public value: any = null;

    /**
     *
     * @remarks
     */
    constructor(value: any) {
        super();
        this.value = value;
    }

    /**
     * Symbol Handler
     *
     * @remarks
     * ParserがSymbolを発見した
     *
     * @param type - Symbol Type
     * @param stream - ソースストリーム
     * @returns void
     *
     */
    public symbol(type: string, stream: ParserStream): void {
        switch (type) {
            case "index":
                this.value = this.sibling(this.value, stream.current());
                break;
            case "name":
                this.value = this.child(this.value, stream.current());
                break;
        }
    }

    /**
     * Sibling
     *
     * @remarks
     * 配列が発見された
     *
     * @param array - 配列
     * @param index - インデックス
     * @returns 配列要素
     *
     */
    public sibling(array: any[], index: string): any {
        let result: any;
        result = undefined;
        if (Array.isArray(array)) {
            return array[Number(index)];
        }
        return result;
    }

    /**
     * child
     *
     * @remarks
     * オブジェクトが発見された
     *
     * @param obj - オブジェクト
     * @param attr - 識別子
     * @returns 配列要素
     *
     */
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

/**
 * Helper
 */
class AttrPath {

    /**
     * traverse
     *
     * @remarks
     * オブジェクトのアトリビュートをトラバースしてその値を得る
     *
     * @param obj - オブジェクト
     * @param path - パス eg. ".x.Y.z[1]"
     * @returns 要素
     *
     */
    static traverse(obj: any, path: string): any {
        const handler: ValueHandler = new ValueHandler(obj);
        new AttributeParser(handler, new ParserStream(path)).parse();
        return handler.value;
    }

}

module.exports = AttrPath;

