import { IConstructorAny } from "../interfaces/constructor.interface";
import { IControllerDev } from "../interfaces/controller.interface";

export class ControllersStorage {
    private _controllers: IControllerDev[] = [];

    constructor(private _controllersConstructors: IConstructorAny[]) {
        //
    }

    public get controllers(): IControllerDev[] {
        return this._controllers;
    }

    public get controllersConstructors(): IConstructorAny[] {
        return this._controllersConstructors;
    }

}
