import { Controller, Hooks, Settings } from '@karrot/core';

import { DOM } from '../../utils';

export interface IFormActions {
    validationError(capsule: InputValidationCapsule): void;
    validationSuccess(capsule: InputValidationCapsule): void;
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
    validation: boolean;
    validationType: 'mixed' | 'keyup' | 'submit';
    defaultValidationEvents: boolean;
};

@Controller({
    name: 'formValidation',
    selector: '.jsFormValidation',
    settings: {
        defaultValidationEvents: true,
        validationType: 'mixed',
    },
})
export class FormValidationController {
    public inputs: HTMLInputElement[];

    constructor(private form: HTMLFormElement,
                public hooks: Hooks<IFormActions, IFormFilters>,
                public settings: Settings<FormSettings>) { }

    public kOnInit(): void {
        this.inputs = Array.from(this.form.querySelectorAll('input'));

        DOM(this.form)
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

        if (this.settings.get('defaultValidationEvents')) {
            this.hooks.addAction('validationError', (capsule: InputValidationCapsule) => {
                this.onValidationError(capsule);
            });

            this.hooks.addAction('validationSuccess', (capsule: InputValidationCapsule) => {
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

        if ((e.type === 'keyup' || e.type === 'change') && this.settings.get('validationType') === 'submit') {
            return;
        }

        if ((e.type === 'keyup' || e.type === 'change') &&
            this.settings.get('validationType') === 'mixed' &&
            useInput &&
            !DOM(useInput).state.is('dirty')) {
            return;
        }

        let isValid = true;

        for (const input of inputs) {
            input.setCustomValidity('');

            const checkValidty = input.checkValidity();
            const message = await this.getErrorMessage(input);

            let capsule: InputValidationCapsule = {
                input,
                isValid: checkValidty,
                message,
            };

            capsule = await this.hooks.applyFilter(capsule, 'inputValidation');

            if (!capsule.isValid) {
                input.setCustomValidity(capsule.message);
            }

            DOM(input).state.set('dirty');

            if (!capsule.isValid) {
                isValid = false;

                await this.hooks.doAction('validationError', capsule);
            } else {
                await this.hooks.doAction('validationSuccess', capsule);
            }

        }

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
