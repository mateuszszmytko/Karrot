import {  Karrot } from "@karrot/core";

import { FormAjaxController,
	FormValidationController,
	ItemsManager,
	ModalController,
	ScrollToController } from '@karrot/common';

import { AppController } from "./controllers/app.controller";
import { TestController } from "./controllers/test.controller";
import { Test } from "./depedencies/test";

import { ClickToggleController } from "./controllers/click-toggle.controller";

Karrot({
	controllers: [AppController, TestController, ClickToggleController,
		ScrollToController, ModalController, FormValidationController, FormAjaxController],
	depedencies: [Test, ItemsManager],
});
