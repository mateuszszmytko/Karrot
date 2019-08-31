import { KarrotItem } from '@karrot/core';
import { TScrollToSettings } from '../../utils/scroll-to';
export declare class ScrollTo {
    item: KarrotItem;
    static defaultSettings: TScrollToSettings;
    scrollTarget: HTMLElement;
    constructor(item: KarrotItem);
    kOnInit(): Promise<void>;
    protected onClick(e: Event): Promise<void>;
}
