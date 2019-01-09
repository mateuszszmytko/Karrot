export interface IConstructor<T> {
    new (...args: any[]): T;
}
export interface IConstructorAny {
    new (...args: any[]): any;
    [key: string]: any;
}