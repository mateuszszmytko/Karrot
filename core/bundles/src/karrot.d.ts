import { IFunctionAny, IConstructor, IConstructorAny } from "./interfaces/constructor.interface";
import { Controller } from "./controller";
export declare class Karrot extends Controller {
    static init(): void;
    static attach(name: string, ...attached: Array<IConstructorAny | IFunctionAny>): void;
    static getMany(name: string, ...typeOrContexts: HTMLElement[]): Karrot[];
    static getMany<T>(name: string | HTMLElement, ...typeOrContexts: Array<IConstructor<T> | HTMLElement>): T[];
    static get(name: string, ...typeOrContexts: HTMLElement[]): Karrot | undefined;
    static get<T>(name: string | HTMLElement, ...typeOrContexts: Array<IConstructor<T> | HTMLElement>): T | undefined;
    private static imp;
    readonly names: string[];
    readonly attachments: any[];
    attach(...attachments: Array<IConstructorAny | IFunctionAny>): void;
}
