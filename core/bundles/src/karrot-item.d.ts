import { IConstructor, IConstructorAny, IFunctionAttach } from "./interfaces/constructor.interface";
import { Hooks } from "./addon/hooks";
import { ISettings } from "./interfaces/settings.interface";
export declare class KarrotItem<E extends HTMLElement = HTMLElement> {
    element: E;
    readonly names: string[];
    readonly attachments: any[];
    readonly hooks: Hooks;
    private _settings;
    readonly settings: ISettings;
    constructor(element: E);
    appendSettings(settings: ISettings): ISettings;
    attach(...attachments: Array<IConstructorAny | IFunctionAttach>): void;
    attachment<T>(type: IConstructor<T>): T | undefined;
}
