/**
 * Copyright © 2020 2021 2022 7thCode.(http://seventh-code.com/)
 * This software is released under the MIT License.
 * opensource.org/licenses/mit-license.php
 */

"use strict";

const parser: any = require("./parser");
const stream: any = require("./stream");
const handler: any = require("./handler");

import { ValueHandler } from './handler';

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
        const _handler: ValueHandler = new handler.ValueHandler(obj);
        if (new parser.AttributeParser(_handler, new stream.ParserStream(path)).parse_path()) {
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
        return new parser.AttributeParser(null, new stream.ParserStream(path)).parse_path();
    }
}

module.exports = AttrPath;

