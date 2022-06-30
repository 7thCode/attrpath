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
