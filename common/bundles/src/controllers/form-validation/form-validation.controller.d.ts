import { Hooks, Settings } from '@karrot/core';
export interface IFormActions {
    validationError(capsule: InputValidationCapsule): void;
    validationSuccess(capsule: InputValidationCapsule): void;
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
    validation: boolean;
    validationType: 'mixed' | 'keyup' | 'submit';
    defaultValidationEvents: boolean;
};
export declare class FormValidationController {
    private form;
    hooks: Hooks<IFormActions, IFormFilters>;
    settings: Settings<FormSettings>;
    inputs: HTMLInputElement[];
    constructor(form: HTMLFormElement, hooks: Hooks<IFormActions, IFormFilters>, settings: Settings<FormSettings>);
    kOnInit(): void;
    protected validityCheck(e: Event, useInput?: HTMLInputElement): Promise<void>;
    protected onValidationError(capsule: InputValidationCapsule): void;
    private getErrorMessage;
}
export {};
