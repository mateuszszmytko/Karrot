"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var injector_1 = require("../di/injector");
var controller_utils_1 = require("../utils/controller-utils");
var controller_hooks_1 = require("./depedencies/controller-hooks");
var controller_settings_1 = require("./depedencies/controller-settings");
/* tslint:disable:no-any */
var ControllersFactory = /** @class */ (function () {
    function ControllersFactory(_injector) {
        this._injector = _injector;
        this._controllersConstructors = [];
    }
    ControllersFactory.prototype.create = function (constructor) {
        var controllers = [];
        var meta = controller_utils_1.ControllerUtils.getControllerMeta(constructor);
        var controllerName = meta.name;
        var elements = Array.from(document.querySelectorAll("[k-name]"));
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var element = elements_1[_i];
            var kNameValue = element.getAttribute('k-name');
            var kNames = kNameValue.replace(/\s+/g, '').split(';');
            for (var _a = 0, kNames_1 = kNames; _a < kNames_1.length; _a++) {
                var kName = kNames_1[_a];
                if (kName === controllerName) {
                    var controller = this.createController(constructor, element);
                    if (controller) {
                        controller._controllerElement = element;
                        controllers.push(controller);
                    }
                }
            }
        }
        return controllers;
    };
    ControllersFactory.prototype.createController = function (constructor, element) {
        if (!constructor) {
            return undefined;
        }
        var controllerMeta = controller_utils_1.ControllerUtils.getControllerMeta(constructor);
        var settings = new controller_settings_1.Settings(element, constructor);
        var hooks = new controller_hooks_1.Hooks();
        var injector = new injector_1.Injector(this._injector);
        injector.addSingleton(HTMLElement, element);
        injector.addSingleton(controller_settings_1.Settings, settings);
        injector.addSingleton(controller_hooks_1.Hooks, hooks);
        if (controllerMeta.depedencies) {
            for (var _i = 0, _a = controllerMeta.depedencies; _i < _a.length; _i++) {
                var depedencyCon = _a[_i];
                injector.addSingleton(depedencyCon);
            }
        }
        var controller = injector.resolve(constructor);
        return controller;
    };
    return ControllersFactory;
}());
exports.ControllersFactory = ControllersFactory;
//# sourceMappingURL=controllers-factory.js.map