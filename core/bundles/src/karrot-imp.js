"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controller_1 = require("./controller");
var controllers_resolver_1 = require("./controller/controllers-resolver");
var controllers_storage_1 = require("./controller/controllers-storage");
var items_parser_1 = require("./controller/parse/items-parser");
var depedencies_1 = require("./depedencies");
var injector_1 = require("./di/injector");
var KarrotImp = /** @class */ (function () {
    function KarrotImp(args) {
        this.args = args;
        this._rootInjector = new injector_1.Injector();
        var controllersStorage = new controllers_storage_1.ControllersStorage(args.controllers);
        var controllersFactory = new controller_1.ControllersFactory(this._rootInjector);
        var itemsParser = new items_parser_1.ItemsParser(controllersStorage);
        this._rootInjector.addSingleton(controllers_storage_1.ControllersStorage, controllersStorage);
        this._rootInjector.addTransient(depedencies_1.Hooks);
        this._controllersResolver = new controllers_resolver_1.ControllersResolver({
            controllersFactory: controllersFactory,
            controllersStorage: controllersStorage,
            itemsParser: itemsParser,
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