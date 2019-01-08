import { IControllerArgs } from "../interfaces/controller.interface";
export declare function Controller<T>(data: IControllerArgs): (con: new (...args: any[]) => T) => void;
