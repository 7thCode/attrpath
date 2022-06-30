# attrpath
Attribute Path Traverser.

```js

const attrpath: any = require("attrpath");

const value = {
    Child: {
        _太郎: [
            {$pet: "pochi."}
        ],
        花子: {y: 1}
    }
};

console.log(attrpath.traverse(value, '.Child._太郎[0].$pet'));

> pochi.

console.log(attrpath.traverse(value, '.Child._太郎[1].$pet'));

> undefined

```
<img src="https://raw.githubusercontent.com/7thCode/attrpath/0281b0c1d1984b451394de4a0f4d15c075338401/AttributeParser.svg" alt="" title="">

