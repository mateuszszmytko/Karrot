import { Hooks, ISettings } from '@karrot/core';
export interface IFormActions {
    'formAjax.beforeSending'(): void;
    'formAjax.sent'(response: Response, formOutput: HTMLElement): void;
    'formAjax.error'(error: unknown): void;
}
export interface IFormFilters {
    'formAjax.formData'(formData: FormData): FormData;
    'formAjax.output'(output: HTMLElement | undefined): HTMLElement;
}
declare type FormSettings = {
    method: 'POST' | 'GET';
    defaultSentEvents: boolean;
    jsonResponseData: boolean;
    clearAfterSending: boolean;
};
export declare class FormAjax {
    element: HTMLFormElement;
    hooks: Hooks<IFormActions, IFormFilters>;
    settings: FormSettings;
    formOutput: HTMLElement | undefined;
    submit: HTMLElement | undefined;
    inputs: HTMLInputElement[];
    private status;
    constructor(element: HTMLFormElement, hooks: Hooks<IFormActions, IFormFilters>, settings: ISettings);
    kOnInit(): Promise<void>;
    protected onSubmit(e: Event): Promise<void>;
    protected formBeforeSending(): void;
    protected formSent(response: Response, formOutput: HTMLElement): Promise<void>;
}
export {};
