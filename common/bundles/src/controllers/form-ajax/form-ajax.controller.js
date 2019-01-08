"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@karrot/core");
var utils_1 = require("../../utils");
var FormStatus;
(function (FormStatus) {
    FormStatus[FormStatus["None"] = 0] = "None";
    FormStatus[FormStatus["Sending"] = 1] = "Sending";
    FormStatus[FormStatus["Sent"] = 2] = "Sent";
})(FormStatus || (FormStatus = {}));
var FormAjaxController = /** @class */ (function () {
    function FormAjaxController(form, hooks, settings) {
        this.form = form;
        this.hooks = hooks;
        this.settings = settings;
        this.status = FormStatus.None;
    }
    FormAjaxController.prototype.kOnInit = function () {
        var _this = this;
        this.inputs = Array.from(this.form.querySelectorAll('input'));
        utils_1.DOM(this.form)
            .class.add('k-form')
            .event.add('submit', function (e) {
            _this.onSubmit(e);
        });
        utils_1.DOM(this.formOutput)
            .class.add('k-form__output');
        utils_1.DOM(this.submit)
            .class.add('k-form__submit');
        if (this.settings.get('defaultSentEvents')) {
            utils_1.DOM(this.submit)
                .class.add('k-form__submit--circle');
        }
        this.hooks.addAction('beforeSending', function () {
            _this.formBeforeSending();
        });
        this.hooks.addAction('sent', function (response, formOutput) {
            _this.formSent(response, formOutput);
        });
    };
    FormAjaxController.prototype.onSubmit = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var action, response, formData, formDataObject_1, getParam, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.form.checkValidity()) {
                            return [2 /*return*/];
                        }
                        e.preventDefault();
                        if (this.status === FormStatus.Sending) {
                            return [2 /*return*/];
                        }
                        action = this.form.action;
                        formData = new FormData(this.form);
                        return [4 /*yield*/, this.hooks.applyFilter(formData, 'applyFormData')];
                    case 1:
                        formData = _a.sent();
                        return [4 /*yield*/, this.hooks.doAction('beforeSending', formData, action)];
                    case 2:
                        _a.sent();
                        if (this.settings.get('method') === 'GET') {
                            formDataObject_1 = {};
                            formData.forEach(function (value, key) {
                                if (!value) {
                                    return;
                                }
                                formDataObject_1[key] = value;
                            });
                            getParam = Object.keys(formDataObject_1)
                                .map(function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(formDataObject_1[k].toString()); })
                                .join('&');
                            action = action + '?' + getParam;
                        }
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 7]);
                        return [4 /*yield*/, fetch(action, {
                                body: this.settings.get('method') === 'POST' ? formData : undefined,
                                method: this.settings.get('method') || 'POST',
                            })];
                    case 4:
                        response = _a.sent();
                        return [3 /*break*/, 7];
                    case 5:
                        error_1 = _a.sent();
                        return [4 /*yield*/, this.hooks.doAction('error', error_1)];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 7: return [4 /*yield*/, this.hooks.doAction('sent', response, this.formOutput)];
                    case 8:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FormAjaxController.prototype.formBeforeSending = function () {
        this.status = FormStatus.Sending;
        utils_1.DOM(this.form, this.submit, this.formOutput)
            .state.set('active');
    };
    FormAjaxController.prototype.formSent = function (response, formOutput) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, input, reponseObject;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.status = FormStatus.Sent;
                        utils_1.DOM(this.form, this.submit, this.formOutput)
                            .state.set('active', false)
                            .state.set(Math.round(response.status / 100) === 2 ? 'successful' : 'error');
                        if (this.settings.get('clearAfterSending')) {
                            for (_i = 0, _a = this.inputs; _i < _a.length; _i++) {
                                input = _a[_i];
                                if (input.type === 'checkbox' || input.type === 'radio') {
                                    input.checked = false;
                                }
                                else {
                                    input.value = '';
                                }
                            }
                        }
                        if (!this.settings.get('defaultSentEvents')) {
                            return [2 /*return*/];
                        }
                        if (!this.settings.get('jsonResponseData')) return [3 /*break*/, 2];
                        return [4 /*yield*/, response.json()];
                    case 1:
                        reponseObject = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, response.text()];
                    case 3:
                        reponseObject = _b.sent();
                        _b.label = 4;
                    case 4:
                        if (this.formOutput) {
                            this.formOutput.innerHTML = reponseObject;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.Item('formOutput', 'siblings'),
        __metadata("design:type", HTMLElement)
    ], FormAjaxController.prototype, "formOutput", void 0);
    __decorate([
        core_1.Item(),
        __metadata("design:type", HTMLInputElement)
    ], FormAjaxController.prototype, "submit", void 0);
    FormAjaxController = __decorate([
        core_1.Controller({
            name: 'formAjax',
            settings: {
                clearAfterSending: true,
                defaultSentEvents: true,
                defaultValidationEvents: true,
                jsonResponseData: false,
                method: 'POST',
            },
        }),
        __metadata("design:paramtypes", [HTMLFormElement,
            core_1.Hooks,
            core_1.Settings])
    ], FormAjaxController);
    return FormAjaxController;
}());
exports.FormAjaxController = FormAjaxController;
//# sourceMappingURL=form-ajax.controller.js.map