import { DataParser } from "../utils/data-parser";
import { Hooks } from "./hooks";
import { ISettings } from "../interfaces/settings.interface";

export interface IFilters {
    // tslint:disable-next-line:no-any
    [key: string]: (...args: any) => any;
}

export interface IActions {
    // tslint:disable-next-line:no-any
    [key: string]: (...args: any) => void;
}
// tslint:disable-next-line
export abstract class KarrotController {
    public readonly hooks: Hooks<IActions, IFilters> = new Hooks();
    private _settings: ISettings = {};

    public set settings(val: ISettings) {
        this._settings = Object.assign(this._settings, val);
    }

    public get settings(): ISettings {
        return this._settings;
    }

    constructor(public element: HTMLElement) {
        this.parseSettings();
    }

    public addAction<T extends keyof IActions>(actionName: T, action: IActions[T], index: number = 100): void {
        this.hooks.addAction(actionName, action, index);
    }

    public addFilter<T extends keyof IFilters>(filterName: T, filter: IFilters[T], index: number = 100): void {
        this.hooks.addFilter(filterName, filter, index);
    }

    private parseSettings(): void {
        this.settings = DataParser.parse(this.element);
    }

}

/*
1. settings (from element) done
2. hooks (with proteced methods)
*/
