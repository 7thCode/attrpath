/**
 * Copyright © 2020 2021 2022 7thCode.(http://seventh-code.com/)
 * This software is released under the MIT License.
 * opensource.org/licenses/mit-license.php
 */

"use strict";

import {isContainer} from "./base";

/**
 * BaseHandler
 *
 * @remarks
 *
 */
export abstract class BaseHandler {
    abstract symbol(type: string, word: string): void;
}

/**
 * ValueHandler
 *
 * @remarks
 *
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
     * Executed when Parser recognizes Token.
     *
     * @param type - Symbol Type
     * @param word
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
     * Extract array elements from index
     *
     * @param array - Array
     * @param index - Index
     * @returns Array member
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
     * Returns an object member.
     *
     * @param obj - Object
     * @param attr - Attribute Name
     * @returns Object member
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
