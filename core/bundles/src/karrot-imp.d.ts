import { ItemsStorage } from './items/items-storage';
import { IConstructor, IConstructorAny, IFunctionAny } from './interfaces';
import { Karrot } from './karrot';
export declare class KarrotImp {
    private _itemsStorage;
    readonly storage: ItemsStorage;
    constructor();
    onInit(): void;
    attach(name: string, ...attachments: Array<IConstructorAny | IFunctionAny>): void;
    getMany(name: string | HTMLElement, ...typeOrContexts: HTMLElement[]): Karrot[];
    getMany<T>(name: string | HTMLElement, ...typeOrContexts: Array<IConstructor<T> | HTMLElement>): T[];
    get(name: string | HTMLElement, ...typeOrContexts: HTMLElement[]): Karrot | undefined;
    get<T>(name: string | HTMLElement, ...typeOrContexts: Array<IConstructor<T> | HTMLElement>): T | undefined;
}
