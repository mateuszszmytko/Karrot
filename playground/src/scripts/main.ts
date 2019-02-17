import {  Karrot, Hooks } from "@karrot/core";

import { FormAjax,
	FormValidation,
	Modal,
	ScrollTo } from '@karrot/common';

import { App } from "./controllers/app.controller";
import { ClickToggle } from "./controllers/click-toggle.controller";

Karrot.init();

Karrot.attach('form', FormAjax, FormValidation, FormAjax);
Karrot.attach('modal', Modal);
Karrot.attach('link', ScrollTo);
Karrot.attach('app', App);

Karrot.attach('form', (element: HTMLElement, hooks: Hooks) => {
    setTimeout(() => {
        hooks.doAction('form.test');
    }, 5000);

    hooks.addAction('form.test', () => {
        console.log('test');
    });

    return 'asd';
});

const form = Karrot.get('form');

if (form) {
    console.log(form);
}
