import { IConstructor, IConstructorAny } from "../interfaces/constructor.interface";

/* tslint:disable:no-any */

type DepedencyCapsule = {
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

export class Injector implements IInjector {
    private _depedencies: any[] = [];
    private _depedenciesCapsules: DepedencyCapsule[] = [];

    public get depedencies(): any[] {
        let depedencies = this._depedencies;

        if (this.parent) {
            depedencies = depedencies.concat(this.parent.depedencies);
        }

        return depedencies;
    }

    public get depedenciesCapsules(): DepedencyCapsule[] {
        let depedenciesCapsules = this._depedenciesCapsules;

        if (this.parent) {
            depedenciesCapsules = depedenciesCapsules.concat(this.parent.depedenciesCapsules);
        }

        return depedenciesCapsules;
    }

    constructor(public parent?: IInjector) {

    }

    public addTransient<T>(depedencyCon: IConstructor<T>): void {
        this.add(depedencyCon, 'transient');
    }

    public addSingleton<T>(depedencyCon: IConstructor<T>, depedency?: T): void {
        this.add(depedencyCon, 'singleton', depedency);
    }

    public add<T>(depedencyCon: IConstructor<T>, type: 'singleton' | 'transient' = 'singleton', depedency?: T): void {

        if (depedency) {
            this._depedencies.push(depedency);
            Reflect.defineMetadata('Injector:constructor', depedencyCon, depedency);
            Reflect.defineMetadata('Injector:type', type, depedency);
        }

        this._depedenciesCapsules.push({
            depedencyCon,
            type,
        });

    }

    public getDepedency<T>(depedencyCon: IConstructor<T>): T | undefined {
        const depedency = this.depedencies.find(s => {
            const customType = Reflect.getMetadata('Injector:constructor', s) || s.constructor;

            let _s = depedencyCon;
            while (Object.getPrototypeOf(_s)) {
                if (_s === customType) {
                    return true;
                }

                _s = Object.getPrototypeOf(_s);
            }

            return customType === depedencyCon;
        });

        return depedency as T;
    }

    public getDepedencys<T>(depedencyCon: IConstructor<T>): T[] {
        const depedencies = this.depedencies.filter(s => {
            return s.constructor === depedencyCon;
        });

        return depedencies;
    }

    public resolve<T>(targetCon: IConstructor<T>): T {
        const requiredParams = Reflect.getMetadata('design:paramtypes', targetCon) || [];
        const resolvedDepedencys = requiredParams.map((param: any) => this.getOrCreateDepedency(param));

        const instance = this.createInstance(targetCon, resolvedDepedencys);

        return instance;
    }

    public resolveMethod(obj: any, method: string): void {
        const requiredParams = Reflect.getMetadata('design:paramtypes', obj, method) || [];
        const resolvedDepedencys = requiredParams.map((param: any) => this.getOrCreateDepedency(param));

        obj[method](...resolvedDepedencys);
    }

    public createChildInjector(): IInjector {
        return new Injector(this);
    }

    private getOrCreateDepedency<T>(depedencyCon: IConstructor<T>): T | undefined {
        if (!depedencyCon) {
            return undefined;
        }

        let instance = this.getDepedency(depedencyCon);
        if (!instance || Reflect.getMetadata('Injector:type', instance) === 'transient') {
            const depedencyCapsule = this.depedenciesCapsules.find(sc => sc.depedencyCon === depedencyCon);

            if (!depedencyCapsule) {
                return undefined;
            }

            const requiredParams = Reflect.getMetadata('design:paramtypes', depedencyCon) || [];
            const resolvedDepedencys = requiredParams.map((param: any) => {
                return param ?
                    this.getOrCreateDepedency(param) : undefined;
            });

            instance = this.createInstance(depedencyCon, resolvedDepedencys);
            this._depedencies.push(instance);
            Reflect.defineMetadata('Injector:constructor', depedencyCon, instance);
            Reflect.defineMetadata('Injector:type', depedencyCapsule.type, instance);

        }

        return instance;
    }

    private createInstance<T>(con: IConstructor<T>, resolvedDepedencys: any[]): T {
        const instance = new con(...resolvedDepedencys);

        for (const resolvedParam of resolvedDepedencys) {
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
