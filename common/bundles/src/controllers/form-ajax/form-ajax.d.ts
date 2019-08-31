import { KarrotItem } from '../../../../core/bundles/src/karrot-item';
export interface IFormActions {
    'formAjax.beforeSending'(): void;
    'formAjax.sent'(response: Response, formOutput: HTMLElement): void;
    'formAjax.success'(response: Response, formOutput: HTMLElement): void;
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
    clearHiddenAfterSending: boolean;
};
export declare class FormAjax {
    item: KarrotItem<HTMLFormElement>;
    defaultSettings: FormSettings;
    formOutput: HTMLElement | undefined;
    submit: HTMLElement | undefined;
    inputs: HTMLInputElement[];
    selects: HTMLSelectElement[];
    private status;
    constructor(item: KarrotItem<HTMLFormElement>);
    kOnInit(): Promise<void>;
    protected onSubmit(e: Event): Promise<void>;
    protected formBeforeSending(): void;
    protected formSent(response: Response, formOutput: HTMLElement): Promise<void>;
}
export {};
