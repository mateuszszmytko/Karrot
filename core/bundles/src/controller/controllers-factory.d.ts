import { IControllerDev } from "../interfaces";
import { IConstructorAny } from "../interfaces/constructor.interface";
import { IInjector } from "../di/injector";
export declare class ControllersFactory {
    private _injector;
    private _controllersConstructors;
    constructor(_injector: IInjector);
    create(constructor: IConstructorAny): IControllerDev[];
    private createController;
}
