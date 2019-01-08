import { Hooks, Settings } from '@karrot/core';
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
    private form;
    hooks: Hooks<IFormActions, IFormFilters>;
    settings: Settings<FormSettings>;
    formOutput: HTMLElement;
    submit: HTMLInputElement;
    inputs: HTMLInputElement[];
    private status;
    constructor(form: HTMLFormElement, hooks: Hooks<IFormActions, IFormFilters>, settings: Settings<FormSettings>);
    kOnInit(): void;
    protected onSubmit(e: Event): Promise<void>;
    protected formBeforeSending(): void;
    protected formSent(response: Response, formOutput: HTMLElement): Promise<void>;
}
export {};
