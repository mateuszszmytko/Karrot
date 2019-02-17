import { Karrot } from "../karrot";
export declare class ItemsStorage {
    readonly items: Karrot[];
    init(): void;
    getItemsByName(name: string, context?: HTMLElement): Karrot[];
    getItemByElement(element: HTMLElement): Karrot | undefined;
    private parse;
}
