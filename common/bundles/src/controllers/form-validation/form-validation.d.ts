import { Hooks, ISettings } from '@karrot/core';
export interface IFormActions {
    error(capsule: InputValidationCapsule): void;
    success(capsule: InputValidationCapsule): void;
    result(isValid: boolean, capsules: InputValidationCapsule[]): void;
}
export interface IFormFilters {
    inputValidation(capsule: InputValidationCapsule): InputValidationCapsule;
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
    element: HTMLElement;
    hooks: Hooks;
    inputs: HTMLInputElement[];
    settings: FormSettings;
    constructor(element: HTMLElement, hooks: Hooks, settings: ISettings);
    kOnInit(): void;
    protected validityCheck(e: Event, useInput?: HTMLInputElement): Promise<void>;
    protected onValidationError(capsule: InputValidationCapsule): void;
    private getErrorMessage;
}
export {};
