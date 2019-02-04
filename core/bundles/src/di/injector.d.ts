import { IConstructor, IConstructorAny } from "../interfaces/constructor.interface";
declare type DependencyCapsule = {
    type: 'singleton' | 'transient';
    dependencyCon: IConstructorAny;
};
export interface IInjector {
    parent?: IInjector;
    dependencies: any[];
    dependenciesCapsules: DependencyCapsule[];
    addTransient<T>(dependencyCon: IConstructor<T>): void;
    addSingleton<T>(dependencyCon: IConstructor<T>, dependency?: T): void;
    add<T>(dependencyCon: IConstructor<T>, type: 'singleton' | 'transient', dependency?: T): void;
    getDependency<T>(dependencyCon: IConstructor<T>): T | undefined;
    getDependencies<T>(dependencyCon: IConstructor<T>): T[];
    resolve<T>(targetCon: IConstructor<T>): T;
}
export declare class Injector implements IInjector {
    parent?: IInjector | undefined;
    private _dependencies;
    private _dependenciesCapsules;
    readonly dependencies: any[];
    readonly dependenciesCapsules: DependencyCapsule[];
    constructor(parent?: IInjector | undefined);
    addTransient<T>(dependencyCon: IConstructor<T>): void;
    addSingleton<T>(dependencyCon: IConstructor<T>, dependency?: T): void;
    add<T>(dependencyCon: IConstructor<T>, type?: 'singleton' | 'transient', dependency?: T): void;
    getDependency<T>(dependencyCon: IConstructor<T>): T | undefined;
    getDependencies<T>(dependencyCon: IConstructor<T>): T[];
    resolve<T>(targetCon: IConstructor<T>): T;
    resolveMethod(obj: any, method: string): void;
    createChildInjector(): IInjector;
    private getOrCreateDependency;
    private createInstance;
}
export {};
