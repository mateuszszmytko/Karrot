import { Hooks } from '@karrot/core';
export declare class ScrollToController {
    private element;
    readonly hooks: Hooks;
    scrollTarget: HTMLElement;
    constructor(element: HTMLElement, hooks: Hooks);
    kOnInit(): void;
    protected onClick(e: Event): Promise<void>;
}
