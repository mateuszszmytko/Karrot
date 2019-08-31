import { Hooks, ISettings, KarrotItem } from '@karrot/core';
export interface IFormActions {
    'formValidation.error'(capsule: InputValidationCapsule): void;
    'formValidation.success'(capsule: InputValidationCapsule): void;
    'formValidation.result'(isValid: boolean, capsules: InputValidationCapsule[]): void;
}
export interface IFormFilters {
    'formValidation.inputValidation'(capsule: InputValidationCapsule): InputValidationCapsule;
}
export declare type InputValidationCapsule = {
    input: HTMLInputElement;
    isValid: boolean;
    message: string;
};
declare type FormSettings = {
    validationType: 'mixed' | 'keyup' | 'submit';
    defaultValidationEvents: boolean;
};
export declare class FormValidation {
    item: KarrotItem;
    inputs: HTMLInputElement[];
    defaultSettings: FormSettings;
    settings: ISettings;
    element: HTMLElement;
    hooks: Hooks;
    constructor(item: KarrotItem);
    kOnInit(): void;
    protected validityCheck(e: Event, useInput?: HTMLInputElement): Promise<void>;
    protected onValidationError(capsule: InputValidationCapsule): void;
    private getErrorMessage;
}
export {};
