export declare type TScrollToSettings = {
    easing: string;
    historyPush: boolean;
    offset: number;
    speed: number;
};
export declare function scrollTo(target: HTMLElement | string, options?: TScrollToSettings): Promise<void>;
