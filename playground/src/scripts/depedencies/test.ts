import { Injectable, Hooks } from "@karrot/core";

@Injectable()
export class Test {
    private _data: {a: string, c: string} = {
        a: 'b',
        c: 'd',
    };

    public set data(val: {a: string, c: string}) {
        this._data = val;

        this.hooks.doAction('dataChange', this._data);
    }

    public get data(): {a: string, c: string} {
        return this._data;
    }

    constructor(public readonly hooks: Hooks) {
        console.log(hooks);
    }

    public doLog(): Test {
        console.log('log');

        this.data = {
            a: 'z',
            c: 'x',
        };

        return this;
    }
}
