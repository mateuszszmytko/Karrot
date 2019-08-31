import { Hooks, ISettings, Karrot } from '@karrot/core';

import { KarrotItem } from '../../../../core/bundles/src/karrot-item';
import { DOM } from '../../utils';

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

type FormSettings = {
    method: 'POST' | 'GET';
    defaultSentEvents: boolean;
    jsonResponseData: boolean;
    clearAfterSending: boolean;
    clearHiddenAfterSending: boolean;
};

enum FormStatus {
    None,
    Sending,
    Sent,
}

export class FormAjax {
    public defaultSettings: FormSettings = {
        clearAfterSending: true,
        clearHiddenAfterSending: false,
        defaultSentEvents: true,
        jsonResponseData: false,
        method: 'POST',
    };

    public formOutput: HTMLElement | undefined =
        Karrot.get('formOutput', HTMLElement, this.item.element.parentElement as HTMLElement);
    public submit: HTMLElement | undefined = Karrot.get('submit', HTMLElement, this.item.element);
    public inputs: HTMLInputElement[];
    public selects: HTMLSelectElement[];

    private status: FormStatus = FormStatus.None;

    constructor(public item: KarrotItem<HTMLFormElement>) {
        item.appendSettings(this.defaultSettings);
    }

    public async kOnInit(): Promise<void> {
        this.inputs = Array.from(this.item.element.querySelectorAll('input, textarea'));
        this.selects = Array.from(this.item.element.querySelectorAll('select'));

        // save select default value
        for (const select of this.selects) {
            select.setAttribute('data-default', select.selectedIndex.toString());
        }

        DOM(this.item.element)
            .class.add('k-form')
            .event.add('submit', (e) => {
                this.onSubmit(e);

            });

        this.formOutput = await this.item.hooks.applyFilter(this.formOutput, 'formAjax.output');

        DOM(this.formOutput)
            .class.add('k-form__output');

        DOM(this.submit)
            .class.add('k-form__submit');

        if (this.item.settings.defaultSentEvents) {
            DOM(this.submit)
                .class.add('k-form__submit--circle');
        }

        this.item.hooks.addAction('formAjax.beforeSending', () => {
            this.formBeforeSending();
        });

        this.item.hooks.addAction('formAjax.sent', (response: Response, formOutput: HTMLElement) => {
            this.formSent(response, formOutput);
        });

    }

    protected async onSubmit(e: Event): Promise<void> {
        if (!this.item.element.checkValidity()) {
            return;
        }

        e.preventDefault();

        if (this.status === FormStatus.Sending) {
            return;
        }

        let action = this.item.element.getAttribute('action') || '';
        let response;

        let formData = new FormData(this.item.element);
        formData = await this.item.hooks.applyFilter(formData, 'formAjax.formData');

        await this.item.hooks.doAction('formAjax.beforeSending', formData, action);

        if (this.item.settings.method === 'GET') {
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
                body: this.item.settings.method === 'POST' ? formData : undefined,
                method: this.item.settings.method || 'POST',
            });

            await this.item.hooks.doAction('formAjax.success', response, this.formOutput);
        } catch (error) {
            await this.item.hooks.doAction('formAjax.error', error);
        }

        await this.item.hooks.doAction('formAjax.sent', response, this.formOutput);
    }

    protected formBeforeSending(): void {
        this.status = FormStatus.Sending;

        DOM(this.item.element, this.submit, this.formOutput)
            .state.set('active');
    }

    protected async formSent(response: Response, formOutput: HTMLElement): Promise<void> {
        this.status = FormStatus.Sent;

        DOM(this.item.element, this.submit, this.formOutput)
            .state.set('active', false)
            .state.set((response && Math.round(response.status / 100) === 2) ? 'successful' : 'error');

        if (this.item.settings.clearAfterSending) {
            for (const input of this.inputs) {
                if (input.type === 'hidden' && this.item.settings.clearHiddenAfterSending) {
                    input.value = '';
                } else if (input.type === 'checkbox' || input.type === 'radio') {
                    input.checked = false;
                } else {
                    input.value = '';
                }
            }

            for (const select of this.selects) {
                select.options.selectedIndex = parseInt(select.getAttribute('data-default') || '0', 0);
            }
        }

        if (!this.item.settings.defaultSentEvents) {
            return;
        }

        if (!response) {
            return;
        }

        let reponseObject;

        if (this.item.settings.jsonResponseData) {
            reponseObject = await response.json();
        } else {
            reponseObject = await response.text();
        }

        if (this.formOutput) {
            this.formOutput.innerHTML = reponseObject;
        }
    }

}
