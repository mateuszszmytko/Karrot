"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var karrot_imp_1 = require("./karrot-imp");
var controller_1 = require("./controller");
// tslint:disable:no-any
/*
export interface IKarrot {
    init(): void;
    attach(name: string, ...attached: Array<IConstructorAny | IFunctionAny>): void;
    get(name: string, ...typeOrContexts: HTMLElement[]): HTMLElement[];
    get<T>(name: string | HTMLElement, ...typeOrContexts: Array<IConstructor<T> | HTMLElement>): T[];
    getOne(name: string, ...typeOrContexts: HTMLElement[]): HTMLElement | undefined;
    getOne<T>(name: string | HTMLElement, ...typeOrContexts: Array<IConstructor<T> | HTMLElement>): T | undefined;
}

export const Karrot: Readonly<IKarrot> = (() => {
    let imp: KarrotImp;

    return {
        attach: (name: string, ...attached: Array<IConstructorAny | IFunctionAny>) => {
            imp.manager.attach(name, ...attached);
        },
        get: (name: string, ...typeOrContexts: any[]) => {
            return imp.get(name, ...typeOrContexts);
        },

        getOne: (name: string, ...typeOrContexts: any[]) => {
            return imp.getOne(name, ...typeOrContexts);
        },
        init: () => {
            imp = new KarrotImp();

            imp.onInit();
        },
    };
})();

*/
var Karrot = /** @class */ (function (_super) {
    __extends(Karrot, _super);
    function Karrot() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.names = [];
        _this.attachments = [];
        return _this;
    }
    Karrot.init = function () {
        Karrot.imp = new karrot_imp_1.KarrotImp();
        Karrot.imp.onInit();
    };
    Karrot.attach = function (name) {
        var attached = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            attached[_i - 1] = arguments[_i];
        }
        var _a;
        (_a = Karrot.imp).attach.apply(_a, [name].concat(attached));
    };
    Karrot.getMany = function (name) {
        var typeOrContexts = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            typeOrContexts[_i - 1] = arguments[_i];
        }
        var _a;
        return (_a = Karrot.imp).getMany.apply(_a, [name].concat(typeOrContexts));
    };
    Karrot.get = function (name) {
        var typeOrContexts = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            typeOrContexts[_i - 1] = arguments[_i];
        }
        var _a;
        return (_a = Karrot.imp).get.apply(_a, [name].concat(typeOrContexts));
    };
    Karrot.prototype.attach = function () {
        var attachments = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            attachments[_i] = arguments[_i];
        }
        var _loop_1 = function (attachment) {
            if (attachment.prototype && attachment.prototype.constructor.name) {
                var instance = (new attachment(this_1.element, this_1.hooks, this_1.settings));
                var existingInstance = this_1.attachments.find(function (a) {
                    return a.constructor.name === attachment.prototype.constructor.name;
                });
                if (existingInstance) {
                    return "continue";
                }
                if (instance.kOnInit && typeof instance.kOnInit === 'function') {
                    instance.kOnInit();
                }
                this_1.attachments.push(instance);
            }
            else {
                var func = attachment(this_1.element, this_1.hooks, this_1.settings);
                this_1.attachments.push(attachment);
            }
        };
        var this_1 = this;
        for (var _a = 0, attachments_1 = attachments; _a < attachments_1.length; _a++) {
            var attachment = attachments_1[_a];
            _loop_1(attachment);
        }
    };
    return Karrot;
}(controller_1.Controller));
exports.Karrot = Karrot;
//# sourceMappingURL=karrot.js.map