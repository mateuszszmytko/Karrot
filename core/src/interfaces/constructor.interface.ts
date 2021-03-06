import { KarrotItem } from "../karrot-item";

/* tslint:disable:no-any */

export interface IConstructor<T> {
    new(...args: any[]): T;
}

export interface IConstructorAny {
    new(...args: any[]): any;

    [key: string]: any;
}

export type IFunctionAny = (...args: any[]) => any;
export type IFunctionAttach = (item: KarrotItem) => any;
