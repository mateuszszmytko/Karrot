import { Hooks, ISettings } from '@karrot/core';
export interface IFormActions {
    beforeSending(): void;
    sent(response: Response, formOutput: HTMLElement): void;
    error(error: unknown): void;
}
export interface IFormFilters {
    applyFormData(formData: FormData): FormData;
}
declare type FormSettings = {
    method: 'POST' | 'GET';
    defaultSentEvents: boolean;
    jsonResponseData: boolean;
    clearAfterSending: boolean;
};
export declare class FormAjaxController {
    element: HTMLFormElement;
    hooks: Hooks;
    settings: FormSettings;
    formOutput: HTMLElement | undefined;
    submit: HTMLElement | undefined;
    inputs: HTMLInputElement[];
    private status;
    constructor(element: HTMLFormElement, hooks: Hooks, settings: ISettings);
    kOnInit(): void;
    protected onSubmit(e: Event): Promise<void>;
    protected formBeforeSending(): void;
    protected formSent(response: Response, formOutput: HTMLElement): Promise<void>;
}
export {};
