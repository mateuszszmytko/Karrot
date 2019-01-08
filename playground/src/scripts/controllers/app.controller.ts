import { DOM, FormValidationController, InputValidationCapsule } from '@karrot/common';
import { Controller, Hooks, Item, Settings } from '@karrot/core';

import { Test } from '../depedencies/test';
import { TestController } from './test.controller';

@Controller({
    name: 'app',
    settings: {
        app: false,
        appName: 'test',
    },
})
export class AppController {

    @Item()
    public test: TestController;

    @Item()
    public myForm: FormValidationController;

    @Item('myForm')
    public form: HTMLElement;

    constructor(private testD: Test, private settings: Settings) {
    }

    public kOnInit(): void {
        this.testD.doLog();

        console.log(this.form);

        DOM(this.form)
            .class.add('testform', 'my-test-form')
            .state.set('active');

        this.test.hooks.addAction('testAction', () => {
            //
        }, 100);

        this.test.hooks.addFilter('message', (message: string) => {
            return message.split('').reverse().join('');
        });

        this.myForm.hooks.addFilter('inputValidation', (capsule: InputValidationCapsule) => {
            if (capsule.input.name !== 'name') {
                return capsule;
            }

            console.log('input validation', capsule);

            if (capsule.input.value !== 'test') {
                capsule.isValid = false;
                capsule.message = capsule.input.value + ' value needs to be "test"';
            }

            return capsule;
        });
    }

    public onClick(e: Event): void {
        console.log('click');
    }

}
