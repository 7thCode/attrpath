| [README] | [DEMO] | [in detail] |
|----------|--------|-------------|

[README]: README.md
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

For example, I didn't like to write the following code every time...　humm...
```js

const value = {
    children: {
        john: {hobby: [{name: "Cycling"}, {name: "Dance"}], pet: [{type: "dog", name: "Max"}]},
        tom: {hobby: [{name: "Squash"}], pet: [{type: "cat", name: "Chloe"}]}
    }
};

var answer = undefined;
if (value.children) {
    if (value.children.john) {
        if (value.children.john.hobby) {
            if (Array.isArray(value.children.john.hobby)) {
                if (value.children.john.hobby.length >= 2) {
                    if (value.children.john.hobby[1].name) {
                        answer = value.children.john.hobby[1].name;
                    }
                }
            }
        }
    }
}
```

The ugly thing above is nice if you can write it like this, right?

```js
const {AttrPath}: any = require("attrpath");

var answer = AttrPath.traverse(value, ".children.john.hobby[1].name");
```

# Features




# Requirement

node v10.0.0

# Installation

```bash
npm install atttrpath
```

# Usage

### API
```js
const {AttrPath}: any = require("attrpath");
// or
import {AttrPath} from 'attrpath';
```

### traverse value. 

#### params
    object: any   Target Object.
    path: string  Traverse path.　The beginning of the path is always ".".

#### result: any　　　Objects obtained as a result of traverse.

```
AttrPath.traverse(object: any, path: string): any;
```
### path is valid?

#### params
    path: string  Traverse path.

#### result: boolean　　path is grammatically correct?　

```
AttrPath.is_valid(path: string): boolean;
```

### Exsample
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
### Example Data
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
### ESModule
```ts
import {AttrPath} from 'attrpath';

    AttrPath.traverse(value, '.children')
    AttrPath.is_valid('.children["john"].hobby[1].name')
```

### CommonJS
```ts
const {AttrPath} = require('attrpath');

    AttrPath.traverse(value, '.children');
    AttrPath.is_valid('.children["john"].hobby[1].name')
```


# Note

See demo.md for unclear cases.

# Author

info@seventh-code.com

# License

"AttrPath" is under [MIT license](https://en.wikipedia.org/wiki/MIT_License).





