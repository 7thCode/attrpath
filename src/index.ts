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
 * Helper
 */
export class AttrPath {

    /**
     * traverse
     *
     * @remarks
     * オブジェクトのアトリビュートをトラバースしてその値を得る
     *
     * @param obj - オブジェクト
     * @param path - パス eg. ".x.Y.z[1]"
     * @returns 要素
     *
     */
    static traverse(obj: any, path: string): any {
        let result = undefined;
        const _handler: ValueHandler = new ValueHandler(obj);
        if (new AttributeParser(_handler, new ParserStream(path)).parse_path()) {
            result = _handler.value;
        }
        return result;
    }

    /**
     * valid
     *
     * @remarks
     * オブジェクトのアトリビュートをトラバースしてその値を得る
     *
     * @param path - パス eg. ".x.Y.z[1]"
     * @returns 要素
     *
     */
    static is_valid(path: string): any {
        return new AttributeParser(null, new ParserStream(path)).parse_path();
    }
}

module.exports = {AttrPath, AttributeParser, ValueHandler, ParserStream}
