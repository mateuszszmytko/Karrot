import {  Karrot } from "@karrot/core";

import { FormAjaxController, FormValidationController, ModalController, ScrollToController } from '@karrot/common';

import { AppController } from "./controllers/app.controller";
import { TestController } from "./controllers/test.controller";
import { Test } from "./depedencies/test";

Karrot({
	controllers: [AppController, TestController,
		ScrollToController, ModalController, FormValidationController, FormAjaxController],
	depedencies: [Test],
});
