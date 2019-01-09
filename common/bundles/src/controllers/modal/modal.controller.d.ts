import { Hooks, Settings } from '@karrot/core';
declare type ModalSettings = {
    positionX: 'middle' | 'left' | 'top';
    positionY: 'middle' | 'top' | 'bottom';
    hashTracking: boolean;
    closeOnConfirm: boolean;
    closeOnCancel: boolean;
    closeOnOutsideClick: boolean;
    modalId: string;
};
declare enum ModalState {
    DuringOpening = 0,
    DuringClosing = 1,
    Open = 2,
    Closed = 3
}
export declare class ModalController {
    modal: HTMLElement;
    protected hooks: Hooks;
    protected settings: Settings<ModalSettings>;
    links: HTMLElement[];
    wrapper: HTMLElement;
    overlay: HTMLElement;
    confirms: HTMLElement[];
    cancels: HTMLElement[];
    exits: HTMLElement[];
    protected modalState: ModalState;
    protected modalId: string;
    constructor(modal: HTMLElement, hooks: Hooks, settings: Settings<ModalSettings>);
    kOnInit(): void;
    protected build(): void;
    protected resolveModalId(): void;
    protected openModal(): Promise<void>;
    protected closeModal(): Promise<void>;
    protected linkClick(e: Event): void;
    protected overlayClick(e: Event): void;
    protected onConfirm(e: Event): Promise<void>;
    protected onCancel(e: Event): Promise<void>;
}
export {};