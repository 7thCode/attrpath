/**
 * Copyright © 2020 2021 2022 7thCode.(http://seventh-code.com/)
 * This software is released under the MIT License.
 * opensource.org/licenses/mit-license.php
 */

"use strict";

const parser: any = require("./parser");
const stream: any = require("./stream");
const handler: any = require("./handler");

/**
 * Helper
 */
class AttrPath {

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
        const _handler: ValueHandler = new handler.ValueHandler(obj);
        new parser.AttributeParser(_handler, new stream.ParserStream(path)).parse_path();
        return _handler.value;
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

