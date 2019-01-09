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
var ModalState;
(function (ModalState) {
    ModalState[ModalState["DuringOpening"] = 0] = "DuringOpening";
    ModalState[ModalState["DuringClosing"] = 1] = "DuringClosing";
    ModalState[ModalState["Open"] = 2] = "Open";
    ModalState[ModalState["Closed"] = 3] = "Closed";
})(ModalState || (ModalState = {}));
var ModalController = /** @class */ (function () {
    function ModalController(modal, hooks, settings) {
        this.modal = modal;
        this.hooks = hooks;
        this.settings = settings;
        this.modalState = ModalState.Closed;
    }
    ModalController.prototype.kOnInit = function () {
        var _this = this;
        this.modalState = ModalState.Closed;
        this.build();
        if (this.settings.get('hashTracking') && window.location.hash === '#' + this.modalId) {
            this.openModal();
        }
        this.resolveModalId();
        this.links = Array.from(document.querySelectorAll("[href=\"#" + this.modalId + "\"]"));
        for (var _i = 0, _a = this.links; _i < _a.length; _i++) {
            var link = _a[_i];
            link.addEventListener('click', function (e) {
                _this.linkClick(e);
            });
        }
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
    ModalController.prototype.build = function () {
        this.modal.classList.add('k-modal');
        var wrapper = document.createElement('div');
        wrapper.classList.add('k-modal__wrapper');
        this.modal.insertAdjacentElement('beforebegin', wrapper);
        wrapper.insertAdjacentElement('afterbegin', this.modal);
        this.wrapper = wrapper;
        var overlay = document.createElement('div');
        overlay.classList.add('k-modal__overlay');
        this.modal.insertAdjacentElement('beforebegin', overlay);
        this.overlay = overlay;
        if (this.settings.get('positionX') !== 'middle') {
            utils_1.DOM(this.modal, this.wrapper).state.set(this.settings.get('positionX'));
        }
        if (this.settings.get('positionY') !== 'middle') {
            utils_1.DOM(this.modal, this.wrapper).state.set(this.settings.get('positionY'));
        }
        utils_1.DOM(this.wrapper).state.set('initialized');
    };
    ModalController.prototype.resolveModalId = function () {
        if (this.settings.get('modalId')) {
            this.modalId = this.settings.get('modalId');
        }
        else if (this.modal.id) {
            this.modalId = this.modal.id;
        }
        else {
            this.modalId = this._controllerId;
        }
    };
    ModalController.prototype.openModal = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.modalState !== ModalState.Closed) {
                            return [2 /*return*/];
                        }
                        utils_1.DOM(this.wrapper).state.set('dirty');
                        this.modalState = ModalState.DuringOpening;
                        return [4 /*yield*/, this.hooks.doAction('open')];
                    case 1:
                        _a.sent();
                        utils_1.DOM(this.modal, this.overlay, this.wrapper).state.set('active');
                        this.modalState = ModalState.Open;
                        return [2 /*return*/];
                }
            });
        });
    };
    ModalController.prototype.closeModal = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.modalState !== ModalState.Open) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.hooks.doAction('beforeClosing')];
                    case 1:
                        _a.sent();
                        this.modalState = ModalState.DuringClosing;
                        utils_1.DOM(this.modal, this.overlay, this.wrapper).state.set('active', false);
                        this.modalState = ModalState.Closed;
                        return [4 /*yield*/, this.hooks.doAction('close')];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ModalController.prototype.linkClick = function (e) {
        e.preventDefault();
        this.openModal();
    };
    ModalController.prototype.overlayClick = function (e) {
        e.preventDefault();
        if (!this.settings.get('closeOnOutsideClick')) {
            return;
        }
        this.closeModal();
    };
    ModalController.prototype.onConfirm = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.preventDefault();
                        return [4 /*yield*/, this.hooks.doAction('confirm')];
                    case 1:
                        _a.sent();
                        if (!this.settings.get('closeOnConfirm')) {
                            return [2 /*return*/];
                        }
                        this.closeModal();
                        return [2 /*return*/];
                }
            });
        });
    };
    ModalController.prototype.onCancel = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.preventDefault();
                        return [4 /*yield*/, this.hooks.doAction('cancel')];
                    case 1:
                        _a.sent();
                        if (!this.settings.get('closeOnCancel')) {
                            return [2 /*return*/];
                        }
                        this.closeModal();
                        return [2 /*return*/];
                }
            });
        });
    };
    var _a, _b;
    __decorate([
        core_1.Item('confirm'),
        __metadata("design:type", Array)
    ], ModalController.prototype, "confirms", void 0);
    __decorate([
        core_1.Item('cancel'),
        __metadata("design:type", Array)
    ], ModalController.prototype, "cancels", void 0);
    __decorate([
        core_1.Item('close'),
        __metadata("design:type", Array)
    ], ModalController.prototype, "exits", void 0);
    ModalController = __decorate([
        core_1.Controller({
            name: 'modal',
            settings: {
                closeOnCancel: true,
                closeOnConfirm: true,
                closeOnOutsideClick: true,
                hashTracking: true,
                positionX: 'middle',
                positionY: 'middle',
            },
        }),
        __metadata("design:paramtypes", [HTMLElement, typeof (_a = typeof core_1.Hooks !== "undefined" && core_1.Hooks) === "function" ? _a : Object, typeof (_b = typeof core_1.Settings !== "undefined" && core_1.Settings) === "function" ? _b : Object])
    ], ModalController);
    return ModalController;
}());
exports.ModalController = ModalController;
//# sourceMappingURL=modal.controller.js.map