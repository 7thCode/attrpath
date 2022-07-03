# attrpath
Attribute Path Traverser.

```js

const attrpath: any = require("attrpath");

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

console.log(attrpath.traverse(value, '.children.john.hobby[0].name'));

> pochi.

console.log(attrpath.traverse(value, '.children.john.hobby[1].name'));

> undefined

console.log(attrpath.is_valid('.children.john.hobby[0].name'));

> true

console.log(attrpath.is_valid('.children.john.hobby[0]..name'));

> false

```
<img src="https://raw.githubusercontent.com/7thCode/attrpath/0281b0c1d1984b451394de4a0f4d15c075338401/AttributeParser.svg" alt="" title="">

