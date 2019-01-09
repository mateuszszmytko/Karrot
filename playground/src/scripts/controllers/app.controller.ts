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

    private _data: { a: string, c: string };

    constructor(private testD: Test, private settings: Settings) {
        this._data = testD.data;
    }

    public kOnInit(): void {

        console.log(this.form);

        DOM(this.form)
            .class.add('testform', 'my-test-form')
            .state.set('active');

        if (this.test) {
            this.test.hooks.addAction('testAction', () => {
                console.log(this._data);
                this.testD.doLog();

                console.log(this._data);
            }, 100);

            this.test.hooks.addFilter('message', (message: string) => {
                return message.split('').reverse().join('');
            });
        }

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

        this.testD.hooks.addAction('dataChange', (data: { a: string, c: string }) => {
            console.log('data change');

            this._data = data;
        });

    }

}
