import { Hooks } from '@karrot/core';
export declare class ScrollTo {
    element: HTMLElement;
    hooks: Hooks;
    scrollTarget: HTMLElement;
    constructor(element: HTMLElement, hooks: Hooks);
    kOnInit(): Promise<void>;
    protected onClick(e: Event): Promise<void>;
}
