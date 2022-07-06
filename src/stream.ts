/**
 * Copyright © 2020 2021 2022 7thCode.(http://seventh-code.com/)
 * This software is released under the MIT License.
 * opensource.org/licenses/mit-license.php
 */

/**
 */
class ParserStream {

    private start: number = 0;
    private end: number = 0;
    private value: string = "";

    /**
     * char
     *
     * @remarks 現状の文字
     */
    public get char(): string {
        return this.value.charAt(this.end);
    }

    /**
     * charCode
     *
     * @remarks 現状の文字コード
     */
    public get charCode(): number {
        return this.value.charCodeAt(this.end);
    }

    /**
     * current
     *
     * @remarks 現状の文字列
     */
    public get current(): string {
        return this.value.substring(this.start, this.end);
    }

    /**
     * is_terminal
     *
     * @remarks 終端か？
     */
    public get is_terminal(): boolean {
        return (this.value.length <= this.end);
    }

    constructor(value: string) {
        this.value = value;
    }

    /**
     * restore_point
     *
     * @remarks パース済み終端を決定
     */
    public restore_point(): void {
        this.start = this.end;
    }

    /**
     * restore
     *
     * @remarks commitまで戻す
     */
    public restore(): void {
        this.end = this.start;
    }

    /**
     * next
     *
     * @remarks パース済み終端を一文字進める
     */
    public next(): void {
        this.end++;
    }

}

module.exports = {ParserStream};