/**
 * Copyright © 2020 2021 2022 7thCode.(http://seventh-code.com/)
 * This software is released under the MIT License.
 * opensource.org/licenses/mit-license.php
 */

"use strict";

/**
 * isNumber
 *
 * @remarks
 * 値が数か
 *
 * @param value - 値
 * @returns 数か
 */
export function isNumber(value: unknown): boolean {
    return ((typeof value === 'number') && (isFinite(value)));
}

/**
 * isObject
 *
 * @remarks
 * 値がオブジェクトか.
 * [],{}はオブジェクト。
 *
 * @param value - 値
 * @returns オブジェクトか
 */
export function isContainer(value: unknown): boolean {
    return ((value !== null) && (typeof value === 'object'));
}

