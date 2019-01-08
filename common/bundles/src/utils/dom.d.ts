export declare function DOM(...elements: Array<HTMLElement | HTMLElement[]>): DOMManager;
declare type TDOMClass<T> = {
    add: (...classNames: string[]) => T;
    remove: (...classNames: string[]) => T;
    toggle: (...classNames: string[]) => T;
    contains: (...classNames: string[]) => boolean;
};
declare type TDOMState<T> = {
    set: (state: string, value?: boolean) => T;
    toggle: (state: string) => T;
    is: (state: string) => boolean;
};
declare type TDOMAttribute<T> = {
    set: (attr: string, value?: string) => T;
    get: (attr: string) => string;
    has: (attr: string) => boolean;
};
declare type TDOMEvent<T> = {
    add: <K extends keyof HTMLElementEventMap>(event: K, listener: (ev: HTMLElementEventMap[K], element: HTMLElement) => void) => T;
};
declare class DOMManager {
    private _elements;
    private _class;
    private _state;
    private _attribute;
    private _event;
    readonly class: TDOMClass<DOMManager>;
    readonly state: TDOMState<DOMManager>;
    readonly event: TDOMEvent<DOMManager>;
    readonly attribute: TDOMAttribute<DOMManager>;
    constructor(elements: Array<HTMLElement | HTMLElement[]>);
}
export {};
