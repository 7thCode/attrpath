/**
 * Copyright © 2020 2021 2022 7thCode.(http://seventh-code.com/)
 * This software is released under the MIT License.
 * opensource.org/licenses/mit-license.php
 */

"use strict";

import {isNumber, isContainer} from "./base";
import {AttributeParser, FormulaParser, ParserStream, BaseHandler, ValueHandler} from './index';
import {AttrPath} from './index';

describe('base', () => {
    it('base', () => {
        expect(isNumber(1)).toBe(true);
        expect(isContainer({})).toBe(true);
        expect(isContainer({a: 1})).toBe(true);
        expect(isContainer([])).toBe(true);
        expect(isContainer([1])).toBe(true);
    });
});

/**
 * for test
 */
describe('attrpath', () => {
    it("AttributeParser", () => {

        class TestParser extends AttributeParser {

            constructor(handler: BaseHandler | null, stream: ParserStream) {
                super(handler, stream);
            }

            public is_s(): boolean {
                return super.is_s();
            }

            public parse_s(): boolean {
                return super.parse_s();
            }

            public is_terminal(): boolean {
                return super.is_terminal();
            }

            public is_char(c: string): boolean {
                return super.is_char(c);
            }

            public is_symbol(): boolean {
                return super.is_symbol();
            }

            public is_digit(): boolean {
                return super.is_digit();
            }

            public parse_number(): boolean {
                return super.parse_number();
            }

            public is_reading(): boolean {
                return super.is_reading();
            }

            public is_trailing(): boolean {
                return super.is_trailing();
            }

            public parse_name(): boolean {
                return super.parse_name();
            }

            public parse_string(): boolean {
                return super.parse_string();
            }

            public parse_attr(): boolean {
                return super.parse_attr();
            }

            public parse_path(): boolean {
                return super.parse_path();
            }

            // expr ::= term { { "+" | "-" } term } *
            public is_expr(): boolean {
                return super.is_expr();
            }

            // term ::= factor { { "*" | "/" } factor } *
            public is_term(): boolean {
                return super.is_term();
            }

            // factor ::= "(" expr ")" | number
            public is_factor(): boolean {
                return super.is_factor();
            }

        }

        expect(new TestParser(null, new ParserStream(" ")).is_s()).toBe(true);
        expect(new TestParser(null, new ParserStream(" ")).parse_s()).toBe(true);
        expect(new TestParser(null, new ParserStream("")).is_terminal()).toBe(true);
        expect(new TestParser(null, new ParserStream("A")).is_char("A")).toBe(true);
        expect(new TestParser(null, new ParserStream(".")).is_symbol()).toBe(true);
        expect(new TestParser(null, new ParserStream("0")).is_digit()).toBe(true);
        expect(new TestParser(null, new ParserStream("123456")).parse_number()).toBe(true);
        expect(new TestParser(null, new ParserStream("A")).is_reading()).toBe(true);
        expect(new TestParser(null, new ParserStream('z')).is_reading()).toBe(true);
        expect(new TestParser(null, new ParserStream(String.fromCharCode(0x2FFFF))).is_reading()).toBe(true);
        expect(new TestParser(null, new ParserStream("0")).is_reading()).toBe(false);
        expect(new TestParser(null, new ParserStream("_")).is_reading()).toBe(true);
        expect(new TestParser(null, new ParserStream("$")).is_reading()).toBe(true);
        expect(new TestParser(null, new ParserStream("A")).is_trailing()).toBe(true);
        expect(new TestParser(null, new ParserStream('z')).is_trailing()).toBe(true);
        expect(new TestParser(null, new ParserStream(String.fromCharCode(0x2FFFF))).is_trailing()).toBe(true);
        expect(new TestParser(null, new ParserStream("0")).is_trailing()).toBe(true);
        expect(new TestParser(null, new ParserStream("_")).is_trailing()).toBe(true);
        expect(new TestParser(null, new ParserStream("$")).is_trailing()).toBe(true);
        expect(new TestParser(null, new ParserStream("ABCDE")).parse_name()).toBe(true);
        expect(new TestParser(null, new ParserStream("1BCDE")).parse_name()).toBe(false);
        expect(new TestParser(null, new ParserStream("'ABCDE'")).parse_string()).toBe(true);
        expect(new TestParser(null, new ParserStream('"ABCDE"')).parse_string()).toBe(true);
        expect(new TestParser(null, new ParserStream(".ABCDE")).parse_attr()).toBe(true);
        expect(new TestParser(null, new ParserStream("[0]")).parse_attr()).toBe(true);
        expect(new TestParser(null, new ParserStream("['ABC']")).parse_attr()).toBe(true);
        expect(new TestParser(null, new ParserStream('["ABC"]')).parse_attr()).toBe(true);
        expect(new TestParser(null, new ParserStream(".ABCDE")).parse_path()).toBe(true);
        expect(new TestParser(null, new ParserStream(".ABCDE.XYZ")).parse_path()).toBe(true);
        expect(new TestParser(null, new ParserStream(".ABCDE.XYZ[0]")).parse_path()).toBe(true);
    });

    it("FormulaParser", () => {

        const _handler: ValueHandler = new ValueHandler({});

        class FormParser extends AttributeParser {

            constructor(handler: BaseHandler | null, stream: ParserStream) {
                super(handler, stream);
            }

            // factor ::= "(" expr ")" | number
            public is_factor(): boolean {
                return super.is_factor();
            }

        }

        expect(new FormParser(_handler, new ParserStream("1")).is_factor()).toBe(true);
        expect(new FormParser(_handler, new ParserStream("1+1")).is_factor()).toBe(true);
        expect(new FormParser(_handler, new ParserStream("1-1")).is_factor()).toBe(true);
        expect(new FormParser(_handler, new ParserStream("1*1")).is_factor()).toBe(true);
        expect(new FormParser(_handler, new ParserStream("1/1")).is_factor()).toBe(true);
        expect(new FormParser(_handler, new ParserStream("(1+1)")).is_factor()).toBe(true);
        expect(new FormParser(_handler, new ParserStream("(1+1+1)")).is_factor()).toBe(true);
        expect(new FormParser(_handler, new ParserStream("(1+1-1)")).is_factor()).toBe(true);
        expect(new FormParser(_handler, new ParserStream("(1+(1-1))")).is_factor()).toBe(true);
        expect(new FormParser(_handler, new ParserStream("(1+(1-1))/1")).is_factor()).toBe(true);
        expect(new FormParser(_handler, new ParserStream("(1+(1-1)")).is_factor()).toBe(false);
        expect(new FormParser(_handler, new ParserStream(" ( 1 + ( 1 - 1 ) ) / 1 ")).is_factor()).toBe(true);
    });



});

/*
*
* ESModules
*
* */
describe('attrpath(ESModule)', () => {
    it('ESModule', () => {


        const value = {
            children: {
                john: {
                    hobby: [{name: "Cycling"}, {name: "Dance"}],
                    pet: [{type: "dog", name: "Max"}]
                },
                tom: {
                    hobby: [{name: "Squash"}],
                    pet: [{type: "cat", name: "Chloe"}]
                }
            }
        };

        expect(AttrPath.traverse(value, '.children')).toStrictEqual({"john": {"hobby": [{"name": "Cycling"}, {"name": "Dance"}], "pet": [{"type": "dog", "name": "Max"}]}, "tom": {"hobby": [{"name": "Squash"}], "pet": [{"type": "cat", "name": "Chloe"}]}});
        expect(AttrPath.traverse(value, '.children.john')).toStrictEqual({"hobby": [{"name": "Cycling"}, {"name": "Dance"}], "pet": [{"type": "dog", "name": "Max"}]});
        expect(AttrPath.traverse(value, '.children.john.hobby')).toStrictEqual([{"name": "Cycling"}, {"name": "Dance"}]);
        expect(AttrPath.traverse(value, '.children.john.hobby[0]')).toStrictEqual({"name": "Cycling"});
        expect(AttrPath.traverse(value, '.children.john.hobby[0].name')).toBe("Cycling");
        expect(AttrPath.traverse(value, '.children.john.hobby[0a].name')).toBeUndefined();
        expect(AttrPath.traverse(value, '.children.john.hobby[1].name')).toBe("Dance");
        expect(AttrPath.traverse(value, '.children.john.pet[0].type')).toBe("dog");
        expect(AttrPath.traverse(value, '.children.john.pet[0].name')).toBe("Max");
        expect(AttrPath.traverse(value, '.children.tom.hobby[0].name')).toBe("Squash");
        expect(AttrPath.traverse(value, '.children.tom.pet[0].type')).toBe("cat");
        expect(AttrPath.traverse(value, '.children.tom.pet[0].name')).toBe("Chloe");
        expect(AttrPath.traverse(value, '.children.john.hobby["0"].name')).toBeUndefined();
        expect(AttrPath.traverse(value, '.children["john"].hobby[0].name')).toBe("Cycling");
        expect(AttrPath.traverse(value, '.children["john"].hobby[0]["name"]')).toBe("Cycling");
        expect(AttrPath.traverse(value, '["children"]["john"].hobby[0].name')).toBe("Cycling");
        expect(AttrPath.traverse(value, '.children["john"].hobby[0].name')).toBe("Cycling");
        expect(AttrPath.traverse(value, '["children"]["john"]["hobby"][0]["name"]')).toBe("Cycling");
        expect(AttrPath.traverse(value, '["children"]["john"]["hobby"][0].["name"]')).toBeUndefined();
        expect(AttrPath.traverse(value, '["children"]["john"]["hobby"][0]["name"]')).toBe("Cycling");
        expect(AttrPath.traverse(value, '.children["john"].hobby[1].name')).toBe("Dance");
        expect(AttrPath.is_valid('.children["john"].hobby[1].name')).toBe(true);
        expect(AttrPath.is_valid('.children["john"].hobby[1a].name')).toBe(false);
        expect(AttrPath.is_valid('.children["john"].hobby["1"].name')).toBe(false);
    });
});

/*
*
* ESModules
*
* */
describe('attrpath(ESModule)', () => {
    it('ESModule(2)', () => {

        const value = {
            children: {
                john: {
                    hobby: [{name: "Cycling"}, {name: "Dance"}],
                    pet: [{type: "dog", name: "Max"}]
                },
                tom: {
                    hobby: [{name: "Squash"}],
                    pet: [{type: "cat", name: "Chloe"}]
                }
            }
        };

        function Traverse(obj: any, path: string): any {
            let result = undefined;
            const _handler = new ValueHandler(obj);
            if (new AttributeParser(_handler, new ParserStream(path)).parse_path()) {
                result = _handler.value;
            }
            return result;
        }

        function isValid(path: string): any {
            return new AttributeParser(null, new ParserStream(path)).parse_path();
        }

        expect(Traverse(value, '.children')).toStrictEqual({"john": {"hobby": [{"name": "Cycling"}, {"name": "Dance"}], "pet": [{"type": "dog", "name": "Max"}]}, "tom": {"hobby": [{"name": "Squash"}], "pet": [{"type": "cat", "name": "Chloe"}]}});
        expect(Traverse(value, '.children.john')).toStrictEqual({"hobby": [{"name": "Cycling"}, {"name": "Dance"}], "pet": [{"type": "dog", "name": "Max"}]});
        expect(Traverse(value, '.children.john.hobby')).toStrictEqual([{"name": "Cycling"}, {"name": "Dance"}]);
        expect(Traverse(value, '.children.john.hobby[0]')).toStrictEqual({"name": "Cycling"});
        expect(Traverse(value, '.children.john.hobby[0].name')).toBe("Cycling");
        expect(Traverse(value, '.children.john.hobby[0a].name')).toBeUndefined();
        expect(Traverse(value, '.children.john.hobby[1].name')).toBe("Dance");
        expect(Traverse(value, '.children.john.pet[0].type')).toBe("dog");
        expect(Traverse(value, '.children.john.pet[0].name')).toBe("Max");
        expect(Traverse(value, '.children.tom.hobby[0].name')).toBe("Squash");
        expect(Traverse(value, '.children.tom.pet[0].type')).toBe("cat");
        expect(Traverse(value, '.children.tom.pet[0].name')).toBe("Chloe");
        expect(Traverse(value, '.children.john.hobby["0"].name')).toBeUndefined();
        expect(Traverse(value, '.children["john"].hobby[0].name')).toBe("Cycling");
        expect(Traverse(value, '.children["john"].hobby[0]["name"]')).toBe("Cycling");
        expect(Traverse(value, '["children"]["john"].hobby[0].name')).toBe("Cycling");
        expect(Traverse(value, '.children["john"].hobby[0].name')).toBe("Cycling");
        expect(Traverse(value, '["children"]["john"]["hobby"][0]["name"]')).toBe("Cycling");
        expect(Traverse(value, '["children"]["john"]["hobby"][0].["name"]')).toBeUndefined();
        expect(Traverse(value, '["children"]["john"]["hobby"][0]["name"]')).toBe("Cycling");
        expect(Traverse(value, '.children["john"].hobby[1].name')).toBe("Dance");
        expect(isValid('.children["john"].hobby[1].name')).toBe(true);
        expect(isValid('.children["john"].hobby[1a].name')).toBe(false);
        expect(isValid('.children["john"].hobby["1"].name')).toBe(false);

    });
});

/*
*
* CommonJS
*
* */
describe('attrpath(CommonJS)', () => {
    it('CommonJS(1)', () => {

        const {AttrPath} = require('./index');

        const value = {
            children: {
                john: {
                    hobby: [{name: "Cycling"}, {name: "Dance"}],
                    pet: [{type: "dog", name: "Max"}]
                },
                tom: {
                    hobby: [{name: "Squash"}],
                    pet: [{type: "cat", name: "Chloe"}]
                }
            }
        };

        expect(AttrPath.traverse(value, '.children')).toStrictEqual({"john": {"hobby": [{"name": "Cycling"}, {"name": "Dance"}], "pet": [{"type": "dog", "name": "Max"}]}, "tom": {"hobby": [{"name": "Squash"}], "pet": [{"type": "cat", "name": "Chloe"}]}});
        expect(AttrPath.traverse(value, '.children.john')).toStrictEqual({"hobby": [{"name": "Cycling"}, {"name": "Dance"}], "pet": [{"type": "dog", "name": "Max"}]});
        expect(AttrPath.traverse(value, '.children.john.hobby')).toStrictEqual([{"name": "Cycling"}, {"name": "Dance"}]);
        expect(AttrPath.traverse(value, '.children.john.hobby[0]')).toStrictEqual({"name": "Cycling"});
        expect(AttrPath.traverse(value, '.children.john.hobby[0].name')).toBe("Cycling");
        expect(AttrPath.traverse(value, '.children.john.hobby[0a].name')).toBeUndefined();
        expect(AttrPath.traverse(value, '.children.john.hobby[1].name')).toBe("Dance");
        expect(AttrPath.traverse(value, '.children.john.pet[0].type')).toBe("dog");
        expect(AttrPath.traverse(value, '.children.john.pet[0].name')).toBe("Max");
        expect(AttrPath.traverse(value, '.children.tom.hobby[0].name')).toBe("Squash");
        expect(AttrPath.traverse(value, '.children.tom.pet[0].type')).toBe("cat");
        expect(AttrPath.traverse(value, '.children.tom.pet[0].name')).toBe("Chloe")
        expect(AttrPath.traverse(value, '.children.john.hobby["0"].name')).toBeUndefined();
        expect(AttrPath.traverse(value, '.children["john"].hobby[0].name')).toBe("Cycling");
        expect(AttrPath.traverse(value, '.children["john"].hobby[0]["name"]')).toBe("Cycling");
        expect(AttrPath.traverse(value, '["children"]["john"].hobby[0].name')).toBe("Cycling");
        expect(AttrPath.traverse(value, '.children["john"].hobby[0].name')).toBe("Cycling");
        expect(AttrPath.traverse(value, '["children"]["john"]["hobby"][0]["name"]')).toBe("Cycling");
        expect(AttrPath.traverse(value, '["children"]["john"]["hobby"][0].["name"]')).toBeUndefined();
        expect(AttrPath.traverse(value, '["children"]["john"]["hobby"][0]["name"]')).toBe("Cycling");
        expect(AttrPath.traverse(value, '.children["john"].hobby[1].name')).toBe("Dance");
    });
});

/*
*
* CommonJS
*
* */
describe('attrpath(CommonJS)', () => {
    it('CommonJS(2)', () => {

        const {AttributeParser, ValueHandler, ParserStream} = require('./index');

        const value = {
            children: {
                john: {
                    hobby: [{name: "Cycling"}, {name: "Dance"}],
                    pet: [{type: "dog", name: "Max"}]
                },
                tom: {
                    hobby: [{name: "Squash"}],
                    pet: [{type: "cat", name: "Chloe"}]
                }
            }
        };

        function Traverse(obj: any, path: string): any {
            let result = undefined;
            const _handler = new ValueHandler(obj);
            if (new AttributeParser(_handler, new ParserStream(path)).parse_path()) {
                result = _handler.value;
            }
            return result;
        }

        function isValid(path: string): any {
            return new AttributeParser(null, new ParserStream(path)).parse_path();
        }

        expect(Traverse(value, '.children')).toStrictEqual({"john": {"hobby": [{"name": "Cycling"}, {"name": "Dance"}], "pet": [{"type": "dog", "name": "Max"}]}, "tom": {"hobby": [{"name": "Squash"}], "pet": [{"type": "cat", "name": "Chloe"}]}});
        expect(Traverse(value, '.children.john')).toStrictEqual({"hobby": [{"name": "Cycling"}, {"name": "Dance"}], "pet": [{"type": "dog", "name": "Max"}]});
        expect(Traverse(value, '.children.john.hobby')).toStrictEqual([{"name": "Cycling"}, {"name": "Dance"}]);
        expect(Traverse(value, '.children.john.hobby[0]')).toStrictEqual({"name": "Cycling"});
        expect(Traverse(value, '.children.john.hobby[0].name')).toBe("Cycling");
        expect(Traverse(value, '.children.john.hobby[0a].name')).toBeUndefined();
        expect(Traverse(value, '.children.john.hobby[1].name')).toBe("Dance");
        expect(Traverse(value, '.children.john.pet[0].type')).toBe("dog");
        expect(Traverse(value, '.children.john.pet[0].name')).toBe("Max");
        expect(Traverse(value, '.children.tom.hobby[0].name')).toBe("Squash");
        expect(Traverse(value, '.children.tom.pet[0].type')).toBe("cat");
        expect(Traverse(value, '.children.tom.pet[0].name')).toBe("Chloe")
        expect(Traverse(value, '.children.john.hobby["0"].name')).toBeUndefined();
        expect(Traverse(value, '.children["john"].hobby[0].name')).toBe("Cycling");
        expect(Traverse(value, '.children["john"].hobby[0]["name"]')).toBe("Cycling");
        expect(Traverse(value, '["children"]["john"].hobby[0].name')).toBe("Cycling");
        expect(Traverse(value, '.children["john"].hobby[0].name')).toBe("Cycling");
        expect(Traverse(value, '["children"]["john"]["hobby"][0]["name"]')).toBe("Cycling");
        expect(Traverse(value, '["children"]["john"]["hobby"][0].["name"]')).toBeUndefined();
        expect(Traverse(value, '["children"]["john"]["hobby"][0]["name"]')).toBe("Cycling");
        expect(Traverse(value, '.children["john"].hobby[1].name')).toBe("Dance");
        expect(isValid('.children["john"].hobby[1].name')).toBe(true);
        expect(isValid('.children["john"].hobby[1a].name')).toBe(false);
        expect(isValid('.children["john"].hobby["1"].name')).toBe(false);
    });
});