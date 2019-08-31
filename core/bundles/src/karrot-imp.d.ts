import { ItemsStorage } from './items/items-storage';
import { IConstructor, IConstructorAny } from './interfaces';
import { KarrotItem } from './karrot-item';
import { IFunctionAttach } from './interfaces/constructor.interface';
export declare class KarrotImp {
    private _itemsStorage;
    readonly storage: ItemsStorage;
    constructor();
    onInit(): void;
    refresh(): void;
    attach(name: string | KarrotItem, ...attachments: Array<IConstructorAny | IFunctionAttach>): void;
    getMany(name: string | HTMLElement, ...typeOrContexts: HTMLElement[]): KarrotItem[];
    getMany<T>(name: string | HTMLElement, ...typeOrContexts: Array<IConstructor<T> | HTMLElement>): T[];
    get(name: string | HTMLElement, ...typeOrContexts: HTMLElement[]): KarrotItem | undefined;
    get<T>(name: string | HTMLElement, ...typeOrContexts: Array<IConstructor<T> | HTMLElement>): T | undefined;
}
