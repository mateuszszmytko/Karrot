import { IConstructorAny, IControllerDev, IControllerMeta } from "../interfaces";
export declare class ControllerUtils {
    static getControllerId(): string;
    static getControllerMeta(target: IConstructorAny | IControllerDev): IControllerMeta;
    private static _currentControllerId;
    private static _conntrollers;
}
