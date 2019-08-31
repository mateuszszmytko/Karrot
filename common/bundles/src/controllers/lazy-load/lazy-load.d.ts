import { KarrotItem } from "@karrot/core";
export declare class LazyLoad {
    private item;
    private img;
    constructor(item: KarrotItem<HTMLImageElement>);
    kOnInit(): void;
    private observer;
    private loadImage;
}
