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
var core_1 = require("@karrot/core");
var utils_1 = require("../../utils");
var ModalState;
(function (ModalState) {
    ModalState[ModalState["DuringOpening"] = 0] = "DuringOpening";
    ModalState[ModalState["DuringClosing"] = 1] = "DuringClosing";
    ModalState[ModalState["Open"] = 2] = "Open";
    ModalState[ModalState["Closed"] = 3] = "Closed";
})(ModalState || (ModalState = {}));
var Modal = /** @class */ (function () {
    function Modal(item) {
        this.defaultSettings = {
            closeOnCancel: true,
            closeOnConfirm: true,
            closeOnOutsideClick: true,
            hashTracking: true,
            positionX: 'middle',
            positionY: 'middle',
        };
        this.settings = {};
        this.confirms = core_1.Karrot.getMany('confirm', HTMLElement, this.element);
        this.cancels = core_1.Karrot.getMany('cancel', HTMLElement, this.element);
        this.exits = core_1.Karrot.getMany('close', HTMLElement, this.element);
        this.modalState = ModalState.Closed;
        this.settings = item.appendSettings(this.defaultSettings);
        this.element = item.element;
        this.hooks = item.hooks;
    }
    Modal.prototype.kOnInit = function () {
        var _this = this;
        this.modalState = ModalState.Closed;
        this.build();
        if (this.settings.hashTracking && window.location.hash === '#' + this.modalId) {
            this.openModal();
        }
        this.resolveModalId();
        this.links = Array.from(document.querySelectorAll("[href=\"#" + this.modalId + "\"]"));
        utils_1.DOM(this.links)
            .event.add('click', function (e) {
            _this.linkClick(e);
        });
        utils_1.DOM(this.overlay, this.exits)
            .event.add('click', function (e) {
            _this.overlayClick(e);
        });
        utils_1.DOM(this.confirms)
            .event.add('click', function (e) {
            _this.onConfirm(e);
        });
        utils_1.DOM(this.cancels)
            .event.add('click', function (e) {
            _this.onCancel(e);
        });
    };
    Modal.prototype.build = function () {
        this.element.classList.add('k-modal');
        var wrapper = document.createElement('div');
        wrapper.classList.add('k-modal__wrapper');
        this.element.insertAdjacentElement('beforebegin', wrapper);
        wrapper.insertAdjacentElement('afterbegin', this.element);
        this.wrapper = wrapper;
        var overlay = document.createElement('div');
        overlay.classList.add('k-modal__overlay');
        this.element.insertAdjacentElement('beforebegin', overlay);
        this.overlay = overlay;
        if (this.settings.positionX !== 'middle') {
            utils_1.DOM(this.element, this.wrapper).state.set(this.settings.positionX);
        }
        if (this.settings.positionY !== 'middle') {
            utils_1.DOM(this.element, this.wrapper).state.set(this.settings.positionY);
        }
        utils_1.DOM(this.wrapper).state.set('initialized');
    };
    Modal.prototype.resolveModalId = function () {
        if (this.settings.modalId) {
            this.modalId = this.settings.modalId;
        }
        else if (this.element.id) {
            this.modalId = this.element.id;
        }
        else {
            this.modalId = this._controllerId;
        }
    };
    Modal.prototype.openModal = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.modalState !== ModalState.Closed) {
                            return [2 /*return*/];
                        }
                        utils_1.DOM(this.wrapper).state.set('dirty');
                        this.modalState = ModalState.DuringOpening;
                        return [4 /*yield*/, this.hooks.doAction('modal.open')];
                    case 1:
                        _a.sent();
                        utils_1.DOM(this.element, this.overlay, this.wrapper).state.set('active');
                        this.modalState = ModalState.Open;
                        return [2 /*return*/];
                }
            });
        });
    };
    Modal.prototype.closeModal = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.modalState !== ModalState.Open) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.hooks.doAction('modal.beforeClosing')];
                    case 1:
                        _a.sent();
                        this.modalState = ModalState.DuringClosing;
                        utils_1.DOM(this.element, this.overlay, this.wrapper).state.set('active', false);
                        this.modalState = ModalState.Closed;
                        return [4 /*yield*/, this.hooks.doAction('modal.close')];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Modal.prototype.linkClick = function (e) {
        e.preventDefault();
        this.openModal();
    };
    Modal.prototype.overlayClick = function (e) {
        e.preventDefault();
        if (!this.settings.closeOnOutsideClick) {
            return;
        }
        this.closeModal();
    };
    Modal.prototype.onConfirm = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.preventDefault();
                        return [4 /*yield*/, this.hooks.doAction('modal.confirm')];
                    case 1:
                        _a.sent();
                        if (!this.settings.closeOnConfirm) {
                            return [2 /*return*/];
                        }
                        this.closeModal();
                        return [2 /*return*/];
                }
            });
        });
    };
    Modal.prototype.onCancel = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.preventDefault();
                        return [4 /*yield*/, this.hooks.doAction('modal.cancel')];
                    case 1:
                        _a.sent();
                        if (!this.settings.closeOnCancel) {
                            return [2 /*return*/];
                        }
                        this.closeModal();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Modal;
}());
exports.Modal = Modal;
//# sourceMappingURL=modal.js.map