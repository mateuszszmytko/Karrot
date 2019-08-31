"use strict";
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
var utils_1 = require("../../utils");
var FormValidation = /** @class */ (function () {
    function FormValidation(item) {
        this.item = item;
        this.defaultSettings = {
            defaultValidationEvents: true,
            validationType: 'mixed',
        };
        this.settings = {};
        // public element: HTMLElement, public hooks: Hooks, settings: ISettings
        this.settings = item.appendSettings(this.defaultSettings);
        this.element = item.element;
        this.hooks = item.hooks;
    }
    FormValidation.prototype.kOnInit = function () {
        var _this = this;
        this.inputs = Array.from(this.element.querySelectorAll('input, select, textarea'));
        utils_1.DOM(this.element)
            .class.add('k-form-validation')
            .attribute.set('novalidate')
            .event.add('submit', function (e) {
            _this.validityCheck(e);
        });
        utils_1.DOM(this.inputs)
            .event.add('keyup', function (e, element) {
            _this.validityCheck(e, element);
        })
            .event.add('change', function (e, element) {
            _this.validityCheck(e, element);
        });
        if (this.settings.defaultValidationEvents) {
            this.hooks.addAction('formValidation.error', function (capsule) {
                _this.onValidationError(capsule);
            });
            this.hooks.addAction('formValidation.success', function (capsule) {
                _this.onValidationError(capsule);
            });
        }
    };
    FormValidation.prototype.validityCheck = function (e, useInput) {
        return __awaiter(this, void 0, void 0, function () {
            var inputs, isValid, capsules, _i, inputs_1, input, checkValidty, message, capsule;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        inputs = this.inputs;
                        if (e.type === 'keyup' || e.type === 'change') {
                            if (!useInput) {
                                return [2 /*return*/];
                            }
                            inputs = [useInput];
                        }
                        if ((e.type === 'keyup' || e.type === 'change') && this.settings.validationType === 'submit') {
                            return [2 /*return*/];
                        }
                        if ((e.type === 'keyup' || e.type === 'change') &&
                            this.settings.validationType === 'mixed' &&
                            useInput &&
                            !utils_1.DOM(useInput).state.is('dirty')) {
                            return [2 /*return*/];
                        }
                        isValid = true;
                        capsules = [];
                        _i = 0, inputs_1 = inputs;
                        _a.label = 1;
                    case 1:
                        if (!(_i < inputs_1.length)) return [3 /*break*/, 8];
                        input = inputs_1[_i];
                        input.setCustomValidity('');
                        checkValidty = input.checkValidity();
                        return [4 /*yield*/, this.getErrorMessage(input)];
                    case 2:
                        message = _a.sent();
                        capsule = {
                            input: input,
                            isValid: checkValidty,
                            message: message,
                        };
                        return [4 /*yield*/, this.hooks.applyFilter(capsule, 'formValidation.inputValidation')];
                    case 3:
                        capsule = _a.sent();
                        capsules.push(capsule);
                        if (!capsule.isValid) {
                            input.setCustomValidity(capsule.message);
                        }
                        utils_1.DOM(input).state.set('dirty');
                        if (!!capsule.isValid) return [3 /*break*/, 5];
                        isValid = false;
                        return [4 /*yield*/, this.hooks.doAction('formValidation.error', capsule)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.hooks.doAction('formValidation.success', capsule)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 1];
                    case 8: return [4 /*yield*/, this.hooks.doAction('formValidation.result', isValid, capsules)];
                    case 9:
                        _a.sent();
                        if (!isValid) {
                            e.preventDefault();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    FormValidation.prototype.onValidationError = function (capsule) {
        if (!capsule.input) {
            return;
        }
        // clear
        if (capsule.input.parentElement) {
            var errorElement = capsule.input.parentElement.querySelector('[error-for=' + capsule.input.name + ']');
            if (errorElement && errorElement.parentElement) {
                errorElement.parentElement.removeChild(errorElement);
            }
        }
        if (capsule.message) {
            utils_1.DOM(capsule.input).state.set('error');
            var parent_1 = capsule.input.parentElement;
            parent_1.insertAdjacentHTML('beforeend', "<div error-for=\"" + capsule.input.name + "\" class=\"input-error\"><p>" + capsule.message + "</p></div>");
        }
        else {
            utils_1.DOM(capsule.input).state.set('error', false);
        }
    };
    FormValidation.prototype.getErrorMessage = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var validity, message, v, customMessage;
            return __generator(this, function (_a) {
                validity = input.validity;
                message = input.validationMessage || '';
                for (v in validity) {
                    if (validity.hasOwnProperty(v)) {
                        if (!validity[v]) {
                            continue;
                        }
                        customMessage = input.dataset[v];
                        if (customMessage) {
                            message = customMessage;
                            break;
                        }
                    }
                }
                return [2 /*return*/, message];
            });
        });
    };
    return FormValidation;
}());
exports.FormValidation = FormValidation;
//# sourceMappingURL=form-validation.js.map