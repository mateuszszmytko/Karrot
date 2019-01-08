"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controllers_resolver_1 = require("./controller/controllers-resolver");
var injector_1 = require("./di/injector");
var KarrotImp = /** @class */ (function () {
    function KarrotImp(args) {
        this.args = args;
        this._rootInjector = new injector_1.Injector();
        this._controllersResolver = new controllers_resolver_1.ControllersResolver({
            controllersConstructors: args.controllers,
            rootInjector: this._rootInjector,
        });
    }
    KarrotImp.prototype.onInit = function () {
        if (this.args.depedencies) {
            for (var _i = 0, _a = this.args.depedencies; _i < _a.length; _i++) {
                var depedency = _a[_i];
                this._rootInjector.add(depedency, 'singleton');
            }
        }
        this._controllersResolver.onInit();
    };
    return KarrotImp;
}());
exports.KarrotImp = KarrotImp;
//# sourceMappingURL=karrot-imp.js.map