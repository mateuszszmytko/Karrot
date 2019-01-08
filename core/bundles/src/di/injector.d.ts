import { IConstructor, IConstructorAny } from "../interfaces/constructor.interface";
declare type DepedencyCapsule = {
    type: 'singleton' | 'transient';
    depedencyCon: IConstructorAny;
};
export interface IInjector {
    parent?: IInjector;
    depedencies: any[];
    depedenciesCapsules: DepedencyCapsule[];
    addTransient<T>(depedencyCon: IConstructor<T>): void;
    addSingleton<T>(depedencyCon: IConstructor<T>, depedency?: T): void;
    add<T>(depedencyCon: IConstructor<T>, type: 'singleton' | 'transient', depedency?: T): void;
    getDepedency<T>(depedencyCon: IConstructor<T>): T | undefined;
    getDepedencys<T>(depedencyCon: IConstructor<T>): T[];
    resolve<T>(targetCon: IConstructor<T>): T;
}
export declare class Injector implements IInjector {
    parent?: IInjector | undefined;
    private _depedencies;
    private _depedenciesCapsules;
    readonly depedencies: any[];
    readonly depedenciesCapsules: DepedencyCapsule[];
    constructor(parent?: IInjector | undefined);
    addTransient<T>(depedencyCon: IConstructor<T>): void;
    addSingleton<T>(depedencyCon: IConstructor<T>, depedency?: T): void;
    add<T>(depedencyCon: IConstructor<T>, type?: 'singleton' | 'transient', depedency?: T): void;
    getDepedency<T>(depedencyCon: IConstructor<T>): T | undefined;
    getDepedencys<T>(depedencyCon: IConstructor<T>): T[];
    resolve<T>(targetCon: IConstructor<T>): T;
    resolveMethod(obj: any, method: string): void;
    createChildInjector(): IInjector;
    private getOrCreateDepedency;
    private createInstance;
}
export {};
