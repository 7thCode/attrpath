/**
 * Copyright © 2020 2021 2022 7thCode.(http://seventh-code.com/)
 * This software is released under the MIT License.
 * opensource.org/licenses/mit-license.php
 */

"use strict";

import {isContainer, isNumber, isValue} from "./base";
import {AttributeParser, AttrPath, BaseHandler, FormulaParser, ParserStream, ValueHandler} from './index';
import {Updater} from "./handler";

describe('base', () => {

	it('base', () => {
		expect(isNumber(1)).toBe(true);
		expect(isContainer({})).toBe(true);
		expect(isContainer({a: 1})).toBe(true);
		expect(isContainer([])).toBe(true);
		expect(isContainer([1])).toBe(true);
		expect(isValue({})).toBe(true);
		expect(isValue(null)).toBe(false);
		expect(isValue(undefined)).toBe(false);
	});

});

/**
 * for test
 */
describe('Parts', () => {

	it("ValueHandler", () => {

		class TestHandler extends ValueHandler {
			public static sibling(array: any[], index: string): any {
				return ValueHandler.sibling(array, index);
			}

			public static child(obj: any, index: string): any {
				return ValueHandler.child(obj, index);
			}
		}

		expect(TestHandler.sibling([1, 2, 3, 4, 5], '2')).toStrictEqual(3);
		expect(TestHandler.child({a: 1, b: 2, c: 3}, 'b')).toStrictEqual(2);

		const handler = new ValueHandler({a: "1"});
		expect(handler.value).toStrictEqual({a: "1"});
	});

	it("ParserStream", () => {

		const stream = new ParserStream("0123456789");
		expect(stream.char).toBe("0");
		expect(stream.charCode).toBe(48);

		stream.next();

		expect(stream.char).toBe("1");
		expect(stream.charCode).toBe(49);

		stream.restore_point();
		stream.next();
		stream.next();
		stream.next();

		expect(stream.current).toBe("123");

		stream.restore_point();
		stream.next();
		stream.next();
		stream.next();

		expect(stream.current).toBe("456");

		stream.restore();
		stream.next();
		stream.next();
		stream.next();

		expect(stream.current).toBe("456");

		expect(stream.is_terminal).toBe(false);

		stream.next();
		stream.next();

		expect(stream.is_terminal).toBe(false);

		stream.next();

		expect(stream.is_terminal).toBe(true);

		expect(stream.current).toBe("456789");

		stream.next();

		expect(stream.is_terminal).toBe(true);

		stream.next();

		expect(stream.current).toBe("456789");

	});

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

			//public is_symbol(): boolean {
			//	return super.is_symbol();
			//}

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

			public is_subscript_trailing(): boolean {
				return super.is_subscript_trailing();
			}

			public parse_name(): boolean {
				return super.parse_name();
			}

			public parse_subscript_string(): boolean {
				return super.parse_subscript_string();
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
		//	expect(new TestParser(null, new ParserStream(".")).is_symbol()).toBe(true);
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
		expect(new TestParser(null, new ParserStream("'ABCDE'")).parse_subscript_string()).toBe(true);
		expect(new TestParser(null, new ParserStream('"ABCDE"')).parse_subscript_string()).toBe(true);
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
describe('ESModule', () => {

	it('Basic', () => {

		const value = {
			children: {
				john: {
					hobby: [{name: "Cycling"}, {name: "Dance"}],
					pet: [{type: "dog", name: "Max"}]
				},
				"花子": {
					hobby: [{name: "Squash"}],
					pet: [{type: "cat", name: "Chloe"}]
				}
			}
		};

		expect(AttrPath.traverse(value, '.children')).toStrictEqual({"john": {"hobby": [{"name": "Cycling"}, {"name": "Dance"}], "pet": [{"type": "dog", "name": "Max"}]}, "花子": {"hobby": [{"name": "Squash"}], "pet": [{"type": "cat", "name": "Chloe"}]}});
		expect(AttrPath.traverse(value, '.children.john')).toStrictEqual({"hobby": [{"name": "Cycling"}, {"name": "Dance"}], "pet": [{"type": "dog", "name": "Max"}]});
		expect(AttrPath.traverse(value, '.children.john.hobby')).toStrictEqual([{"name": "Cycling"}, {"name": "Dance"}]);
		expect(AttrPath.traverse(value, '.children.john.hobby[0]')).toStrictEqual({"name": "Cycling"});
		expect(AttrPath.traverse(value, '.children.john.hobby[0].name')).toBe("Cycling");
		expect(AttrPath.traverse(value, '.children.john.hobby[0a].name')).toBeUndefined();
		expect(AttrPath.traverse(value, '.children.john.hobby[1].name')).toBe("Dance");
		expect(AttrPath.traverse(value, '.children.john.pet[0].type')).toBe("dog");
		expect(AttrPath.traverse(value, '.children.john.pet[0].name')).toBe("Max");
		expect(AttrPath.traverse(value, '.children.花子.hobby[0].name')).toBe("Squash");
		expect(AttrPath.traverse(value, '.children.花子.pet[0].type')).toBe("cat");
		expect(AttrPath.traverse(value, '.children.花子.pet[0].name')).toBe("Chloe");
		expect(AttrPath.traverse(value, '.children.john.hobby["0"].name')).toBeUndefined();
		expect(AttrPath.traverse(value, '.children.john.hobby["0"].name', "no name")).toBe("no name");
		expect(AttrPath.traverse(value, '.children["john"].hobby[0].name')).toBe("Cycling");
		expect(AttrPath.traverse(value, '.children["john"].hobby[0]["name"]')).toBe("Cycling");
		expect(AttrPath.traverse(value, '["children"]["john"].hobby[0].name')).toBe("Cycling");
		expect(AttrPath.traverse(value, '.children["john"].hobby[0].name')).toBe("Cycling");
		expect(AttrPath.traverse(value, '["children"]["john"]["hobby"][0]["name"]')).toBe("Cycling");
		expect(AttrPath.traverse(value, '["children"]["john"]["hobby"][0].["name"]')).toBeUndefined();
		expect(AttrPath.traverse(value, '["children"]["john"]["hobby"][0]["name"]')).toBe("Cycling");
		expect(AttrPath.traverse(value, '.children["john"].hobby[1].name')).toBe("Dance");

		expect(AttrPath.traverse([1], '[0]')).toBe(1);
		expect(AttrPath.traverse(AttrPath.traverse(value, '.children.john'), '.hobby')).toStrictEqual([{"name": "Cycling"}, {"name": "Dance"}]);
		expect(AttrPath.traverse(null, '.path')).toBeUndefined();

		expect(AttrPath.traverse(null, '.path.path')).toBeUndefined();
		expect(AttrPath.traverse(null, '["path"]')).toBeUndefined();
		expect(AttrPath.traverse(null, '.path["path"]')).toBeUndefined();
		expect(AttrPath.traverse(null, '["0"]')).toBeUndefined();
		expect(AttrPath.traverse(null, '[0]')).toBeUndefined();
		expect(AttrPath.traverse([1, 2, 3], '[3]')).toBeUndefined();
		expect(AttrPath.traverse(undefined, '.path')).toBeUndefined();
		expect(AttrPath.traverse(false, '.path')).toBeUndefined();
		expect(AttrPath.traverse(true, '.path')).toBeUndefined();
		expect(AttrPath.traverse(NaN, '.path')).toBeUndefined();
		expect(AttrPath.traverse(Infinity, '.path')).toBeUndefined();
		expect(AttrPath.traverse(0, '.path')).toBeUndefined();
		expect(AttrPath.traverse(-1, '.path')).toBeUndefined();
		expect(AttrPath.traverse("", '.path')).toBeUndefined();
		expect(AttrPath.traverse("1", '.path')).toBeUndefined();
		expect(AttrPath.traverse([1], '.path')).toBeUndefined();
		expect(AttrPath.traverse({}, '.path')).toBeUndefined();
	});

	it('Key', () => {

		const value = {
			children1: {
				john2: {
					hobby: [{name: "Cycling"}, {name: "Dance"}],
					pet: [{type: "dog", name: "Max"}]
				},
				"花子2": {
					hobby: [{name: "Squash"}],
					pet: [{type: "cat", name: "Chloe"}]
				}
			}
		};

		expect(AttrPath.traverse(value, '.children1')).toStrictEqual({"john2": {"hobby": [{"name": "Cycling"}, {"name": "Dance"}], "pet": [{"type": "dog", "name": "Max"}]}, "花子2": {"hobby": [{"name": "Squash"}], "pet": [{"type": "cat", "name": "Chloe"}]}});
	});

	it("!'[]^`", () => {
		// "!" "'" "[" "]" "^" "`"
		const value = [
			{
				irrigal: {
					"contains!": [{name: "NG"}],
					"contains'": [{name: "NG"}],
					"contains[": [{name: "NG"}],
					"contains]": [{name: "NG"}],
					"contains^": [{name: "NG"}],
					"contains`": [{name: "NG"}],
				},
			}
		];
		expect(AttrPath.traverse(value, '[0].irrigal.contains![0].name')).toBeUndefined();
		expect(AttrPath.traverse(value, "[0].irrigal.contains'[0].name")).toBeUndefined();
		expect(AttrPath.traverse(value, '[0].irrigal.contains[[0].name')).toBeUndefined();
		expect(AttrPath.traverse(value, '[0].irrigal.contains][0].name')).toBeUndefined();
		expect(AttrPath.traverse(value, '[0].irrigal.contains^[0].name')).toBeUndefined();
		expect(AttrPath.traverse(value, '[0].irrigal.contains`[0].name')).toBeUndefined();
	});

	it('Symbol Value', () => {

		const symbol = Symbol();
		const value = [
			{
				john: {
					"hobby": [{name: symbol}, {name: "Dance"}],
					pet: [{type: "dog", name: "Max"}]
				},
			}
		];

		expect(AttrPath.traverse(value, '[0].john.hobby[0].name')).toBe(symbol);
	});

	it('Computed Key', () => {

		const name = "john";
		const value = {
			[name]: {
				hobby: [{name: "Cycling"}, {name: "Dance"}],
				pet: [{type: "dog", name: "Max"}]
			}
		};

		expect(AttrPath.traverse(value, '["john"]')).toBe(value[name]);
		expect(AttrPath.traverse(value, '["' + name + '"]')).toBe(value[name]);
		expect(AttrPath.traverse(value, '["john"]')).toStrictEqual({"hobby": [{"name": "Cycling"}, {"name": "Dance"}], "pet": [{"type": "dog", "name": "Max"}]});
	});

	it('A.B Key', () => {

		const value = {
			"john.data": {
				hobby: [{name: "Cycling"}, {name: "Dance"}],
				pet: [{type: "dog", name: "Max"}]
			}
		};

		expect(AttrPath.is_valid('["john.data"]')).toBe(true);
		expect(AttrPath.traverse(value, '["john.data"]')).toBe(value["john.data"]);
		expect(AttrPath.traverse(value, '["john.data"]')).toStrictEqual({"hobby": [{"name": "Cycling"}, {"name": "Dance"}], "pet": [{"type": "dog", "name": "Max"}]});
	});

	it('MBCS Key', () => {

		const value = {
			"漢字": {
				hobby: [{name: "Cycling"}, {name: "Dance"}],
				pet: [{type: "dog", name: "Max"}]
			}
		};

		expect(AttrPath.traverse(value, '["漢字"]')).toBe(value["漢字"]);
	});

	it('Update', () => {

		const before = {
			children: {
				john: {
					hobby: [{name: "Cycling"}, {name: "Dance"}],
					pet: [{type: "dog", name: "Max"}]
				},
				"花子": {
					hobby: [{name: "Squash"}],
					pet: [{type: "cat", name: "Chloe"}]
				}
			}
		};

		const after = {
			children: {
				john: {
					hobby: [{name: "Cycling"}, {name: "Breaking"}],
					pet: [{type: "dog", name: "Max"}]
				},
				"花子": {
					hobby: [{name: "Squash"}],
					pet: [{type: "cat", name: "Chloe"}]
				}
			}
		};

		AttrPath.traverse(before, '.children.john.hobby[1]').name = "Breaking";
		expect(before).toStrictEqual(after);

		const after2 = {
			children: {
				john: {
					hobby: [{name: "Cycling"}, {name: "Breaking"}, {name: "Game"}],
					pet: [{type: "dog", name: "Max"}]
				},
				"花子": {
					hobby: [{name: "Squash"}],
					pet: [{type: "cat", name: "Chloe"}]
				}
			}
		};

		AttrPath.traverse(after, '.children.john.hobby').push({name: "Game"});
		expect(after).toStrictEqual(after2);

	});

	it('Update', () => {
		// under constuction.

		const before = {
			children: {
				john: {
					hobby: [{name: "Cycling"}, {name: "Dance"}],
					pet: [{type: "dog", name: "Max"}]
				}
			}
		};

		const after = {
			children: {
				john: {
					hobby: [{name: "Cycling"}, {name: "Dance"}],
					pet: [{type: "dog", name: "Max"}]
				},
				"花子": {
					hobby: [{name: "Tennis"}],
					pet: [{type: "cat", name: "Chloe"}]
				}
			},
		};

		expect(AttrPath.update(before, '.children.花子', {hobby: [{name: "Squash"}], pet: [{type: "cat", name: "Chloe"}]})).toBeTruthy();
		expect(AttrPath.update(before, '.children.花子.hobby[0]', {name: "Tennis"})).toBeTruthy();
		expect(AttrPath.update(before, '.children.花子.hobby[1]', {name: "Swimming"})).toBeTruthy();
		expect(AttrPath.update(before, '.there.is.nothing', {name: "Do Nothing"})).toBeFalsy();
		// under constuction.

	});

	it('Valid', () => {

		expect(AttrPath.is_valid('[1]')).toBe(true);
		expect(AttrPath.is_valid('["john"]')).toBe(true);
		expect(AttrPath.is_valid('.children["john"].hobby[1].name')).toBe(true);
		expect(AttrPath.is_valid('.children["john"].hobby[1a].name')).toBe(false);
		expect(AttrPath.is_valid('.children["john"].hobby["1"].name')).toBe(false);
		expect(AttrPath.is_valid('this.name')).toBe(false);

	});

	it('Classes', () => {

		const value = {
			children: {
				john: {
					hobby: [{name: "Cycling"}, {name: "Dance"}],
					pet: [{type: "dog", name: "Max"}]
				},
				"花子": {
					hobby: [{name: "Squash"}],
					pet: [{type: "cat", name: "Chloe"}]
				},
				_jack$: {
					_hobby$: [{$name: "Fury"}],
					$pet$: [{type_: "bat", $name: "Dread"}]
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

		expect(Traverse(value, '.children')).toStrictEqual({"john": {"hobby": [{"name": "Cycling"}, {"name": "Dance"}], "pet": [{"type": "dog", "name": "Max"}]}, "花子": {"hobby": [{"name": "Squash"}], "pet": [{"type": "cat", "name": "Chloe"}]}, _jack$: {_hobby$: [{$name: "Fury"}], $pet$: [{type_: "bat", $name: "Dread"}]}});
		expect(Traverse(value, '.children.john')).toStrictEqual({"hobby": [{"name": "Cycling"}, {"name": "Dance"}], "pet": [{"type": "dog", "name": "Max"}]});
		expect(Traverse(value, '.children.john.hobby')).toStrictEqual([{"name": "Cycling"}, {"name": "Dance"}]);
		expect(Traverse(value, '.children.john.hobby[0]')).toStrictEqual({"name": "Cycling"});
		expect(Traverse(value, '.children.john.hobby[0].name')).toBe("Cycling");
		expect(Traverse(value, '.children.john.hobby[0a].name')).toBeUndefined();
		expect(Traverse(value, '.children.john.hobby[1].name')).toBe("Dance");
		expect(Traverse(value, '.children.john.pet[0].type')).toBe("dog");
		expect(Traverse(value, '.children.john.pet[0].name')).toBe("Max");
		expect(Traverse(value, '.children.花子.hobby[0].name')).toBe("Squash");
		expect(Traverse(value, '.children.花子.pet[0].type')).toBe("cat");
		expect(Traverse(value, '.children.花子.pet[0].name')).toBe("Chloe");
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
		expect(Traverse(value, '.children._jack$._hobby$[0].$name')).toBe("Fury");
		expect(Traverse(value, '.children._jack$.$pet$[0].$name')).toBe("Dread");

	});

	it('Extends', () => {

		class Klass {
			member: string = "name";

			Member(): any {
				return AttrPath.traverse(this, '.member');
			}
		}

		const klass = new Klass();
		expect(klass.Member()).toBe("name");

		class ParentKlass {
			protected member: string = "name";
		}

		class SubKlass extends ParentKlass {
			Member(): any {
				return AttrPath.traverse(this, '.member');
			}
		}

		const sub_klass = new SubKlass();
		expect(sub_klass.Member()).toBe("name");

	});

});

/*
*
* CommonJS
*
* */
describe('CommonJS', () => {

	it('Basic', () => {

		const {AttrPath} = require('./index');

		const value = {
			children: {
				john: {
					hobby: [{name: "Cycling"}, {name: "Dance"}],
					pet: [{type: "dog", name: "Max"}]
				},
				"花子": {
					hobby: [{name: "Squash"}],
					pet: [{type: "cat", name: "Chloe"}]
				}
			}
		};

		expect(AttrPath.traverse(value, '.children')).toStrictEqual({"john": {"hobby": [{"name": "Cycling"}, {"name": "Dance"}], "pet": [{"type": "dog", "name": "Max"}]}, "花子": {"hobby": [{"name": "Squash"}], "pet": [{"type": "cat", "name": "Chloe"}]}});
		expect(AttrPath.traverse(value, '.children')).toStrictEqual(value.children);
		expect(AttrPath.traverse(value, '.children.john')).toStrictEqual({"hobby": [{"name": "Cycling"}, {"name": "Dance"}], "pet": [{"type": "dog", "name": "Max"}]});
		expect(AttrPath.traverse(value, '.children.john')).toStrictEqual(value.children.john);
		expect(AttrPath.traverse(value, '.children.john.hobby')).toStrictEqual([{"name": "Cycling"}, {"name": "Dance"}]);
		expect(AttrPath.traverse(value, '.children.john.hobby')).toStrictEqual(value.children.john.hobby);
		expect(AttrPath.traverse(value, '.children.john.hobby[0]')).toStrictEqual({"name": "Cycling"});
		expect(AttrPath.traverse(value, '.children.john.hobby[0]')).toStrictEqual(value.children.john.hobby[0]);
		expect(AttrPath.traverse(value, '.children.john.hobby[0].name')).toBe("Cycling");
		expect(AttrPath.traverse(value, '.children.john.hobby[0].name')).toBe(value.children.john.hobby[0].name);
		expect(AttrPath.traverse(value, '.children.john.hobby["0"].name')).toBeUndefined();
		expect(AttrPath.traverse(value, '.children.john.hobby[0a].name')).toBeUndefined();
		expect(AttrPath.traverse(value, '.children.john.hobby["0"].name', "no name")).toBe("no name");
		expect(AttrPath.traverse(value, '.children.john.hobby[a].name', "no name")).toBe("no name");

		const Default = (n: number) => {
			return n;
		}

		expect(AttrPath.traverse(value, '.children.john.hobby["0"].name', Default(1))).toBe(1);
		expect(AttrPath.traverse(value, '.children.john.hobby[a].name', Default(1))).toBe(1);

		const Result = (param: any) => {
			return (result: any): void => {
				expect(result).toBe(param);
			}
		}

		expect(AttrPath.traverse(value, '.children.john.hobby[1].name', Result("Dance"))).toBe(null);
		expect(AttrPath.traverse(value, '.children.john.pet[0].type', Result("dog"))).toBe(null);

		expect(AttrPath.traverse(value, '.children.john.hobby[1].name')).toBe("Dance");
		expect(AttrPath.traverse(value, '.children.john.pet[0].type')).toBe("dog");
		expect(AttrPath.traverse(value, '.children.john.pet[0].name')).toBe("Max");
		expect(AttrPath.traverse(value, '.children.花子.hobby[0].name')).toBe("Squash");
		expect(AttrPath.traverse(value, '.children.花子.pet[0].type')).toBe("cat");
		expect(AttrPath.traverse(value, '.children.花子.pet[0].name')).toBe("Chloe")
		expect(AttrPath.traverse(value, '.children.john.hobby["0"].name')).toBeUndefined();
		expect(AttrPath.traverse(value, '.children["john"].hobby[0].name')).toBe("Cycling");
		expect(AttrPath.traverse(value, '.children["john"].hobby[0]["name"]')).toBe("Cycling");
		expect(AttrPath.traverse(value, '["children"]["john"].hobby[0].name')).toBe("Cycling");
		expect(AttrPath.traverse(value, '.children["john"].hobby[0].name')).toBe("Cycling");
		expect(AttrPath.traverse(value, '["children"]["john"]["hobby"][0]["name"]')).toBe("Cycling");
		expect(AttrPath.traverse(value, '["children"]["john"]["hobby"][0].["name"]')).toBeUndefined();
		expect(AttrPath.traverse(value, '["children"]["john"]["hobby"][0]["name"]')).toBe("Cycling");
		expect(AttrPath.traverse(value, '.children["john"].hobby[1].name')).toBe("Dance");
		expect(AttrPath.traverse([1], '[0]')).toBe(1);
		expect(AttrPath.traverse([1], '[1]')).toBeUndefined();
		expect(AttrPath.traverse(AttrPath.traverse(value, '.children.john'), '.hobby')).toStrictEqual([{"name": "Cycling"}, {"name": "Dance"}]);
		expect(AttrPath.traverse(null, '.path')).toBeUndefined();
		expect(AttrPath.traverse(undefined, '.path')).toBeUndefined();
		expect(AttrPath.traverse(false, '.path')).toBeUndefined();
		expect(AttrPath.traverse(true, '.path')).toBeUndefined();
		expect(AttrPath.traverse(NaN, '.path')).toBeUndefined();
		expect(AttrPath.traverse(Infinity, '.path')).toBeUndefined();
		expect(AttrPath.traverse(0, '.path')).toBeUndefined();
		expect(AttrPath.traverse(-1, '.path')).toBeUndefined();
		expect(AttrPath.traverse("", '.path')).toBeUndefined();
		expect(AttrPath.traverse("1", '.path')).toBeUndefined();
		expect(AttrPath.traverse([1], '.path')).toBeUndefined();
		expect(AttrPath.traverse({}, '.path')).toBeUndefined();
		expect(AttrPath.traverse({}, '.path', 1)).toBe(1);
		expect(value?.children?.john?.hobby[10]?.name).toBeUndefined();

		const value2 = [
			{
				john: {
					"hobby": [{name: "Cycling"}, {name: "Dance"}],
					pet: [{type: "dog", name: "Max"}]
				},
			}
		];

		expect(AttrPath.traverse(value2, '[0].john.hobby[1].name')).toBe("Dance");

		const value3 = {
			"john.data": {
				hobby: [{name: "Cycling"}, {name: "Dance"}],
				pet: [{type: "dog", name: "Max"}]
			}
		};

		expect(AttrPath.traverse(value3, '["john.data"]')).toBe(value3["john.data"]);
		expect(AttrPath.traverse(value3, '["john.data"]')).toStrictEqual({"hobby": [{"name": "Cycling"}, {"name": "Dance"}], "pet": [{"type": "dog", "name": "Max"}]});

		const value4 = {
			"漢字": {
				hobby: [{name: "Cycling"}, {name: "Dance"}],
				pet: [{type: "dog", name: "Max"}]
			}
		};

		expect(AttrPath.traverse(value4, '["漢字"]')).toBe(value4["漢字"]);
		expect(AttrPath.traverse(value4, '["漢字"].hobby[0].name')).toBe(value4["漢字"].hobby[0].name);

		expect(AttrPath.is_valid('["john.data"]')).toBe(true);
		expect(AttrPath.is_valid('.children["john"].hobby[1].name')).toBe(true);
		expect(AttrPath.is_valid('.children["john"].hobby[1a].name')).toBe(false);
		expect(AttrPath.is_valid('.children["john"].hobby["1"].name')).toBe(false);
		expect(AttrPath.is_valid('this.name')).toBe(false);

	});

	it('Customize', () => {

		const {AttributeParser, ValueHandler, ParserStream} = require('./index');

		const value = {
			children: {
				john: {
					hobby: [{name: "Cycling"}, {name: "Dance"}],
					pet: [{type: "dog", name: "Max"}]
				},
				"花子": {
					hobby: [{name: "Squash"}],
					pet: [{type: "cat", name: "Chloe"}]
				}
			}
		}

		const value2 = {
			children: {
				john: {
					hobby: [{name: "Cycling"}, {name: "Game"}],
					pet: [{type: "dog", name: "Max"}]
				},
				"花子": {
					hobby: [{name: "Squash"}],
					pet: [{type: "cat", name: "Chloe"}]
				}
			}
		};


		function CustomTraverse(obj: any, path: string): any {
			let result = undefined;
			const handler: ValueHandler = new ValueHandler(obj);
			if (new AttributeParser(handler, new ParserStream(path)).parse_path()) {
				result = handler.value;
			}
			return result;
		}

		function CustomUpdate(target: any, path: string, value: any): any {
			let result: any;
			if (target) {
				const updater: Updater = new Updater(target, value);
				if (new AttributeParser(updater, new ParserStream(path)).parse_path()) {
					result = target;
				}
			}
			return result;
		}

		function CustomIsValid(path: string): any {
			return new AttributeParser(null, new ParserStream(path)).parse_path();
		}

		expect(CustomTraverse(value, '.children')).toStrictEqual({"john": {"hobby": [{"name": "Cycling"}, {"name": "Dance"}], "pet": [{"type": "dog", "name": "Max"}]}, "花子": {"hobby": [{"name": "Squash"}], "pet": [{"type": "cat", "name": "Chloe"}]}});
		expect(CustomTraverse(value, '.children.john')).toStrictEqual({"hobby": [{"name": "Cycling"}, {"name": "Dance"}], "pet": [{"type": "dog", "name": "Max"}]});
		expect(CustomTraverse(value, '.children.john.hobby')).toStrictEqual([{"name": "Cycling"}, {"name": "Dance"}]);
		expect(CustomTraverse(value, '.children.john.hobby[0]')).toStrictEqual({"name": "Cycling"});
		expect(CustomTraverse(value, '.children.john.hobby[0].name')).toBe("Cycling");
		expect(CustomTraverse(value, '.children.john.hobby[0a].name')).toBeUndefined();
		expect(CustomTraverse(value, '.children.john.hobby[1].name')).toBe("Dance");
		expect(CustomTraverse(value, '.children.john.pet[0].type')).toBe("dog");
		expect(CustomTraverse(value, '.children.john.pet[0].name')).toBe("Max");
		expect(CustomTraverse(value, '.children.花子.hobby[0].name')).toBe("Squash");
		expect(CustomTraverse(value, '.children.花子.pet[0].type')).toBe("cat");
		expect(CustomTraverse(value, '.children.花子.pet[0].name')).toBe("Chloe")
		expect(CustomTraverse(value, '.children.john.hobby["0"].name')).toBeUndefined();
		expect(CustomTraverse(value, '.children["john"].hobby[0].name')).toBe("Cycling");
		expect(CustomTraverse(value, '.children["john"].hobby[0]["name"]')).toBe("Cycling");
		expect(CustomTraverse(value, '["children"]["john"].hobby[0].name')).toBe("Cycling");
		expect(CustomTraverse(value, '.children["john"].hobby[0].name')).toBe("Cycling");
		expect(CustomTraverse(value, '["children"]["john"]["hobby"][0]["name"]')).toBe("Cycling");
		expect(CustomTraverse(value, '["children"]["john"]["hobby"][0].["name"]')).toBeUndefined();
		expect(CustomTraverse(value, '["children"]["john"]["hobby"][0]["name"]')).toBe("Cycling");
		expect(CustomTraverse(value, '.children["john"].hobby[1].name')).toBe("Dance");
		expect(CustomUpdate(value, '.children["john"].hobby[1].name', "Game")).toStrictEqual(value2);

		expect(CustomIsValid('.children["john"].hobby[1].name')).toBe(true);
		expect(CustomIsValid('.children["john"].hobby[1a].name')).toBe(false);
		expect(CustomIsValid('.children["john"].hobby["1"].name')).toBe(false);
		expect(CustomIsValid('XXXXX')).toBe(false);
		expect(CustomIsValid('.expect(isValid(\'.children["john"].hobby[1].name\')).toBe(true);')).toBe(false);
	});

	it('Extends', () => {

		const {AttrPath} = require('./index');

		class Klass {
			member: string = "name";

			Member(): any {
				return AttrPath.traverse(this, '.member');
			}
		}

		const klass = new Klass();
		expect(klass.Member()).toBe("name");

		class ParentKlass {
			protected member: string = "name";
		}

		class SubKlass extends ParentKlass {
			Member(): any {
				return AttrPath.traverse(this, '.member');
			}
		}

		const sub_klass = new SubKlass();
		expect(sub_klass.Member()).toBe("name");

	});

});


