/**
 * Copyright © 2020 2021 2022 7thCode.(http://seventh-code.com/)
 * This software is released under the MIT License.
 * opensource.org/licenses/mit-license.php
 */

"use strict";

/**
 * BaseParser
 * @remarks
 */
abstract class BaseParser {

    protected stream: ParserStream;
    protected handler: BaseHandler | null;

    /**
     *
     * @remarks
     */
    constructor(handler: BaseHandler | null, stream: ParserStream) {
        this.stream = stream;
        this.handler = handler;
    }

    /**
     * is_s
     * s ::=  | \t
     */
    protected is_s(): boolean {
        const code: number = this.stream.charCode();
        return (code === 32) || (code === 9);
    }

    /**
     * is_s
     *
     * S ::= ( " " | tab ) *
     *
     * @remarks Spaces or Tabs
     */
    protected parse_s(): boolean {
        let result: boolean = false;
        while (this.is_s()) {
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
    protected is_terminal(): boolean {
        return this.stream.is_terminal();
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
                this.stream.next();
                result = true;
                break;
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
        if (this.handler) {
            this.handler.symbol("index", this.stream);
        }
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
        if (this.is_reading()) {
            this.stream.next();
            result = true;
            while (this.is_trailing()) {
                this.stream.next();
                result = true;
            }
        }

        if (this.handler) {
            this.handler.symbol("name", this.stream);
        }
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
            this.stream.next();
            if (this.parse_name()) {
                if ((this.is_char("'") || this.is_char('"'))) {
                    this.stream.next();
                    result = true;
                }
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
            this.stream.next();
            result = this.parse_name();
        } else {
            if (this.is_char("[")) {
                this.stream.next();
                if (this.parse_string() || this.parse_number()) {
                    if (this.is_char("]")) {
                        this.stream.next();
                        result = true;
                    }
                }
            }
        }
        return result;
    }

    /**
     * parse_path
     * path ::= attr *
     */
    public parse_path(): boolean {
        let result: boolean = false;
        this.stream.commit();
        while (this.parse_attr()) {
            result = (this.is_terminal());
        }
        return result;
    }

}


module.exports = {BaseParser, AttributeParser};