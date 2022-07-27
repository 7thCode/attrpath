 [README]　[DEMO]　[in detail]

# Detail

AttrPath is internally built using the following classes, and the classes themselves can be used.

 * ParserStream
 * BaseHandler
 * ValueHandler
 * BaseParser
 * FormulaParser
 * AttributeParser

Each class definition is shown below.

### ParserStream

```ts
 class ParserStream {
    
     /*
     * constructor
     * Set data
     */
    constructor(value: string);
    
    /*
     * char
     * Returns the current character.
     */
    public get char(): string;

    /*
     * charCode
     * Returns the character code of the current character with charCodeAt ().
     */
    public get charCode(): number;

    /*
     * current
     * Current string
     */
    public get current(): string;

    /*
     * is_terminal
     * Is it data circuit-terminating?
     */
    public get is_terminal(): boolean;
    
    /*
     * restore_point
     * Determine parsed termination.
     */
    public restore_point(): void;

    /*
     * restore
     * Restore to restore_point.
     */
    public restore(): void;

    /*
     * next
     * Advance the parsed end by one character.
     */
    public next(): void;

}
```

### BaseHandler

```ts
abstract class BaseHandler {
    abstract symbol(type: string, word: string): void;
}
```

### ValueHandler

```ts
class ValueHandler extends BaseHandler {
    
    /*
     * @param root_value - Target object
     */
    constructor(root_value: any);

    /*
     * Data
     */
    public get value(): any;
    
    /*
     * Symbol Handler
     *
     * Parser discovers Symbol.
     * @param type - Symbol Type
     * @param word - Word
     * @returns void
     */
    public symbol(type: string, word: string): void;
    
}
```

### BaseParser

```ts
export abstract class BaseParser {

    protected stream: ParserStream;
    protected handler: BaseHandler | null;
    
    constructor(handler: BaseHandler | null, stream: ParserStream);
    
    /*
     * is_s
     * s ::=  | \t
     */
    protected is_s(): boolean;

    /*
     * parse_s
     * S ::= ( " " | tab ) *
     * Spaces or Tabs
     */
    protected parse_s(): boolean;

    /*
     * is_terminal
     * is End of Data?
     */
    protected is_terminal(): boolean;

    /*
     * is_char
     * @param c
     * 文字を比較
     */
    protected is_char(c: string): boolean;

    /*
     * is_symbol
     */
    protected is_symbol(): boolean;

    /*
     * is_digit
     * digit ::= ( 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 )
     */
    protected is_digit(): boolean;

    /*
     * parse_number
     * number ::= digit *
     */
    protected parse_number(): boolean;
}
```

### FormulaParser


```ts
export class FormulaParser extends BaseParser {
    
    constructor(handler: BaseHandler | null, stream: ParserStream);
    
    // expr ::= term { S { "+" | "-" } S term } *
    protected is_expr(): boolean;

    // term ::= factor { S { "*" | "/" } S factor } *
    protected is_term(): boolean;

    // factor ::= "(" S expr S ")" | number
    protected is_factor(): boolean;

}
```

### AttributeParser


```ts
/**
 */
class AttributeParser extends FormulaParser {
    
    constructor(handler: BaseHandler | null, stream: ParserStream);

    /*
     * is_reading
     * reading ::= ( alpha | "_" | "$" ) *
     */
    protected is_reading(): boolean;

    /*
     * is_trailing
     * trailing ::= ( alpha | "_" | "$" | digit ) *
     */
    protected is_trailing(): boolean;

    /*
     * parse_name
     * name ::= reading [ trailing ]
     */
    protected parse_name(): boolean;

    /*
     * parse_string
     * string = "'" mame "'" | '"' mame '"'
     */
    protected parse_string(): boolean;

    /*
     * parse_attr
     * attr ::= "." name | '[' string | number ']'
     */
    protected parse_attr(): boolean;

    /*
     * parse_path
     * path ::= attr *
     */
    public parse_path(): boolean;

}
```


### Example

ESModule
```ts
import {AttributeParser, FormulaParser, ParserStream, BaseHandler, ValueHandler} from 'attrpath';

    function Pseudo_Traverse(obj: any, path: string): any {
        let result = undefined;
        const _handler = new ValueHandler(obj);
        if (new AttributeParser(_handler, new ParserStream(path)).parse_path()) {
            result = _handler.value;
        }
        return result;
    }

    Pseudo_Traverse(value, '.children')

    function Pseudo_isValid(path: string): any {
        return new AttributeParser(null, new ParserStream(path)).parse_path();
    }

    Pseudo_isValid('.children["john"].hobby[1].name')
```

CommonJS
```ts
const {AttributeParser, ValueHandler, ParserStream} = require('attrpath');

    function Pseudo_Traverse(obj: any, path: string): any {
        let result = undefined;
        const _handler = new ValueHandler(obj);
        if (new AttributeParser(_handler, new ParserStream(path)).parse_path()) {
            result = _handler.value;
        }
        return result;
    }

    Pseudo_Traverse(value, '.children');
    
    function Pseudo_isValid(path: string): any {
        return new AttributeParser(null, new ParserStream(path)).parse_path();
    }

    Pseudo_isValid('.children["john"].hobby[1].name');
```
[README]: ../README.md
[DEMO]: demo.md
[in detail]: detail.md