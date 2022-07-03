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
     　*
     　* @remarks
     　*/
    constructor(value: string) {
        this.value = value;
    }

    /**
     　* commit
     　*
     　* @remarks パース済み終端を決定
     　*/
    public commit(): void {
        this.start = this.end;
    }

    /**
     　* rollback
     　*
     　* @remarks パース済み終端を決定時点まで復元
     　*/
    public rollback(): void {
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

    /**
     　* charCode
     　*
     　* @remarks 現状の文字コード
     　*/
    public charCode(): number {
        return this.value.charCodeAt(this.end);
    }

    /**
     　* char
     　*
     　* @remarks 現状の文字
     　*/
    public char(): string {
        return this.value.charAt(this.end);
    }

    /**
     * current
     *
     * @remarks 現状の文字列
     */
    public current(): string {
        return this.value.substring(this.start, this.end);
    }
}

module.exports = {ParserStream};