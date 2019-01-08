"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controllers_factory_1 = require("./controllers-factory");
var items_parser_1 = require("./parse/items-parser");
var ControllersResolver = /** @class */ (function () {
    function ControllersResolver(args) {
        this._controllers = [];
        this._controllersConstructors = args.controllersConstructors;
        this._rootInjector = args.rootInjector;
        this._controllersFactory = new controllers_factory_1.ControllersFactory(this._rootInjector);
    }
    Object.defineProperty(ControllersResolver.prototype, "controllers", {
        get: function () {
            return this._controllers;
        },
        enumerable: true,
        configurable: true
    });
    ControllersResolver.prototype.onInit = function () {
        this.createControllers();
        this._itemsParser = new items_parser_1.ItemsParser(this.controllers);
        this.initializeControllers();
    };
    ControllersResolver.prototype.createControllers = function () {
        for (var _i = 0, _a = this._controllersConstructors; _i < _a.length; _i++) {
            var controllerConstructor = _a[_i];
            var controllers = this._controllersFactory.create(controllerConstructor);
            this._controllers = this._controllers.concat(controllers);
        }
    };
    ControllersResolver.prototype.initializeControllers = function () {
        for (var _i = 0, _a = this._controllers; _i < _a.length; _i++) {
            var controller = _a[_i];
            controller.__karrotConstructor();
        }
        for (var _b = 0, _c = this._controllers; _b < _c.length; _b++) {
            var controller = _c[_b];
            controller.__karrotParse(this._itemsParser);
        }
        for (var _d = 0, _e = this._controllers; _d < _e.length; _d++) {
            var controller = _e[_d];
            controller.__karrotInit();
        }
    };
    return ControllersResolver;
}());
exports.ControllersResolver = ControllersResolver;
//# sourceMappingURL=controllers-resolver.js.map