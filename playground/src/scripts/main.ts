import {  Karrot, KarrotItem } from "@karrot/core";
import { FormAjax, FormValidation, ScrollTo, LazyLoad } from '@karrot/common';

import { App } from "./app";
const form = Karrot.get('my-form');

Karrot.attach('my-form', FormAjax, FormValidation);
Karrot.attach('link', ScrollTo);
Karrot.attach('app', App);
Karrot.attach('lazy', LazyLoad);
