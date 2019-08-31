import { IConstructor, IConstructorAny, IFunctionAttach } from "./interfaces/constructor.interface";
import { KarrotItem } from "./karrot-item";
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
export declare const Karrot: Readonly<IKarrot>;
