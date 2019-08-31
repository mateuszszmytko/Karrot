import { KarrotItem, Karrot, Hooks } from '@karrot/core';
import { InputValidationCapsule } from '@karrot/common';

export class App {

    constructor(public item: KarrotItem) {
    }

    public kOnInit(): void {
        const myForm = Karrot.get('my-form') as KarrotItem;

        myForm.hooks.addAction('formValidation.error', (capsule: InputValidationCapsule) => {
            // pass validation message error to logger
            console.log(capsule.message);
        });
    }
}
