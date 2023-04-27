/**
 * Copyright © 2020 2021 2022 7thCode.(http://seventh-code.com/)
 * This software is released under the MIT License.
 * opensource.org/licenses/mit-license.php
 */

"use strict";

import {isContainer} from "./base";
import {TokenType} from "./parser";

/**
 * BaseHandler
 *
 * @remarks
 *
 */
export abstract class BaseHandler {
	abstract token(type: TokenType, word: string, term: boolean): void;
}

/**
 * ValueHandler
 *　
 * actually traverse the object.
 *
 * @remarks
 *
 */
export class ValueHandler extends BaseHandler {

	protected current_value: any = null;

	/**
	 * value
	 *
	 * Data
	 */
	public get value(): any {
		return this.current_value;
	}

	/**
	 *
	 * @remarks
	 */
	constructor(root_value: any) {
		super();
		this.current_value = root_value;
	}

	/**
	 * Symbol Handler
	 *
	 * @remarks
	 * Executed when Parser recognizes Token.
	 *
	 * @param type - Symbol Type
	 * @param word
	 * @param term
	 * @returns void
	 *
	 */
	public token(type: TokenType, word: string, term: boolean): void {
		switch (type) {
			case TokenType.operator:
				//           console.log("operator " + word);
				break;
			case TokenType.number:
				//            console.log("number " + word);
				break;
			case TokenType.index:
				this.current_value = ValueHandler.sibling(this.current_value, word);
				break;
			case TokenType.name:
				this.current_value = ValueHandler.child(this.current_value, word);
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

/**
 * Updater
 *
 * It actually traverses and updates objects.
 *
 * @remarks
 *
 */
export class Updater extends ValueHandler {

	private readonly new_value: any;

	/**
	 *
	 * @remarks
	 */
	constructor(root_value: any, new_value: any) {
		super(root_value);
		this.new_value = new_value;
	}

	/**
	 * Symbol Handler
	 *
	 * @remarks
	 * Executed when Parser recognizes Token.
	 *
	 * @param type - Symbol Type
	 * @param word
	 * @param term
	 * @returns void
	 *
	 */
	public token(type: TokenType, word: string, term: boolean): void {
		switch (type) {
			case TokenType.index: {
				if (term) {
					if (this.current_value.length > word) {
						this.current_value[word] = this.new_value;
					}
				} else {
					this.current_value = Updater.sibling(this.current_value, word);
				}
			}
				break;
			case TokenType.name: {
				if (term) {
					this.current_value[word] = this.new_value;
				} else {
					this.current_value = Updater.child(this.current_value, word);
				}
			}
				break;
		}
	}

}
