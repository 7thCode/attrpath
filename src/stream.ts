/**
 * Copyright © 2020 2021 2022 7thCode.(http://seventh-code.com/)
 * This software is released under the MIT License.
 * opensource.org/licenses/mit-license.php
 */

"use strict";

/**
 * ParserStream
 */
export class ParserStream {

	private start: number = 0;
	private end: number = 0;
	private value: string = "";

	/**
	 * char
	 *
	 * @remarks current position char
	 */
	public get char(): string {
		return this.value.charAt(this.end);
	}

	/**
	 * charCode
	 *
	 * @remarks current position charCode
	 */
	public get charCode(): number {
		return this.value.charCodeAt(this.end);
	}

	/**
	 * current
	 *
	 * @remarks
	 * String between restore point and current position.
	 */
	public get current(): string {
		return this.value.substring(this.start, this.end);
	}

	/**
	 * is_terminal
	 *
	 * @remarks end？
	 */
	public get is_terminal(): boolean {
		return (this.value.length <= this.end);
	}

	/*
	*
	*
	* */
	constructor(value: string) {
		this.value = value;
	}

	/**
	 * restore_point
	 *
	 * @remarks save point.
	 */
	public restore_point(): void {
		this.start = this.end;
	}

	/**
	 * restore
	 *
	 * @remarks current position restore to restore_point.
	 */
	public restore(): void {
		this.end = this.start;
	}

	/**
	 * next
	 *
	 * @remarks Advance the parsed end by one character
	 */
	public next(): void {
		this.end++;
	}

}
