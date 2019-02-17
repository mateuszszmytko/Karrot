import { Hooks, ISettings, Karrot } from '@karrot/core';

import { DOM } from '../../utils';

export interface IFormActions {
    'formAjax.beforeSending'(): void;
    'formAjax.sent'(response: Response, formOutput: HTMLElement): void;
    'formAjax.error'(error: unknown): void;
}

export interface IFormFilters {
    'formAjax.formData'(formData: FormData): FormData;
    'formAjax.output'(output: HTMLElement | undefined): HTMLElement;
}

type FormSettings = {
    method: 'POST' | 'GET';
    defaultSentEvents: boolean;
    jsonResponseData: boolean;
    clearAfterSending: boolean;
};

enum FormStatus {
    None,
    Sending,
    Sent,
}

export class FormAjax {
    public settings: FormSettings = {
        clearAfterSending: true,
        defaultSentEvents: true,
        jsonResponseData: false,
        method: 'POST',
    };

    public formOutput: HTMLElement | undefined =
        Karrot.get('formOutput', HTMLElement, this.element.parentElement as HTMLElement);
    public submit: HTMLElement | undefined = Karrot.get('submit', HTMLElement, this.element);
    public inputs: HTMLInputElement[];

    private status: FormStatus = FormStatus.None;

    constructor(public element: HTMLFormElement, public hooks: Hooks<IFormActions, IFormFilters>, settings: ISettings) {
        this.settings = Object.assign({}, this.settings, settings);
    }

    public async kOnInit(): Promise<void> {
        this.inputs = Array.from(this.element.querySelectorAll('input'));

        DOM(this.element)
            .class.add('k-form')
            .event.add('submit', (e) => {
                this.onSubmit(e);

            });

        this.formOutput = await this.hooks.applyFilter(this.formOutput, 'formAjax.output');

        DOM(this.formOutput)
            .class.add('k-form__output');

        DOM(this.submit)
            .class.add('k-form__submit');

        if (this.settings.defaultSentEvents) {
            DOM(this.submit)
                .class.add('k-form__submit--circle');
        }

        this.hooks.addAction('formAjax.beforeSending', () => {
            this.formBeforeSending();
        });

        this.hooks.addAction('formAjax.sent', (response: Response, formOutput: HTMLElement) => {
            this.formSent(response, formOutput);
        });

    }

    protected async onSubmit(e: Event): Promise<void> {
        if (!this.element.checkValidity()) {
            return;
        }

        e.preventDefault();

        if (this.status === FormStatus.Sending) {
            return;
        }

        let action = this.element.action;
        let response;

        let formData = new FormData(this.element);
        formData = await this.hooks.applyFilter(formData, 'formAjax.formData');

        await this.hooks.doAction('formAjax.beforeSending', formData, action);

        if (this.settings.method === 'GET') {
            const formDataObject: { [a: string]: FormDataEntryValue } = {};
            formData.forEach((value, key) => {
                if (!value) {
                    return;
                }

                formDataObject[key] = value;
            });

            const getParam = Object.keys(formDataObject)
                .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(formDataObject[k].toString()))
                .join('&');

            action = action + '?' + getParam;
        }

        try {
            response = await fetch(action, {
                body: this.settings.method === 'POST' ? formData : undefined,
                method: this.settings.method || 'POST',
            });

        } catch (error) {
            await this.hooks.doAction('formAjax.error', error);
        }

        await this.hooks.doAction('formAjax.sent', response, this.formOutput);
    }

    protected formBeforeSending(): void {
        this.status = FormStatus.Sending;

        DOM(this.element, this.submit, this.formOutput)
            .state.set('active');
    }

    protected async formSent(response: Response, formOutput: HTMLElement): Promise<void> {
        this.status = FormStatus.Sent;

        DOM(this.element, this.submit, this.formOutput)
            .state.set('active', false)
            .state.set(Math.round(response.status / 100) === 2 ? 'successful' : 'error');

        if (this.settings.clearAfterSending) {
            for (const input of this.inputs) {
                if (input.type === 'checkbox' || input.type === 'radio') {
                    input.checked = false;
                } else {
                    input.value = '';
                }
            }
        }

        if (!this.settings.defaultSentEvents) {
            return;
        }

        let reponseObject;

        if (this.settings.jsonResponseData) {
            reponseObject = await response.json();
        } else {
            reponseObject = await response.text();
        }

        if (this.formOutput) {
            this.formOutput.innerHTML = reponseObject;
        }
    }

}
