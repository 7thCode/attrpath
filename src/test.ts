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
    Child: {
        _太郎: [
            {$pet: "pochi."}
        ],
        花子: {y: 1}
    }
};

test('.Child._太郎[0].$pet', () => {
    expect(attrpath.traverse(value, '.Child._太郎[0].$pet')).toBe("pochi.");
});

test('.Child["_太郎"][0].$pet', () => {
    expect(attrpath.traverse(value, '.Child["_太郎"][0].$pet')).toBe("pochi.");
});

test('.Child["_太郎"][0]["$pet"]', () => {
    expect(attrpath.traverse(value, '.Child["_太郎"][0]["$pet"]')).toBe("pochi.");
});

test('["Child"]["_太郎"][0]["$pet"]', () => {
    expect(attrpath.traverse(value, '["Child"]["_太郎"][0]["$pet"]')).toBe("pochi.");
});

test(".Child['_太郎'][0].$pet", () => {
    expect(attrpath.traverse(value, ".Child['_太郎'][0].$pet")).toBe("pochi.");
});

test(".Child['_太郎'][0]['$pet']", () => {
    expect(attrpath.traverse(value, ".Child['_太郎'][0]['$pet']")).toBe("pochi.");
});

test("['Child']['_太郎'][0]['$pet']", () => {
    expect(attrpath.traverse(value, "['Child']['_太郎'][0]['$pet']")).toBe("pochi.");
});

test('.Child._太郎[0].$pet', () => {
    expect(attrpath.traverse(value, '.Child._太郎[0].$pet')).toBe("pochi.");
});

test('["Child"]._太郎[0].$pet', () => {
    expect(attrpath.traverse(value, '["Child"]._太郎[0].$pet')).toBe("pochi.");
});

test('Test10', () => {
    expect(attrpath.traverse(value, '.Child1._太郎[0].$pet')).toBe(undefined);
});
test('.Child1["_太郎"][0].$pet', () => {
    expect(attrpath.traverse(value, '.Child1["_太郎"][0].$pet')).toBe(undefined);
});
test('.Child1["_太郎"][0]["$pet"]', () => {
    expect(attrpath.traverse(value, '.Child1["_太郎"][0]["$pet"]')).toBe(undefined);
});
test('["Child1"]["_太郎"][0]["$pet"]', () => {
    expect(attrpath.traverse(value, '["Child1"]["_太郎"][0]["$pet"]')).toBe(undefined);
});
test(".Child1['_太郎'][0].$pet", () => {
    expect(attrpath.traverse(value, ".Child1['_太郎'][0].$pet")).toBe(undefined);
});
test(".Child1['_太郎'][0]['$pet']", () => {
    expect(attrpath.traverse(value, ".Child1['_太郎'][0]['$pet']")).toBe(undefined);
});
test("['Child1']['_太郎'][0]['$pet']", () => {
    expect(attrpath.traverse(value, "['Child1']['_太郎'][0]['$pet']")).toBe(undefined);
});
test('.Child1._太郎[0].$pet', () => {
    expect(attrpath.traverse(value, '.Child1._太郎[0].$pet')).toBe(undefined);
});
test('["Child1"]._太郎[0].$pet', () => {
    expect(attrpath.traverse(value, '["Child1"]._太郎[0].$pet')).toBe(undefined);
});
test('.Child._太郎[1].$pet', () => {
    expect(attrpath.traverse(value, '.Child._太郎[1].$pet')).toBe(undefined);
});
test('.Child["_太郎"][1].$pet', () => {
    expect(attrpath.traverse(value, '.Child["_太郎"][1].$pet')).toBe(undefined);
});
test('.Child["_太郎"][1]["$pet"]', () => {
    expect(attrpath.traverse(value, '.Child["_太郎"][1]["$pet"]')).toBe(undefined);
});
test('["Child"]["_太郎"][1]["$pet"]', () => {
    expect(attrpath.traverse(value, '["Child"]["_太郎"][1]["$pet"]')).toBe(undefined);
});
test(".Child['_太郎'][1].$pet", () => {
    expect(attrpath.traverse(value, ".Child['_太郎'][1].$pet")).toBe(undefined);
});
test(".Child['_太郎'][1]['$pet']", () => {
    expect(attrpath.traverse(value, ".Child['_太郎'][1]['$pet']")).toBe(undefined);
});
test("['Child']['_太郎'][1]['$pet']", () => {
    expect(attrpath.traverse(value, "['Child']['_太郎'][1]['$pet']")).toBe(undefined);
});
test('.Child._太郎[1].$pet', () => {
    expect(attrpath.traverse(value, '.Child._太郎[1].$pet')).toBe(undefined);
});
test('["Child"]._太郎[1].$pet', () => {
    expect(attrpath.traverse(value, '["Child"]._太郎[1].$pet')).toBe(undefined);
});
test('.Child.._太郎[1].$pet', () => {
    expect(attrpath.traverse(value, '.Child.._太郎[1].$pet')).toBe(undefined);
});
test('.Child._太郎["1"].$pet', () => {
    expect(attrpath.traverse(value, '.Child._太郎["1"].$pet')).toBe(undefined);
});
test('.Child["_太郎"][1]["$pet"]', () => {
    expect(attrpath.traverse(value, '.Child["_太郎"][1]["$pet"]')).toBe(undefined);
});
test('["Child"]["_太郎"][1]["$pet"]', () => {
    expect(attrpath.traverse(value, '["Child"]["_太郎"][1]["$pet"]')).toBe(undefined);
});
test(".Child['_太郎'][1].$pet", () => {
    expect(attrpath.traverse(value, ".Child['_太郎'][1].$pet")).toBe(undefined);
});
test(".Child['_太郎'][1]['$pet']", () => {
    expect(attrpath.traverse(value, ".Child['_太郎'][1]['$pet']")).toBe(undefined);
});
test("['Child']['_太郎'][1]['$pet']", () => {
    expect(attrpath.traverse(value, "['Child']['_太郎'][1]['$pet']")).toBe(undefined);
});
test('.Child._太郎[1].$pet', () => {
    expect(attrpath.traverse(value, '.Child._太郎[1].$pet')).toBe(undefined);
});
test('["Child"]._太郎[1].$pet', () => {
    expect(attrpath.traverse(value, '["Child"]._太郎[1].$pet')).toBe(undefined);
});

test('.Child._太郎[0].$pet', () => {
    expect(attrpath.is_valid('.Child._太郎[0].$pet')).toBe(true);
});

test('.Child["_太郎"][0].$pet', () => {
    expect(attrpath.is_valid('.Child["_太郎"][0].$pet')).toBe(true);
});

test('.Child["_太郎"][0]["$pet"]', () => {
    expect(attrpath.is_valid('.Child["_太郎"][0]["$pet"]')).toBe(true);
});

test('["Child"]["_太郎"][0]["$pet"]', () => {
    expect(attrpath.is_valid('["Child"]["_太郎"][0]["$pet"]')).toBe(true);
});

test(".Child['_太郎'][0].$pet", () => {
    expect(attrpath.is_valid(".Child['_太郎'][0].$pet")).toBe(true);
});

test(".Child['_太郎'][0]['$pet']", () => {
    expect(attrpath.is_valid(".Child['_太郎'][0]['$pet']")).toBe(true);
});

test("['Child']['_太郎'][0]['$pet']", () => {
    expect(attrpath.is_valid("['Child']['_太郎'][0]['$pet']")).toBe(true);
});

test('.Child._太郎[0].$pet', () => {
    expect(attrpath.is_valid('.Child._太郎[0].$pet')).toBe(true);
});

test('["Child"]._太郎[0].$pet', () => {
    expect(attrpath.is_valid('["Child"]._太郎[0].$pet')).toBe(true);
});

test('.Child1._太郎[0].$pet', () => {
    expect(attrpath.is_valid('.Child1._太郎[0].$pet')).toBe(true);
});

test('.Child1["_太郎"][0].$pet', () => {
    expect(attrpath.is_valid('.Child1["_太郎"][0].$pet')).toBe(true);
});

test('.Child1["_太郎"][0]["$pet"]', () => {
    expect(attrpath.is_valid('.Child1["_太郎"][0]["$pet"]')).toBe(true);
});

test('["Child1"]["_太郎"][0]["$pet"]', () => {
    expect(attrpath.is_valid('["Child1"]["_太郎"][0]["$pet"]')).toBe(true);
});

test(".Child1['_太郎'][0].$pet", () => {
    expect(attrpath.is_valid(".Child1['_太郎'][0].$pet")).toBe(true);
});

test(".Child1['_太郎'][0]['$pet']", () => {
    expect(attrpath.is_valid(".Child1['_太郎'][0]['$pet']")).toBe(true);
});

test("['Child1']['_太郎'][0]['$pet']", () => {
    expect(attrpath.is_valid("['Child1']['_太郎'][0]['$pet']")).toBe(true);
});

test('.Child1._太郎[0].$pet', () => {
    expect(attrpath.is_valid('.Child1._太郎[0].$pet')).toBe(true);
});

test('["Child1"]._太郎[0].$pet', () => {
    expect(attrpath.is_valid('["Child1"]._太郎[0].$pet')).toBe(true);
});


test('.Child._太郎[0]..$pet', () => {
    expect(attrpath.is_valid('.Child._太郎[0]..$pet')).toBe(false);
});

test('.Child["_太郎"][0.$pet', () => {
    expect(attrpath.is_valid('.Child["_太郎"][0.$pet')).toBe(false);
});

test('.Child["_太郎"][0].["$pet"]', () => {
    expect(attrpath.is_valid('.Child["_太郎"][0].["$pet"]')).toBe(false);
});

test('["Child"]["_太郎"].[0]["pet"]', () => {
    expect(attrpath.is_valid('["Child"]["_太郎"].[0]["pet"]')).toBe(false);
});

test('["Child"].["_太郎"].[0]["pet"]', () => {
    expect(attrpath.is_valid('["Child"].["_太郎"].[0]["pet"]')).toBe(false);
});

test('["Child"].["_太郎"].["0"]["pet"]', () => {
    expect(attrpath.is_valid('["Child"].["_太郎"].["0"]["pet"]')).toBe(false);
});

test('["Child"]["_太郎"][0]["1pet"]', () => {
    expect(attrpath.is_valid('["Child"]["_太郎"][0]["1pet"]')).toBe(false);
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
 * trailing ::= ( alpha | "_" | "$"  ) *
 */
test('A', () => {
    expect(new TestParser(null, new teststream.ParserStream("A")).is_reading()).toBe(true);
});

test('1', () => {
    expect(new TestParser(null, new teststream.ParserStream("1")).is_reading()).toBe(false);
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

test('1', () => {
    expect(new TestParser(null, new teststream.ParserStream("0")).is_trailing()).toBe(true);
});

test('_', () => {
    expect(new TestParser(null, new teststream.ParserStream("_")).is_reading()).toBe(true);
});

test('$', () => {
    expect(new TestParser(null, new teststream.ParserStream("$")).is_reading()).toBe(true);
});


/**
 * name ::= reading [ trailing ]
 */
test('ABCDE', () => {
    expect(new TestParser(null, new teststream.ParserStream("ABCDE")).parse_name()).toBe(true);
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
test(".ABCDE.XYZ", () => {
    expect(new TestParser(null, new teststream.ParserStream(".ABCDE.XYZ")).parse_path()).toBe(true);
});
