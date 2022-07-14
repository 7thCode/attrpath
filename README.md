# attrpath

### Object Attribute Path Traverser.

#### **Safely** traverse the javascript attribute tree using a text path representation.

#### You can also check the existence of the path.

```js
const {AttrPath}: any = require("attrpath");

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

console.log(AttrPath.traverse(value, '.children.john.hobby[0].name'))

> "Max"

console.log(AttrPath.traverse(value, '.children.john.hobby[1].name'))

> undefined

console.log(AttrPath.is_valid('.children.john.hobby[0].name'))

> true

console.log(AttrPath.is_valid('.children.john.hobby[0]..name'))

> false

```
Example Data
```ts
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
```
ESModule
```ts
import {AttrPath} from 'attrpath';

    AttrPath.traverse(value, '.children')

    AttrPath.is_valid('.children["john"].hobby[1].name')
```
ESModule(custom)
```ts
import {AttributeParser, FormulaParser, ParserStream, BaseHandler, ValueHandler} from './index';

    function Traverse(obj: any, path: string): any {
        let result = undefined;
        const _handler = new ValueHandler(obj);
        if (new AttributeParser(_handler, new ParserStream(path)).parse_path()) {
            result = _handler.value;
        }
        return result;
    }

    Traverse(value, '.children')


    function isValid(path: string): any {
        return new AttributeParser(null, new ParserStream(path)).parse_path();
    }

    isValid('.children["john"].hobby[1].name')
```
CommonJS
```ts
const {AttrPath} = require('./index');

    AttrPath.traverse(value, '.children');
```
CommonJS(custom)
```ts
const {AttributeParser, ValueHandler, ParserStream} = require('./index');

    function Traverse(obj: any, path: string): any {
        let result = undefined;
        const _handler = new ValueHandler(obj);
        if (new AttributeParser(_handler, new ParserStream(path)).parse_path()) {
            result = _handler.value;
        }
        return result;
    }

    Traverse(value, '.children');

    
    function isValid(path: string): any {
        return new AttributeParser(null, new ParserStream(path)).parse_path();
    }

    isValid('.children["john"].hobby[1].name');
```

<img src="https://raw.githubusercontent.com/7thCode/attrpath/0281b0c1d1984b451394de4a0f4d15c075338401/AttributeParser.svg" alt="" title="">

