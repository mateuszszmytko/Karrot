import { KarrotImp } from "./karrot-imp";
import { IFunctionAny, IConstructor, IConstructorAny, IFunctionAttach } from "./interfaces/constructor.interface";
import { KarrotItem } from "./karrot-item";

// tslint:disable:no-any

export interface IKarrot {
    attach(name: string | KarrotItem, ...attached: Array<IConstructorAny | IFunctionAttach>): void;
    get(name: string, ...typeOrContexts: HTMLElement[]): KarrotItem | undefined;
    get<T>(name: string | HTMLElement, ...typeOrContexts: Array<IConstructor<T> | HTMLElement>): T | undefined;
    get(name: any, ...typeOrContexts: any): any;
    getMany(name: string, ...typeOrContexts: HTMLElement[]): KarrotItem[];
    getMany<T>(name: string | HTMLElement, ...typeOrContexts: Array<IConstructor<T> | HTMLElement>): T[];
    getMany(name: any, ...typeOrContexts: any): any;
    reload(): void;
    refresh(): void;
}

export const Karrot: Readonly<IKarrot> = (() => {
    const imp: KarrotImp = new KarrotImp();
    imp.onInit();

    return {
        attach: (name: string, ...attached: Array<IConstructorAny | IFunctionAny>) => {
            imp.attach(name, ...attached);
        },
        get: (name: string, ...typeOrContexts: any[]) => {
            return imp.get(name, ...typeOrContexts);
        },
        getMany: (name: string, ...typeOrContexts: any[]) => {
            return imp.getMany(name, ...typeOrContexts);
        },
        refresh: () => {
            imp.refresh();
        },
        reload: () => {
            imp.onInit();
        },
    };
})();

/*
export class Karrot2 {
    public static init(): void {
        Karrot.imp = new KarrotImp();

        Karrot.imp.onInit();
    }

    public static attach(name: string, ...attached: Array<IConstructorAny | IFunctionAny>): void {
        Karrot.imp.attach(name, ...attached);
    }

    public static getMany(name: string, ...typeOrContexts: HTMLElement[]): Karrot[];
    public static getMany<T>(name: string | HTMLElement,
        ...typeOrContexts: Array<IConstructor<T> | HTMLElement>): T[];
    public static getMany(name: any, ...typeOrContexts: any): any {
        return Karrot.imp.getMany(name, ...typeOrContexts);
    }

    public static get(name: string, ...typeOrContexts: HTMLElement[]): Karrot | undefined;
    public static get<T>(name: string | HTMLElement,
        ...typeOrContexts: Array<IConstructor<T> | HTMLElement>): T | undefined;
    public static get(name: any, ...typeOrContexts: any): any {
        return Karrot.imp.get(name, ...typeOrContexts);
    }

    private static imp: KarrotImp;
}
*/
