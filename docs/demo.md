 [README]　[DEMO]　[in detail]

```js
import {isNumber, isContainer} from "./base";
import {AttributeParser, FormulaParser, ParserStream, BaseHandler, ValueHandler} from './index';
import {AttrPath} from './index';
```
#### base
```js
describe('base', () => {
    it('base', () => {
        expect(isNumber(1)).toBe(true);
        expect(isContainer({})).toBe(true);
        expect(isContainer({a: 1})).toBe(true);
        expect(isContainer([])).toBe(true);
        expect(isContainer([1])).toBe(true);
    });
});
```
#### ValueHandler
```js
describe('attrpath', () => {
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
});
```
#### ParserStream
```js
describe('attrpath', () => {
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
});
```
#### AttributeParser
```js
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
});
```
#### ESModules
```js
describe('attrpath', () => {
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
```
#### ESModules Customize
```js
describe('attrpath', () => {
    it('Customize', () => {

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
```
#### CommonJS
```js
describe('attrpath', () => {
    it('CommonJS', () => {

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
```
#### CommonJS Customize
```js
describe('attrpath', () => {
    it('Customize', () => {

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
```
#### class
```js
class Klass {
	member = "name";

	Member() {
		return AttrPath.traverse(this, '.member');
	}
}

const klass = new Klass();
console.log(klass.Member());

> "name"
```
#### Inheritance
```js
class ParentKlass {
	member = "name";
}

class SubKlass extends ParentKlass {
	Member() {
		return AttrPath.traverse(this, '.member');
	}
}

const sub_klass = new SubKlass();
console.log(sub_klass.Member());

> "name"
```

[README]: ../README.md
[DEMO]: demo.md
[in detail]: detail.md
