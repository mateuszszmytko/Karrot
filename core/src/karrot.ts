import { KarrotImp } from "./karrot-imp";
import { IFunctionAny, IConstructor, IConstructorAny } from "./interfaces/constructor.interface";
import { Controller } from "./controller";

// tslint:disable:no-any
/*
export interface IKarrot {
    init(): void;
    attach(name: string, ...attached: Array<IConstructorAny | IFunctionAny>): void;
    get(name: string, ...typeOrContexts: HTMLElement[]): HTMLElement[];
    get<T>(name: string | HTMLElement, ...typeOrContexts: Array<IConstructor<T> | HTMLElement>): T[];
    getOne(name: string, ...typeOrContexts: HTMLElement[]): HTMLElement | undefined;
    getOne<T>(name: string | HTMLElement, ...typeOrContexts: Array<IConstructor<T> | HTMLElement>): T | undefined;
}

export const Karrot: Readonly<IKarrot> = (() => {
    let imp: KarrotImp;

    return {
        attach: (name: string, ...attached: Array<IConstructorAny | IFunctionAny>) => {
            imp.manager.attach(name, ...attached);
        },
        get: (name: string, ...typeOrContexts: any[]) => {
            return imp.get(name, ...typeOrContexts);
        },

        getOne: (name: string, ...typeOrContexts: any[]) => {
            return imp.getOne(name, ...typeOrContexts);
        },
        init: () => {
            imp = new KarrotImp();

            imp.onInit();
        },
    };
})();

*/

export class Karrot extends Controller {
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

    public readonly names: string[] = [];
    public readonly attachments: any[] = [];

    public attach(...attachments: Array<IConstructorAny | IFunctionAny>): void {
        for (const attachment of attachments) {

            if (attachment.prototype && attachment.prototype.constructor.name) {
                const instance = (new (attachment as any)(this.element, this.hooks, this.settings));
                const existingInstance =
                    this.attachments.find(a => {
                        return Object.getPrototypeOf(a) === attachment.prototype;
                    });

                if (existingInstance) {
                    continue;
                }

                if (instance.kOnInit && typeof instance.kOnInit === 'function') {
                    instance.kOnInit();
                }

                this.attachments.push(instance);

            } else {
                const func = (attachment as any)(this.element, this.hooks, this.settings);

                this.attachments.push(attachment);
            }
        }
    }
}
