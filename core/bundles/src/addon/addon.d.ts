import { ISettings } from "src/interfaces";
import { Hooks } from "./hooks";
export declare type TKarrotCapsule = {
    element: HTMLElement;
    hooks: Hooks;
    settings: ISettings;
};
export declare class Addon {
    element: HTMLElement;
    settings: ISettings;
    hooks: Hooks;
    appendSettings(settings: ISettings): ISettings;
    protected kOnInit(capsule: TKarrotCapsule): void;
}
