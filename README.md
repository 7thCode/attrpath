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
---
# Features
Safely traverse the object path using the given path string.
Also, an array may be included in the middle of the path.

---
# Installation

```bash
npm install atttrpath
```
No modules depend on it.

---
# Usage

## Import
```js
const {AttrPath}: any = require("attrpath");
// or
import {AttrPath} from 'attrpath';
```
---
## traverse value.
```js
result = AttrPath.traverse(object, path [default_value]);
```
#### params
| params                  | meaning                                                                                            |
|-------------------------|----------------------------------------------------------------------------------------------------|
| object: any             | Target Object.                                                                                     |
| path: string            | Traverse path.　The beginning of the path is "." or "[".                                            |
| e.g.                    | ".cat.eye.left",  ".dog['leg'][1].pad" , etc...                                                    |
| default_value: any      | The value to return if there is no corresponding value in the object path. default is "undefined". |
| default_value: function | If you give a function, give the traverse result to the first argument of the function.            |
#### result
| result      | meaning                                   |
|-------------|-------------------------------------------|
| result: any | Objects obtained as a result of traverse. |

---
## Update the value if possible.

```js
result = AttrPath.update(object, path , value);
```
#### params
| params             | meaning                                                                                           |
|--------------------|---------------------------------------------------------------------------------------------------|
| object: any        | Target Object.                                                                                    |
| path: string       | Traverse path.　The beginning of the path is "." or "[".                                           |
| e.g.               | ".cat.eye.left",  ".dog['leg'][1].pad" , etc...                                                   |
| value: any         | The value to update if the path exists.|
#### result
| result          | meaning        |
|-----------------|----------------|
| result: boolean | Has an update. |

---
## path is grammatically valid?
```js
result = AttrPath.is_valid(path);
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
---
## Example
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


const Default = (n:any) => {
	console.log(n);
}

AttrPath.traverse(value, '.children.john.hobby[0].name', Default)

> "Max"

console.log(AttrPath.is_valid('.children.john.hobby[0].name'))

> true

console.log(AttrPath.is_valid('.children.john.hobby[0]..name'))

> false
```
---
## more Example
```js
class Klass {
	member = "name";

	Member() {
		return AttrPath.traverse(this, '.member');
	}
}

const klass = new Klass();
console.log(klass.Member())

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
console.log(sub_klass.Member())

> "name"
```
---
## Example Data
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
---
## ESModule
```js
import {AttrPath} from 'attrpath';

    AttrPath.traverse(value, '.children')
    AttrPath.is_valid('.children["john"].hobby[1].name')
```
---
## CommonJS
```js
const {AttrPath} = require('attrpath');

    AttrPath.traverse(value, '.children');
    AttrPath.is_valid('.children["john"].hobby[1].name')
```
---
## Array
The original value can be an array.
```js
const {AttrPath} = require('attrpath');

    AttrPath.traverse([1], '[0]');
```
---
## Undefined
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
---
# Tips
Note that the result object is just the argument object, so mutating the result object has the side effect of modifying the argument object. This side effect can actually be useful.
```js
const before = [{name: "Dance"}];
AttrPath.traverse(before, '[0]').name = "Breaking";
console.log(before);
		
[{name: "Breaking"}]
```
---
# Hostory
## v0.5.5
#### update Method.
update Method impl.
## v0.5.2
#### Bug Fix
Fixed to work correctly when the key contains ".".
```js
    const value = {
        "children.john": {
                hobby: [{name: "Cycling"}, {name: "Dance"}],
                pet: [{type: "dog", name: "Max"}]
            }
    };

    AttrPath.traverse(value, "['children.john']");
```
# Development

## Commands

### Build
```bash
npm run build          # Build both CommonJS and ESM modules
npm run build:common   # Build CommonJS module only  
npm run build:esm      # Build ESM module only
```

### Testing
```bash
npm test              # Run all tests with Jest
npm run test          # Same as above
```

### Documentation
```bash
npm run doc           # Generate TypeDoc documentation in docs/typedoc/
```

### Development Workflow
```bash
npm run prepare       # Automatically runs build (executed on npm install)
```

## Project Architecture

AttrPath is a TypeScript library for safely traversing JavaScript object attribute paths using string notation. The core architecture consists of:

### Core Components

**AttrPath (src/index.ts)** - Main API class with static methods:
- `traverse(target, path, default_value?)` - Safely navigate object paths
- `update(target, path, value)` - Update values at specific paths
- `is_valid(path)` - Validate path syntax

**Parser System (src/parser.ts)**:
- `AttributeParser` - Main parser for attribute path strings
- `FormulaParser` - Extended parser for formula expressions
- `BaseParser` - Shared parsing functionality
- `TokenType` - Enum defining token types for parsing

**Handler System (src/handler.ts)**:
- `ValueHandler` - Extracts values during path traversal
- `Updater` - Updates values during path traversal
- `BaseHandler` - Abstract base for handler implementations

**Stream Processing (src/stream.ts)**:
- `ParserStream` - Character stream processing for path parsing

**Utilities (src/base.ts)**:
- Type checking utilities (`isNumber`, `isContainer`, `isValue`)

### Path Syntax

The library supports complex path expressions:
- Object properties: `.property` or `['property']`
- Array indices: `[0]` or `[index]`
- Mixed paths: `.children.john.hobby[1].name`
- Keys with dots: `['children.john']`

### Build System

Dual module support:
- **CommonJS**: Built to `dist/` using `tsconfig.json`
- **ESM**: Built to `dist/esm/` using `tsconfig.esm.json`

Both builds include TypeScript declarations and source maps.

### Testing

- **Framework**: Jest with ts-jest transformer
- **Coverage**: Enabled with output to `docs/coverage/`
- **Test Files**: Located in `src/test.ts`
- **Configuration**: `jest.config.ts`

The test suite covers the core API, parsing logic, and edge cases for safe traversal.

---
# Note

The results of using objects, arrays, and symbols as keys are unknown.

See demo.md for unclear cases.


# Author
info@seventh-code.com
# License
"AttrPath" is under [MIT license](https://en.wikipedia.org/wiki/MIT_License).

[README]: README.md
[DEMO]: docs/demo.md
[in detail]: docs/detail.md

