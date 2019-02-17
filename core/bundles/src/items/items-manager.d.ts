import { ItemsStorage } from "./items-storage";
import { IFunctionAny, IConstructorAny, IConstructor } from "../interfaces/constructor.interface";
export declare class ItemsManager {
    private _storage;
    constructor(_storage: ItemsStorage);
    get<T>(name: string | HTMLElement, type: IConstructor<T>, context?: HTMLElement): T[];
    attach(name: string, ...attached: Array<IConstructorAny | IFunctionAny>): void;
}
