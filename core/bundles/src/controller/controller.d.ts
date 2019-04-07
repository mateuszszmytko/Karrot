import { Hooks } from "./hooks";
import { ISettings } from "../interfaces/settings.interface";
export interface IFilters {
    [key: string]: (...args: any[]) => any;
}
export interface IActions {
    [key: string]: (...args: any[]) => void;
}
export declare abstract class KarrotController {
    element: HTMLElement;
    readonly hooks: Hooks<IActions, IFilters>;
    private _settings;
    settings: ISettings;
    constructor(element: HTMLElement);
    addAction<T extends keyof IActions>(actionName: T, action: IActions[T], index?: number): void;
    addFilter<T extends keyof IFilters>(filterName: T, filter: IFilters[T], index?: number): void;
    private parseSettings;
}
