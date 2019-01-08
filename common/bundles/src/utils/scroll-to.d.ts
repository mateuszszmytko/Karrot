declare type scrollToOptions = {
    easing: string;
    historyPush: boolean;
    offset: number;
    speed: number;
};
export declare function scrollTo(target: HTMLElement | string, options?: scrollToOptions): Promise<void>;
export {};
