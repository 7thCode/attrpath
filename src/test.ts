const attrpath: any = require("./index");

/*
((0x3040 <= code) && (code <= 0x309F)) || // Hiragana
((0x30A0 <= code) && (code <= 0x30FF)) || // Katakana
((0x2E80 <= code) && (code <= 0x2FDF)) || // CJK部首補助＋康熙部首
((0x3400 <= code) && (code <= 0x4DBF)) || // CJK統合漢字拡張A
((0x4E00 <= code) && (code <= 0x9FFF)) || // CJK統合漢字
((0xF900 <= code) && (code <= 0xFAFF)) || // CJK互換漢字
((0x20000 <= code) && (code <= 0x2FFFF)) || // CJK統合漢字拡張B〜F＋CJK互換漢字
*/

const value = {
    Child: {
        _太郎: [
            {$pet: "pochi."}
        ],
        花子: {y: 1}
    }
};

function Test(v:any, s:string, r: unknown):string {
    let result = ""
    const value = attrpath.traverse(v, s);
    if (value === r) {
        result = "pass";
    } else {
        result = "error"
    }
    return result;
}



console.log(Test(value, '.Child._太郎[0].$pet', "pochi."));
console.log(Test(value, '.Child["_太郎"][0].$pet', "pochi."));
console.log(Test(value, '.Child["_太郎"][0]["$pet"]', "pochi."));
console.log(Test(value, '["Child"]["_太郎"][0]["$pet"]', "pochi."));
console.log(Test(value, ".Child['_太郎'][0].$pet", "pochi."));
console.log(Test(value, ".Child['_太郎'][0]['$pet']", "pochi."));
console.log(Test(value, "['Child']['_太郎'][0]['$pet']", "pochi."));
console.log(Test(value, '.Child._太郎[0].$pet', "pochi."));
console.log(Test(value, '["Child"]._太郎[0].$pet', "pochi."));

console.log(Test(value, '.Child1._太郎[0].$pet', undefined));
console.log(Test(value, '.Child1["_太郎"][0].$pet', undefined));
console.log(Test(value, '.Child1["_太郎"][0]["$pet"]', undefined));
console.log(Test(value, '["Child1"]["_太郎"][0]["$pet"]', undefined));
console.log(Test(value, ".Child1['_太郎'][0].$pet", undefined));
console.log(Test(value, ".Child1['_太郎'][0]['$pet']", undefined));
console.log(Test(value, "['Child1']['_太郎'][0]['$pet']", undefined));
console.log(Test(value, '.Child1._太郎[0].$pet', undefined));
console.log(Test(value, '["Child1"]._太郎[0].$pet', undefined));

console.log(Test(value, '.Child._太郎[1].$pet',undefined));
console.log(Test(value, '.Child["_太郎"][1].$pet',undefined));
console.log(Test(value, '.Child["_太郎"][1]["$pet"]',undefined));
console.log(Test(value, '["Child"]["_太郎"][1]["$pet"]',undefined));
console.log(Test(value, ".Child['_太郎'][1].$pet",undefined));
console.log(Test(value, ".Child['_太郎'][1]['$pet']",undefined));
console.log(Test(value, "['Child']['_太郎'][1]['$pet']",undefined));
console.log(Test(value, '.Child._太郎[1].$pet',undefined));
console.log(Test(value, '["Child"]._太郎[1].$pet',undefined));