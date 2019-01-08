import { IControllerDev } from "../../interfaces";
export declare class ItemsParser {
    private _controllers;
    constructor(_controllers: IControllerDev[]);
    parse(controller: IControllerDev): void;
    private getItemObject;
    private appendItem;
    private getElementsByName;
}
