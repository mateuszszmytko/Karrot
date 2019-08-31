"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var karrot_imp_1 = require("./karrot-imp");
exports.Karrot = (function () {
    var imp = new karrot_imp_1.KarrotImp();
    imp.onInit();
    return {
        attach: function (name) {
            var attached = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                attached[_i - 1] = arguments[_i];
            }
            imp.attach.apply(imp, [name].concat(attached));
        },
        get: function (name) {
            var typeOrContexts = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                typeOrContexts[_i - 1] = arguments[_i];
            }
            return imp.get.apply(imp, [name].concat(typeOrContexts));
        },
        getMany: function (name) {
            var typeOrContexts = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                typeOrContexts[_i - 1] = arguments[_i];
            }
            return imp.getMany.apply(imp, [name].concat(typeOrContexts));
        },
        refresh: function () {
            imp.refresh();
        },
        reload: function () {
            imp.onInit();
        },
    };
})();
/*
export class Karrot2 {
    public static init(): void {
        Karrot.imp = new KarrotImp();

        Karrot.imp.onInit();
    }

    public static attach(name: string, ...attached: Array<IConstructorAny | IFunctionAny>): void {
        Karrot.imp.attach(name, ...attached);
    }

    public static getMany(name: string, ...typeOrContexts: HTMLElement[]): Karrot[];
    public static getMany<T>(name: string | HTMLElement,
        ...typeOrContexts: Array<IConstructor<T> | HTMLElement>): T[];
    public static getMany(name: any, ...typeOrContexts: any): any {
        return Karrot.imp.getMany(name, ...typeOrContexts);
    }

    public static get(name: string, ...typeOrContexts: HTMLElement[]): Karrot | undefined;
    public static get<T>(name: string | HTMLElement,
        ...typeOrContexts: Array<IConstructor<T> | HTMLElement>): T | undefined;
    public static get(name: any, ...typeOrContexts: any): any {
        return Karrot.imp.get(name, ...typeOrContexts);
    }

    private static imp: KarrotImp;
}
*/
//# sourceMappingURL=karrot.js.map