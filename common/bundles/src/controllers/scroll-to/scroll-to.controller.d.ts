import { Controller } from '@karrot/core';
export declare class ScrollToController extends Controller {
    element: HTMLElement;
    scrollTarget: HTMLElement;
    constructor(element: HTMLElement);
    kOnInit(): void;
    protected onClick(e: Event): Promise<void>;
}
