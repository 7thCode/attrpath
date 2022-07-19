| index | [DEMO] | [in detail] |
|-------|--------|----|

[DEMO]: docs/demo.md
[in detail]: docs/detail.md

# AttrPath
[![npm version](https://badge.fury.io/js/attrpath.svg)](https://badge.fury.io/js/attrpath)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![7thCode](https://circleci.com/gh/7thCode/attrpath.svg?style=shield)](<LINK>)
![node.js.yml](https://github.com/7thCode/attrpath/actions/workflows/node.js.yml/badge.svg)


<img src="https://raw.githubusercontent.com/7thCode/attrpath/0281b0c1d1984b451394de4a0f4d15c075338401/AttributeParser.svg" alt="" title="">

Object Attribute Path Traverser.
**Safely** traverse the javascript attribute tree using a text path representation.
You can also check the existence of the path.

# Motivation

# Features

# Requirement

# Installation

```bash
npm install atttrpath
```

# Usage


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

# Note

# Author

# License

"AttrPath" is under [MIT license](https://en.wikipedia.org/wiki/MIT_License).





