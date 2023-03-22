<div align="center">
<h1>AttrPath</h1>
<img style="height:200px" src="https://raw.githubusercontent.com/7thCode/attrpath/0281b0c1d1984b451394de4a0f4d15c075338401/AttributeParser.svg" alt="" title="">

Object Attribute Path Traverser.
**Safely** traverse the javascript attribute tree using a text path representation.
You can also check the existence of the path.

![GitHub package.json version](https://img.shields.io/github/package-json/v/7thcode/attrpath?color=deepgreen)
[![npm version](https://badge.fury.io/js/attrpath.svg)](https://badge.fury.io/js/attrpath)
![npm type definitions](https://img.shields.io/npm/types/attrpath)
![GitHub](https://img.shields.io/github/license/7thcode/attrpath)
[![7thCode](https://circleci.com/gh/7thCode/attrpath.svg?style=shield)]()
![node.js.yml](https://github.com/7thCode/attrpath/actions/workflows/node.js.yml/badge.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/7thcode/attrpath)

 [README]　[DEMO]　[in detail]

</div>

***

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

or

answer = value?.children?.john?.hobby[1]?.name;

```

The ugly thing above is nice if you can write it like this, right?

```js
const {AttrPath}: any = require("attrpath");

var answer = AttrPath.traverse(value, ".children.john.hobby[1].name");
```

# Features
Safely traverse the object path using the given path string.
Also, an array may be included in the middle of the path.

# Installation

```bash
npm install atttrpath
```
No modules depend on it.
# Usage
### API
```js
const {AttrPath}: any = require("attrpath");
// or
import {AttrPath} from 'attrpath';
```
### traverse value.

```js
AttrPath.traverse(object, path [,default_value]);
```

#### params

| params             | meaning                                                                                            |
|--------------------|----------------------------------------------------------------------------------------------------|
| object: any        | Target Object.                                                                                     |
| path: string       | Traverse path.　The beginning of the path is "." or "[".                                            |
| e.g.               | ".cat.eye.left",  ".dog['leg'][1].pad" , etc...                                                    |
| default_value: any | The value to return if there is no corresponding value in the object path. default is "undefined". |

#### result

| result      | meaning                                   |
|-------------|-------------------------------------------|
| result: any | Objects obtained as a result of traverse. |

### path is grammatically valid?

```js
AttrPath.is_valid(path);
```

#### params

| params       | meaning        |
|--------------|----------------|
| path: string | Traverse path. |

#### result

| result          | meaning                         |
|-----------------|---------------------------------|
| result: boolean | path is grammatically correct?  |


### Default Value
If the result is Undefined, the default value is returned.
```js
const {AttrPath} = require('attrpath');

    AttrPath.traverse({}, '.path', 1);
```

### Example
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
### more Example
```js
class Klass {
	member = "name";

	Member() {
		return AttrPath.traverse(this, '.member');
	}
}

const klass = new Klass();
console.log(klass.Member());

> "name"
```
```js
class ParentKlass {
	member = "name";
}

class SubKlass extends ParentKlass {
	Member() {
		return AttrPath.traverse(this, '.member');
	}
}

const sub_klass = new SubKlass();
console.log(sub_klass.Member());

> "name"
```

### Example Data
```js
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
```js
import {AttrPath} from 'attrpath';

    AttrPath.traverse(value, '.children')
    AttrPath.is_valid('.children["john"].hobby[1].name')
```
### CommonJS
```js
const {AttrPath} = require('attrpath');

    AttrPath.traverse(value, '.children');
    AttrPath.is_valid('.children["john"].hobby[1].name')
```

### Array
The original value can be an array.
```js
const {AttrPath} = require('attrpath');

    AttrPath.traverse([1], '[0]');
```

### Undefined
Returns Undefined if the original value is not an object.
```js
const {AttrPath} = require('attrpath');

    AttrPath.traverse(null, '.path');
    AttrPath.traverse(undefined, '.path');
    AttrPath.traverse(false, '.path');
    AttrPath.traverse(true, '.path');
    AttrPath.traverse(NaN, '.path');
    AttrPath.traverse(Infinity, '.path');
    AttrPath.traverse(0, '.path');
    AttrPath.traverse(-1, '.path');
    AttrPath.traverse("", '.path');
    AttrPath.traverse("1", '.path');
    AttrPath.traverse([1], '.path');
    AttrPath.traverse({}, '.path');
```
# Note
See demo.md for unclear cases.
# Author
info@seventh-code.com
# License
"AttrPath" is under [MIT license](https://en.wikipedia.org/wiki/MIT_License).

[README]: README.md
[DEMO]: docs/demo.md
[in detail]: docs/detail.md

