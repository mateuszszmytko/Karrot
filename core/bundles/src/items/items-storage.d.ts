import { KarrotItem } from "../karrot-item";
export declare class ItemsStorage {
    private _items;
    readonly items: KarrotItem[];
    init(): void;
    getItemsByName(name: string, context?: HTMLElement): KarrotItem[];
    getItemsByContext(context: HTMLElement): KarrotItem[];
    getItemByElement(element: HTMLElement): KarrotItem | undefined;
    parse(clear?: boolean, context?: Document | HTMLElement): void;
}
