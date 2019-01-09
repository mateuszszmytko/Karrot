import { ControllersStorage } from '@karrot/core';
export declare class ItemsManager {
    private controllersStorage;
    constructor(controllersStorage: ControllersStorage);
    getControllers<T>(name: string, type: {
        new (...args: Array<unknown>): T;
    }): T[];
    getController<T>(name: string, type: {
        new (...args: Array<unknown>): T;
    }): T | undefined;
    getElement(name: string, context?: HTMLElement): HTMLElement | undefined;
    getElements(name: string, context?: HTMLElement): HTMLElement[];
}
