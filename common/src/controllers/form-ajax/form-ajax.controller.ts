import { Controller, Hooks, Item, Settings } from '@karrot/core';

import { DOM } from '../../utils';

export interface IFormActions {
    beforeSending(): void;
    sent(response: Response, formOutput: HTMLElement): void;
    error(error: unknown): void;
}

export interface IFormFilters {
    applyFormData(formData: FormData): FormData;
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

@Controller({
    name: 'formAjax',
    settings: {
        clearAfterSending: true,
        defaultSentEvents: true,
        defaultValidationEvents: true,
        jsonResponseData: false,
        method: 'POST',
    },
})
export class FormAjaxController {

    @Item('formOutput', 'siblings')
    public formOutput: HTMLElement;

    @Item()
    public submit: HTMLInputElement;
    public inputs: HTMLInputElement[];

    private status: FormStatus = FormStatus.None;

    constructor(private form: HTMLFormElement,
                public hooks: Hooks<IFormActions, IFormFilters>,
                public settings: Settings<FormSettings>) { }

    public kOnInit(): void {
        this.inputs = Array.from(this.form.querySelectorAll('input'));

        DOM(this.form)
            .class.add('k-form')
            .event.add('submit', (e) => {
                this.onSubmit(e);

            });

        DOM(this.formOutput)
            .class.add('k-form__output');

        DOM(this.submit)
            .class.add('k-form__submit');

        if (this.settings.get('defaultSentEvents')) {
            DOM(this.submit)
                .class.add('k-form__submit--circle');
        }

        this.hooks.addAction('beforeSending', () => {
            this.formBeforeSending();
        });

        this.hooks.addAction('sent', (response: Response, formOutput: HTMLElement) => {
            this.formSent(response, formOutput);
        });

    }

    protected async onSubmit(e: Event): Promise<void> {
        if (!this.form.checkValidity()) {
            return;
        }

        e.preventDefault();

        if (this.status === FormStatus.Sending) {
            return;
        }

        let action = this.form.action;
        let response;

        let formData = new FormData(this.form);
        formData = await this.hooks.applyFilter(formData, 'applyFormData');

        await this.hooks.doAction('beforeSending', formData, action);

        if (this.settings.get('method') === 'GET') {
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
                body: this.settings.get('method') === 'POST' ? formData : undefined,
                method: this.settings.get('method') || 'POST',
            });

        } catch (error) {
            await this.hooks.doAction('error', error);
        }

        await this.hooks.doAction('sent', response, this.formOutput);
    }

    protected formBeforeSending(): void {
        this.status = FormStatus.Sending;

        DOM(this.form, this.submit, this.formOutput)
            .state.set('active');
    }

    protected async formSent(response: Response, formOutput: HTMLElement): Promise<void> {
        this.status = FormStatus.Sent;

        DOM(this.form, this.submit, this.formOutput)
            .state.set('active', false)
            .state.set(Math.round(response.status / 100) === 2 ? 'successful' : 'error');

        if (this.settings.get('clearAfterSending')) {
            for (const input of this.inputs) {
                if (input.type === 'checkbox' || input.type === 'radio') {
                    input.checked = false;
                } else {
                    input.value = '';
                }
            }
        }

        if (!this.settings.get('defaultSentEvents')) {
            return;
        }

        let reponseObject;

        if (this.settings.get('jsonResponseData')) {
            reponseObject = await response.json();
        } else {
            reponseObject = await response.text();
        }

        if (this.formOutput) {
            this.formOutput.innerHTML = reponseObject;
        }
    }

}
