/**
 * Copyright © 2020 2021 2022 7thCode.(http://seventh-code.com/)
 * This software is released under the MIT License.
 * opensource.org/licenses/mit-license.php
 */

"use strict";

import {isContainer} from "./base";

/**
 * BaseHandler
 * @remarks
 */
export abstract class BaseHandler {
    abstract symbol(type: string, word: string): void;
}

/**
 * ValueHandler
 * @remarks
 */
export class ValueHandler extends BaseHandler {

    private _value: any = null;

     /**
     * value
     *
     * Data
     */
    public get value(): any {
        return this._value;
    }

    /**
     *
     * @remarks
     */
    constructor(root_value: any) {
        super();
        this._value = root_value;
    }

    /**
     * Symbol Handler
     *
     * @remarks
     * ParserがSymbolを発見した
     *
     * @param type - Symbol Type
     * @param word - 単語
     * @returns void
     *
     */
    public symbol(type: string, word: string): void {
        switch (type) {
            case "operator":
                //           console.log("operator " + word);
                break;
            case "number":
                //            console.log("number " + word);
                break;
            case "index":
                this._value = ValueHandler.sibling(this._value, word);
                break;
            case "name":
                this._value = ValueHandler.child(this._value, word);
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
    protected static sibling(array: any[], index: string): any {
        let result: any = undefined;
        if (Array.isArray(array)) {
            result = array[Number(index)];
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
    protected static child(obj: any, attr: string): any {
        let result: any = undefined;
        if (isContainer(obj)) {
            if (attr in obj) {
                result = obj[attr];
            }
        }
        return result;
    }

}
