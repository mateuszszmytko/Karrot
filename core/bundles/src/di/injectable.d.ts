import { IConstructor } from "../interfaces/constructor.interface";
declare type ClassDecorator<T extends Function> = (Target: IConstructor<T>) => T | void;
export declare const Injectable: () => ClassDecorator<any>;
export {};
