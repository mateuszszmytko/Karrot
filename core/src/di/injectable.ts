import { IConstructor } from "../interfaces/constructor.interface";

/* tslint:disable */

type ClassDecorator<T extends Function> = (Target: IConstructor<T>) => T | void;

export const Injectable = (): ClassDecorator<any> => {
    // @ts-ignore
    return Target => {};
};

