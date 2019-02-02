import { IConstructor, IConstructorAny } from "../interfaces/constructor.interface";

/* tslint:disable:no-any */

type DependencyCapsule = {
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
    getDependencys<T>(dependencyCon: IConstructor<T>): T[];

    resolve<T>(targetCon: IConstructor<T>): T;
}

export class Injector implements IInjector {
    private _dependencies: any[] = [];
    private _dependenciesCapsules: DependencyCapsule[] = [];

    public get dependencies(): any[] {
        let dependencies = this._dependencies;

        if (this.parent) {
            dependencies = dependencies.concat(this.parent.dependencies);
        }

        return dependencies;
    }

    public get dependenciesCapsules(): DependencyCapsule[] {
        let dependenciesCapsules = this._dependenciesCapsules;

        if (this.parent) {
            dependenciesCapsules = dependenciesCapsules.concat(this.parent.dependenciesCapsules);
        }

        return dependenciesCapsules;
    }

    constructor(public parent?: IInjector) {

    }

    public addTransient<T>(dependencyCon: IConstructor<T>): void {
        this.add(dependencyCon, 'transient');
    }

    public addSingleton<T>(dependencyCon: IConstructor<T>, dependency?: T): void {
        this.add(dependencyCon, 'singleton', dependency);
    }

    public add<T>(dependencyCon: IConstructor<T>, type: 'singleton' | 'transient' = 'singleton', dependency?: T): void {

        if (dependency) {
            this._dependencies.push(dependency);
            Reflect.defineMetadata('Injector:constructor', dependencyCon, dependency);
            Reflect.defineMetadata('Injector:type', type, dependency);
        }

        this._dependenciesCapsules.push({
            dependencyCon,
            type,
        });

    }

    public getDependency<T>(dependencyCon: IConstructor<T>): T | undefined {
        const dependency = this.dependencies.find(s => {
            const customType = Reflect.getMetadata('Injector:constructor', s) || s.constructor;

            let _s = dependencyCon;
            while (Object.getPrototypeOf(_s)) {
                if (_s === customType) {
                    return true;
                }

                _s = Object.getPrototypeOf(_s);
            }

            return customType === dependencyCon;
        });

        return dependency as T;
    }

    public getDependencys<T>(dependencyCon: IConstructor<T>): T[] {
        const dependencies = this.dependencies.filter(s => {
            return s.constructor === dependencyCon;
        });

        return dependencies;
    }

    public resolve<T>(targetCon: IConstructor<T>): T {
        const requiredParams = Reflect.getMetadata('design:paramtypes', targetCon) || [];
        const resolvedDependencys = requiredParams.map((param: any) => this.getOrCreateDependency(param));

        const instance = this.createInstance(targetCon, resolvedDependencys);

        return instance;
    }

    public resolveMethod(obj: any, method: string): void {
        const requiredParams = Reflect.getMetadata('design:paramtypes', obj, method) || [];
        const resolvedDependencys = requiredParams.map((param: any) => this.getOrCreateDependency(param));

        obj[method](...resolvedDependencys);
    }

    public createChildInjector(): IInjector {
        return new Injector(this);
    }

    private getOrCreateDependency<T>(dependencyCon: IConstructor<T>): T | undefined {
        if (!dependencyCon) {
            return undefined;
        }

        let instance = this.getDependency(dependencyCon);
        if (!instance || Reflect.getMetadata('Injector:type', instance) === 'transient') {
            const dependencyCapsule = this.dependenciesCapsules.find(sc => sc.dependencyCon === dependencyCon);

            if (!dependencyCapsule) {
                return undefined;
            }

            const requiredParams = Reflect.getMetadata('design:paramtypes', dependencyCon) || [];
            const resolvedDependencys = requiredParams.map((param: any) => {
                return param ?
                    this.getOrCreateDependency(param) : undefined;
            });

            instance = this.createInstance(dependencyCon, resolvedDependencys);
            this._dependencies.push(instance);
            Reflect.defineMetadata('Injector:constructor', dependencyCon, instance);
            Reflect.defineMetadata('Injector:type', dependencyCapsule.type, instance);

        }

        return instance;
    }

    private createInstance<T>(con: IConstructor<T>, resolvedDependencys: any[]): T {
        const instance = new con(...resolvedDependencys);

        for (const resolvedParam of resolvedDependencys) {
            if (!resolvedParam) {
                continue;
            }

            if (typeof resolvedParam.onInject === 'function') {
                resolvedParam.onInject(instance);
            }
        }

        return instance;
    }

}
