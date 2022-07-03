/**
 * Copyright © 2020 2021 2022 7thCode.(http://seventh-code.com/)
 * This software is released under the MIT License.
 * opensource.org/licenses/mit-license.php
 */

"use strict";

const base: any = require("./base");

/**
 * BaseHandler
 * @remarks
 */
abstract class BaseHandler {
    abstract symbol(type: string, stream: ParserStream): void;
}

/**
 * ValueHandler
 * @remarks
 */
class ValueHandler extends BaseHandler {

    public value: any = null;

    /**
     *
     * @remarks
     */
    constructor(value: any) {
        super();
        this.value = value;
    }

    /**
     * Symbol Handler
     *
     * @remarks
     * ParserがSymbolを発見した
     *
     * @param type - Symbol Type
     * @param stream - ソースストリーム
     * @returns void
     *
     */
    public symbol(type: string, stream: ParserStream): void {
        switch (type) {
            case "index":
                this.value = this.sibling(this.value, stream.current());
                break;
            case "name":
                this.value = this.child(this.value, stream.current());
                break;
        }
    }

    /**
     * Sibling
     *
     * @remarks
     * 配列が発見された
     *
     * @param array - 配列
     * @param index - インデックス
     * @returns 配列要素
     *
     */
    public sibling(array: any[], index: string): any {
        let result: any = undefined;
        if (Array.isArray(array)) {
            return array[Number(index)];
        }
        return result;
    }

    /**
     * child
     *
     * @remarks
     * オブジェクトが発見された
     *
     * @param obj - オブジェクト
     * @param attr - 識別子
     * @returns 配列要素
     *
     */
    public child(obj: any, attr: string): any {
        let result: any = undefined;
        if (base.isContainer(obj)) {
            if (attr in obj) {
                result = obj[attr];
            }
        }
        return result;
    }

}

module.exports = {ValueHandler, BaseHandler};

