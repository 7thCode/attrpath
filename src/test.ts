const attrpath = require("./index");

const value = {
    Child: {
        _太郎: [
            {$pet: "pochi."}
        ],
        花子: {y: 1}
    }
};

test('Test1', () => {
    expect(attrpath.traverse(value, '.Child._太郎[0].$pet')).toBe("pochi.");
});

test('Test2', () => {
    expect(attrpath.traverse(value, '.Child["_太郎"][0].$pet')).toBe("pochi.");
});

test('Test3', () => {
    expect(attrpath.traverse(value, '.Child["_太郎"][0]["$pet"]')).toBe("pochi.");
});

test('Test4', () => {
    expect(attrpath.traverse(value, '["Child"]["_太郎"][0]["$pet"]')).toBe("pochi.");
});

test('Test5', () => {
    expect(attrpath.traverse(value, ".Child['_太郎'][0].$pet")).toBe("pochi.");
});

test('Test6', () => {
    expect(attrpath.traverse(value, ".Child['_太郎'][0]['$pet']")).toBe("pochi.");
});

test('Test7', () => {
    expect(attrpath.traverse(value, "['Child']['_太郎'][0]['$pet']")).toBe("pochi.");
});

test('Test8', () => {
    expect(attrpath.traverse(value, '.Child._太郎[0].$pet')).toBe("pochi.");
});

test('Test9', () => {
    expect(attrpath.traverse(value, '["Child"]._太郎[0].$pet')).toBe("pochi.");
});

test('Test10', () => {
    expect(attrpath.traverse(value, '.Child1._太郎[0].$pet')).toBe(undefined);
});
test('Test11', () => {
    expect(attrpath.traverse(value, '.Child1["_太郎"][0].$pet')).toBe(undefined);
});
test('Test12', () => {
    expect(attrpath.traverse(value, '.Child1["_太郎"][0]["$pet"]')).toBe(undefined);
});
test('Test13', () => {
    expect(attrpath.traverse(value, '["Child1"]["_太郎"][0]["$pet"]')).toBe(undefined);
});
test('Test14', () => {
    expect(attrpath.traverse(value, ".Child1['_太郎'][0].$pet")).toBe(undefined);
});
test('Test15', () => {
    expect(attrpath.traverse(value, ".Child1['_太郎'][0]['$pet']")).toBe(undefined);
});
test('Test16', () => {
    expect(attrpath.traverse(value, "['Child1']['_太郎'][0]['$pet']")).toBe(undefined);
});
test('Test17', () => {
    expect(attrpath.traverse(value, '.Child1._太郎[0].$pet')).toBe(undefined);
});
test('Test18', () => {
    expect(attrpath.traverse(value, '["Child1"]._太郎[0].$pet')).toBe(undefined);
});
test('Test19', () => {
    expect(attrpath.traverse(value, '.Child._太郎[1].$pet')).toBe(undefined);
});
test('Test20', () => {
    expect(attrpath.traverse(value, '.Child["_太郎"][1].$pet')).toBe(undefined);
});
test('Test21', () => {
    expect(attrpath.traverse(value, '.Child["_太郎"][1]["$pet"]')).toBe(undefined);
});
test('Test22', () => {
    expect(attrpath.traverse(value, '["Child"]["_太郎"][1]["$pet"]')).toBe(undefined);
});
test('Test23', () => {
    expect(attrpath.traverse(value, ".Child['_太郎'][1].$pet")).toBe(undefined);
});
test('Test24', () => {
    expect(attrpath.traverse(value, ".Child['_太郎'][1]['$pet']")).toBe(undefined);
});
test('Test25', () => {
    expect(attrpath.traverse(value, "['Child']['_太郎'][1]['$pet']")).toBe(undefined);
});
test('Test26', () => {
    expect(attrpath.traverse(value, '.Child._太郎[1].$pet')).toBe(undefined);
});
test('Test27', () => {
    expect(attrpath.traverse(value, '["Child"]._太郎[1].$pet')).toBe(undefined);
});
test('Test28', () => {
    expect(attrpath.traverse(value, '.Child.._太郎[1].$pet')).toBe(undefined);
});
test('Test29', () => {
    expect(attrpath.traverse(value, '.Child._太郎["1"].$pet')).toBe(undefined);
});
test('Test30', () => {
    expect(attrpath.traverse(value, '.Child["_太郎"][1]["$pet"]')).toBe(undefined);
});
test('Test31', () => {
    expect(attrpath.traverse(value, '["Child"]["_太郎"][1]["$pet"]')).toBe(undefined);
});
test('Test32', () => {
    expect(attrpath.traverse(value, ".Child['_太郎'][1].$pet")).toBe(undefined);
});
test('Test33', () => {
    expect(attrpath.traverse(value, ".Child['_太郎'][1]['$pet']")).toBe(undefined);
});
test('Test34', () => {
    expect(attrpath.traverse(value, "['Child']['_太郎'][1]['$pet']")).toBe(undefined);
});
test('Test35', () => {
    expect(attrpath.traverse(value, '.Child._太郎[1].$pet')).toBe(undefined);
});
test('Test36', () => {
    expect(attrpath.traverse(value, '["Child"]._太郎[1].$pet')).toBe(undefined);
});

test('Test37', () => {
    expect(attrpath.is_valid('.Child._太郎[0].$pet')).toBe(true);
});

test('Test38', () => {
    expect(attrpath.is_valid('.Child["_太郎"][0].$pet')).toBe(true);
});

test('Test39', () => {
    expect(attrpath.is_valid('.Child["_太郎"][0]["$pet"]')).toBe(true);
});

test('Test40', () => {
    expect(attrpath.is_valid('["Child"]["_太郎"][0]["$pet"]')).toBe(true);
});

test('Test41', () => {
    expect(attrpath.is_valid(".Child['_太郎'][0].$pet")).toBe(true);
});

test('Test42', () => {
    expect(attrpath.is_valid(".Child['_太郎'][0]['$pet']")).toBe(true);
});

test('Test43', () => {
    expect(attrpath.is_valid("['Child']['_太郎'][0]['$pet']")).toBe(true);
});

test('Test44', () => {
    expect(attrpath.is_valid('.Child._太郎[0].$pet')).toBe(true);
});

test('Test45', () => {
    expect(attrpath.is_valid('["Child"]._太郎[0].$pet')).toBe(true);
});

test('Test46', () => {
    expect(attrpath.is_valid('.Child1._太郎[0].$pet')).toBe(true);
});

test('Test47', () => {
    expect(attrpath.is_valid('.Child1["_太郎"][0].$pet')).toBe(true);
});
test('Test48', () => {
    expect(attrpath.is_valid('.Child1["_太郎"][0]["$pet"]')).toBe(true);
});

test('Test49', () => {
    expect(attrpath.is_valid('["Child1"]["_太郎"][0]["$pet"]')).toBe(true);
});

test('Test50', () => {
    expect(attrpath.is_valid(".Child1['_太郎'][0].$pet")).toBe(true);
});

test('Test51', () => {
    expect(attrpath.is_valid(".Child1['_太郎'][0]['$pet']")).toBe(true);
});
test('Test52', () => {
    expect(attrpath.is_valid("['Child1']['_太郎'][0]['$pet']")).toBe(true);
});

test('Test53', () => {
    expect(attrpath.is_valid('.Child1._太郎[0].$pet')).toBe(true);
});

test('Test54', () => {
    expect(attrpath.is_valid('["Child1"]._太郎[0].$pet')).toBe(true);
});






test('Test37', () => {
    expect(attrpath.is_valid('.Child._太郎[0]..$pet')).toBe(false);
});

test('Test38', () => {
    expect(attrpath.is_valid('.Child["_太郎"][0.$pet')).toBe(false);
});

test('Test39', () => {
    expect(attrpath.is_valid('.Child["_太郎"][0].["$pet"]')).toBe(false);
});

test('Test40', () => {
    expect(attrpath.is_valid('["Child"]["_太郎"].[0]["pet"]')).toBe(false);
});

test('Test41', () => {
    expect(attrpath.is_valid('["Child"].["_太郎"].[0]["pet"]')).toBe(false);
});

test('Test42', () => {
    expect(attrpath.is_valid('["Child"].["_太郎"].["0"]["pet"]')).toBe(false);
});

test('Test42', () => {
    expect(attrpath.is_valid('["Child"]["_太郎"][0]["1pet"]')).toBe(false);
});

