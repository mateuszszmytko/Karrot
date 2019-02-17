import {  Hooks, ISettings } from '@karrot/core';

import { DOM } from '../../utils';

export interface IFormActions {
    error(capsule: InputValidationCapsule): void;
    success(capsule: InputValidationCapsule): void;
    result(isValid: boolean, capsules: InputValidationCapsule[]): void;
}

export interface IFormFilters {
    inputValidation(capsule: InputValidationCapsule): InputValidationCapsule;
}

export type InputValidationCapsule = {
    input: HTMLInputElement;
    isValid: boolean;
    message: string;
};

type FormSettings = {
    validationType: 'mixed' | 'keyup' | 'submit';
    defaultValidationEvents: boolean;
};

export class FormValidation {
    public inputs: HTMLInputElement[];
    public settings: FormSettings = {
        defaultValidationEvents: true,
        validationType: 'mixed',
    };

    constructor(public element: HTMLElement, public hooks: Hooks, settings: ISettings) {
        this.settings = Object.assign({}, this.settings, settings);
    }

    public kOnInit(): void {
        this.inputs = Array.from(this.element.querySelectorAll('input'));

        DOM(this.element)
            .class.add('k-form-validation')
            .attribute.set('novalidate')
            .event.add('submit', (e) => {
                this.validityCheck(e);
            });

        DOM(this.inputs)
            .event.add('keyup', (e, element) => {
                this.validityCheck(e, element as HTMLInputElement);
            })
            .event.add('change', (e, element) => {
                this.validityCheck(e, element as HTMLInputElement);
            });

        if (this.settings.defaultValidationEvents) {
            this.hooks.addAction('formValidation.error', (capsule: InputValidationCapsule) => {
                this.onValidationError(capsule);
            });

            this.hooks.addAction('formValidation.success', (capsule: InputValidationCapsule) => {
                this.onValidationError(capsule);
            });
        }

    }

    protected async validityCheck(e: Event, useInput?: HTMLInputElement): Promise<void> {
        let inputs = this.inputs;

        if (e.type === 'keyup' || e.type === 'change') {
            if (!useInput) {
                return;
            }

            inputs = [useInput];
        }

        if ((e.type === 'keyup' || e.type === 'change') && this.settings.validationType === 'submit') {
            return;
        }

        if ((e.type === 'keyup' || e.type === 'change') &&
            this.settings.validationType === 'mixed' &&
            useInput &&
            !DOM(useInput).state.is('dirty')) {
            return;
        }

        let isValid = true;
        const capsules: InputValidationCapsule[] = [];

        for (const input of inputs) {
            input.setCustomValidity('');

            const checkValidty = input.checkValidity();
            const message = await this.getErrorMessage(input);

            let capsule: InputValidationCapsule = {
                input,
                isValid: checkValidty,
                message,
            };

            capsule = await this.hooks.applyFilter(capsule, 'formValidation.inputValidation');

            capsules.push(capsule);

            if (!capsule.isValid) {
                input.setCustomValidity(capsule.message);
            }

            DOM(input).state.set('dirty');

            if (!capsule.isValid) {
                isValid = false;

                await this.hooks.doAction('formValidation.error', capsule);
            } else {
                await this.hooks.doAction('formValidation.success', capsule);
            }

        }

        await this.hooks.doAction('formValidation.result', isValid, capsules);

        if (!isValid) {
            e.preventDefault();
        }
    }

    protected onValidationError(capsule: InputValidationCapsule): void {
        if (!capsule.input) {
            return;
        }

        // clear
        if (capsule.input.parentElement) {
            const errorElement = capsule.input.parentElement.querySelector('[error-for=' + capsule.input.name + ']');

            if (errorElement && errorElement.parentElement) {
                errorElement.parentElement.removeChild(errorElement);
            }
        }

        if (capsule.message) {
            DOM(capsule.input).state.set('error');

            const parent = capsule.input.parentElement as HTMLElement;
            parent.insertAdjacentHTML('beforeend',
                `<div error-for="${capsule.input.name}" class="input-error"><p>${capsule.message}</p></div>`);
        } else {
            DOM(capsule.input).state.set('error', false);
        }
    }

    private async getErrorMessage(input: HTMLInputElement): Promise<string> {
        const validity = input.validity as { [key: string]: unknown };
        let message = input.validationMessage || '';

        for (const v in validity) {
            if (validity.hasOwnProperty(v)) {
                if (!validity[v]) {
                    continue;
                }

                const customMessage = input.dataset[v];

                if (customMessage) {
                    message = customMessage;

                    break;
                }
            }

        }

        return message;
    }

}
