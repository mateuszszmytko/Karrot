import { IConstructorAny } from "../../interfaces/constructor.interface";
export declare class Settings<T = any> {
    private targetElement;
    static defineStatic(controllerConstructor: IConstructorAny, options: {
        [key: string]: any;
    }): void;
    private settings;
    constructor(targetElement: HTMLElement, controllerConstructor: IConstructorAny);
    get<K extends keyof T>(property: K): T[K];
    set<K extends keyof T>(property: K, value: T[K], dataSync?: boolean): T[K];
}
