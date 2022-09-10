/**
 * Copyright © 2020 2021 2022 7thCode.(http://seventh-code.com/)
 * This software is released under the MIT License.
 * opensource.org/licenses/mit-license.php
 */

"use strict";

import {AttributeParser, FormulaParser} from './parser';
import {ParserStream} from './stream';
import {BaseHandler, ValueHandler} from './handler';

export {AttributeParser, FormulaParser, ParserStream, BaseHandler, ValueHandler};

/**
 * AttrPath
 *
 *
 */
export class AttrPath {

    /**
     * traverse
     *
     * @remarks
     * Traverse an object's attributes to get its value.
     *
     * @param obj - Object
     * @param path - ObjectPath e.g. ".x.Y.z[1]"
     * @param default_value - The value to return if there is no corresponding value in the object path. default is "undefined"
     * @returns The value at the position of the path.
     *
     */
    static traverse(obj: any, path: string, default_value: any = undefined): any {
        let result = default_value;
        const _handler: ValueHandler = new ValueHandler(obj);
        if (new AttributeParser(_handler, new ParserStream(path)).parse_path()) {
            if (_handler.value) {
                 result = _handler.value;
            }
        }
        return result;
    }

    /**
     * is_valid
     *
     * @remarks
     * Is the path grammatically correct?
     *
     * @param path - ObjectPath e.g. ".x.Y.z[1]"
     * @returns true/false
     *
     */
    static is_valid(path: string): boolean {
        return new AttributeParser(null, new ParserStream(path)).parse_path();
    }
}

