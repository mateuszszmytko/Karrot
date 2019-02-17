import { ItemsStorage } from './items/items-storage';
import { IConstructor, IConstructorAny, IFunctionAny } from './interfaces';
import { Karrot } from './karrot';

// tslint:disable:no-any

export class KarrotImp {
    private _itemsStorage: ItemsStorage;

    public get storage(): ItemsStorage {
        return this._itemsStorage;
    }

    constructor() {
        this._itemsStorage = new ItemsStorage();
    }

    public onInit(): void {
        this._itemsStorage.init();
    }

    public attach(name: string, ...attachments: Array<IConstructorAny | IFunctionAny>): void {
        const items = this.getMany(name);

        for (const item of items) {
            item.attach(...attachments);
        }
    }

    public getMany(name: string | HTMLElement, ...typeOrContexts: HTMLElement[]): Karrot[];
    public getMany<T>(name: string | HTMLElement,
        ...typeOrContexts: Array<IConstructor<T> | HTMLElement>): T[];
    public getMany(name: any, ...typeOrContexts: any): any {
        let items = [];

        let type = Karrot;
        let context;

        for (const typeOrContext of typeOrContexts) {
            if (typeof typeOrContext === 'function') {
                type = typeOrContext;
            }

            if (typeOrContext instanceof HTMLElement) {
                context = typeOrContext;
            }
        }

        if (name instanceof HTMLElement) {
            const item = this.storage.getItemByElement(name);

            if (item) {
                items.push(item);
            }
        } else {
            items = this.storage.getItemsByName(name, context);
        }

        const returnVal = [];

        if (type === Karrot) {
            returnVal.push(...items);
        } else if (type as any === HTMLElement) {
            // tslint:disable-next-line:no-any
            returnVal.push(...items.map(i => i.element));
        } else {
            const attachments = [];
            for (const item of items) {
                attachments.push(...item.attachments);
            }

            for (const attach of attachments) {
                if (attach instanceof type) {
                    returnVal.push(attach);
                }
            }
        }

        return returnVal;
    }

    public get(name: string | HTMLElement, ...typeOrContexts: HTMLElement[]): Karrot | undefined;
    public get<T>(name: string | HTMLElement,
        ...typeOrContexts: Array<IConstructor<T> | HTMLElement>): T | undefined;
    public get(name: any, ...typeOrContexts: any): any | undefined {
        const get = this.getMany(name, ...typeOrContexts);

        return get && get.length > 0 ? get[0] : undefined;
    }

}
