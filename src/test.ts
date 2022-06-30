const attrpath: any = require("./index");

console.log(attrpath.traverse({a: {_阿: [{$c: 100}], x: {y: 1}}}, 'a._阿[0].$c'));
