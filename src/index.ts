/**
 * Copyright © 2020 2021 2022 7thCode.(http://seventh-code.com/)
 * This software is released under the MIT License.
 * opensource.org/licenses/mit-license.php
 */

"use strict";

import {AttributeParser, FormulaParser} from './parser';
import {ParserStream} from './stream';
import {BaseHandler, Updater, ValueHandler} from './handler';

export {AttributeParser, FormulaParser, ParserStream, BaseHandler, ValueHandler};

/**
 * AttrPath
 */
export class AttrPath {

    /**
     * traverse
     *
     * @remarks
     * Traverse an object's attributes to get its value.
     *
     * @param target - Object
     * @param path - ObjectPath e.g. ".x.Y.z[1]"
     * @param default_value - The value to return if there is no corresponding value in the object path. default is "undefined"
     * @returns The value at the position of the path.
     *
     */
    static traverse(target: any, path: string, default_value: any = undefined): any {
        let result = default_value;
        if (target) {
            const handler: ValueHandler = new ValueHandler(target);
            if (new AttributeParser(handler, new ParserStream(path)).parse_path()) {
                if (handler.value) {
                    result = handler.value;
                }
            }
            if (default_value && typeof default_value === 'function') {
                default_value(result);
                return null;
            }
        }
        return result;
    }

    static update(target: any, path: string, value:any): any {
        let result: any;
        if (target) {
            const updater: Updater = new Updater(target, value);
            if (new AttributeParser(updater, new ParserStream(path)).parse_path()) {
                result = target;
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

