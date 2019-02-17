import { Karrot } from '@karrot/core';

export class App {

    public form = Karrot.get('form');

    public kOnInit(): void {
        if (this.form) {
            this.form.addAction('formValidation.result', (result) => {
                console.log(result);
            });
        }
    }

}
