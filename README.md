# attrpath
Attribute Path Traverser.



const attrpath: any = require("attrpath");

console.log(attrpath.traverse({Child: {_太郎: [{$pet: "pochi."}], 花子: {y: 1}}}, 'Child._太郎[0].$pet'));

> pochi.

console.log(attrpath.traverse({Child: {_太郎: [{$pet: "pochi."}], 花子: {y: 1}}}, 'Child._太郎[2].$pet'));

> undefined
