const attrpath = require("./index");

const testbase: any = require("./base");
const testparser: any = require("./parser");
const teststream: any = require("./stream");

test('1', () => {
    expect(testbase.isNumber(1)).toBe(true);
});

test('[]', () => {
    expect(testbase.isContainer([])).toBe(true);
});

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

test('.children.john.hobby[0].name', () => {
    expect(attrpath.traverse(value, '.children.john.hobby[0].name')).toBe("Cycling");
});

test('.children.john.hobby[1].name', () => {
    expect(attrpath.traverse(value, '.children.john.hobby[1].name')).toBe("Dance");
});

test('.children.john.pet[0].type', () => {
    expect(attrpath.traverse(value, '.children.john.pet[0].type')).toBe("dog");
});

test('.children.john.pet[0].name', () => {
    expect(attrpath.traverse(value, '.children.john.pet[0].name')).toBe("Max");
});

test('.children.tom.hobby[0].name', () => {
    expect(attrpath.traverse(value, '.children.tom.hobby[0].name')).toBe("Squash");
});

test('.children.tom.pet[0].type', () => {
    expect(attrpath.traverse(value, '.children.tom.pet[0].type')).toBe("cat");
});

test('.children.tom.pet[0].name', () => {
    expect(attrpath.traverse(value, '.children.tom.pet[0].name')).toBe("Chloe");
})

test('.children.john.hobby["0"].name', () => {
    expect(attrpath.traverse(value, '.children.john.hobby["0"].name')).toBe(undefined);
});

test('.children["john"].hobby[0].name', () => {
    expect(attrpath.traverse(value, '.children["john"].hobby[0].name')).toBe("Cycling");
});

test('.children["john"].hobby[0]["name"]', () => {
    expect(attrpath.traverse(value, '.children["john"].hobby[0]["name"]')).toBe("Cycling");
});

test('["children"]["john"].hobby[0].name', () => {
    expect(attrpath.traverse(value, '["children"]["john"].hobby[0].name')).toBe("Cycling");
});

test('.children["john"].hobby[0].name', () => {
    expect(attrpath.traverse(value, '.children["john"].hobby[0].name')).toBe("Cycling");
});

test('["children"]["john"]["hobby"][0]["name"]', () => {
    expect(attrpath.traverse(value, '["children"]["john"]["hobby"][0]["name"]')).toBe("Cycling");
});

test('["children"]["john"]["hobby"][0].["name"]', () => {
    expect(attrpath.traverse(value, '["children"]["john"]["hobby"][0].["name"]')).toBe(undefined);
});

test('.children.john.hobby[1].name', () => {
    expect(attrpath.traverse(value, '.children["john"].hobby[1].name')).toBe("Dance");
});

test('.children.john.hobby[1].name', () => {
    expect(attrpath.is_valid('.children["john"].hobby[1].name')).toBe(true);
});

test('.children.john.hobby["1"].name', () => {
    expect(attrpath.is_valid('.children["john"].hobby["1"].name')).toBe(false);
});

/**
 * for test
 */
class TestParser extends testparser.AttributeParser {

    constructor(handler: BaseHandler | null, stream: ParserStream) {
        super(handler, stream);
    }

    public is_s(): boolean {
        return super.is_s();
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

}

test(' ', () => {
    expect(new TestParser(null, new teststream.ParserStream(" ")).is_s()).toBe(true);
});

test('      ', () => {
    expect(new TestParser(null, new teststream.ParserStream(" ")).parse_s()).toBe(true);
});

test('A', () => {
    expect(new TestParser(null, new teststream.ParserStream("")).is_terminal()).toBe(true);
});

test('A', () => {
    expect(new TestParser(null, new teststream.ParserStream("A")).is_char("A")).toBe(true);
});

test('.', () => {
    expect(new TestParser(null, new teststream.ParserStream(".")).is_symbol()).toBe(true);
});

test('0', () => {
    expect(new TestParser(null, new teststream.ParserStream("0")).is_digit()).toBe(true);
});

test('123456', () => {
    expect(new TestParser(null, new teststream.ParserStream("123456")).parse_number()).toBe(true);
});


/**
 * reading ::= ( alpha | "_" | "$"  ) *
 */
test('A', () => {
    expect(new TestParser(null, new teststream.ParserStream("A")).is_reading()).toBe(true);
});

test('z', () => {
    expect(new TestParser(null, new teststream.ParserStream('z')).is_reading()).toBe(true);
});

test('0x2FFFF', () => {
    const c = String.fromCharCode(0x2FFFF);
    expect(new TestParser(null, new teststream.ParserStream(c)).is_reading()).toBe(true);
});

test('0', () => {
    expect(new TestParser(null, new teststream.ParserStream("0")).is_reading()).toBe(false);
});

test('_', () => {
    expect(new TestParser(null, new teststream.ParserStream("_")).is_reading()).toBe(true);
});

test('$', () => {
    expect(new TestParser(null, new teststream.ParserStream("$")).is_reading()).toBe(true);
});

/**
 * trailing ::= ( alpha | "_" | "$" | digit ) *
 */
test('A', () => {
    expect(new TestParser(null, new teststream.ParserStream("A")).is_trailing()).toBe(true);
});

test('z', () => {
    expect(new TestParser(null, new teststream.ParserStream('z')).is_trailing()).toBe(true);
});

test('0x2FFFF', () => {
    const c = String.fromCharCode(0x2FFFF);
    expect(new TestParser(null, new teststream.ParserStream(c)).is_trailing()).toBe(true);
});

test('0', () => {
    expect(new TestParser(null, new teststream.ParserStream("0")).is_trailing()).toBe(true);
});

test('_', () => {
    expect(new TestParser(null, new teststream.ParserStream("_")).is_trailing()).toBe(true);
});

test('$', () => {
    expect(new TestParser(null, new teststream.ParserStream("$")).is_trailing()).toBe(true);
});


/**
 * name ::= reading [ trailing ]
 */
test('ABCDE', () => {
    expect(new TestParser(null, new teststream.ParserStream("ABCDE")).parse_name()).toBe(true);
});

/**
 * name ::= reading [ trailing ]
 */
test('1BCDE', () => {
    expect(new TestParser(null, new teststream.ParserStream("1BCDE")).parse_name()).toBe(false);
});

/**
 * string = "'" mame "'" | '"' mame '"'
 */
test("'ABCDE'", () => {
    expect(new TestParser(null, new teststream.ParserStream("'ABCDE'")).parse_string()).toBe(true);
});

test('"ABCDE"', () => {
    expect(new TestParser(null, new teststream.ParserStream('"ABCDE"')).parse_string()).toBe(true);
});

/**
 * attr ::= "." name | '[' string | number ']'
 */
test(".ABCDE", () => {
    expect(new TestParser(null, new teststream.ParserStream(".ABCDE")).parse_attr()).toBe(true);
});

test("[0]", () => {
    expect(new TestParser(null, new teststream.ParserStream("[0]")).parse_attr()).toBe(true);
});

test("['ABC']", () => {
    expect(new TestParser(null, new teststream.ParserStream("['ABC']")).parse_attr()).toBe(true);
});

test('["ABC"]', () => {
    expect(new TestParser(null, new teststream.ParserStream('["ABC"]')).parse_attr()).toBe(true);
});

/**
 * path ::= attr *
 */
test(".ABCDE", () => {
    expect(new TestParser(null, new teststream.ParserStream(".ABCDE")).parse_path()).toBe(true);
});

test(".ABCDE.XYZ", () => {
    expect(new TestParser(null, new teststream.ParserStream(".ABCDE.XYZ")).parse_path()).toBe(true);
});

test(".ABCDE.XYZ[0]", () => {
    expect(new TestParser(null, new teststream.ParserStream(".ABCDE.XYZ[0]")).parse_path()).toBe(true);
});
