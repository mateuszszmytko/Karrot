import { IConstructorAny } from "../interfaces/constructor.interface";
import { IControllerDev } from "../interfaces/controller.interface";
export declare class ControllersStorage {
    private _controllersConstructors;
    private _controllers;
    constructor(_controllersConstructors: IConstructorAny[]);
    readonly controllers: IControllerDev[];
    readonly controllersConstructors: IConstructorAny[];
}
