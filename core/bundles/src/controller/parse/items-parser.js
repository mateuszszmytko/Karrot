"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controller_utils_1 = require("../../utils/controller-utils");
/* tslint:disable:no-any */
var ItemsParser = /** @class */ (function () {
    function ItemsParser(controllersStorage) {
        this.controllersStorage = controllersStorage;
    }
    ItemsParser.prototype.parse = function (controller) {
        var meta = controller_utils_1.ControllerUtils.getControllerMeta(controller);
        var items = meta.items;
        if (!items) {
            return;
        }
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            var itemObject = this.getItemObject(item, controller);
            if (itemObject) {
                this.appendItem(item, controller, itemObject);
            }
        }
    };
    ItemsParser.prototype.getItemObject = function (item, controller) {
        var type = Reflect.getMetadata("design:type", controller, item.propertyKey);
        var elements = this.getElementsByName(item, controller);
        if (!type) {
            return;
        }
        if (!elements) {
            return;
        }
        var _s = type;
        while (Object.getPrototypeOf(_s)) {
            if (_s === HTMLElement) {
                return elements[0];
            }
            _s = Object.getPrototypeOf(_s);
        }
        if (type === Array) {
            var controllersByName = this.controllersStorage.controllers.filter(function (c) {
                var meta = controller_utils_1.ControllerUtils.getControllerMeta(c);
                return meta.name === name;
            });
            if (controllersByName.length === 0) {
                return elements;
            }
            else {
                return controllersByName;
            }
        }
        var itemControllers = [];
        var _loop_1 = function (element) {
            itemControllers.push.apply(itemControllers, this_1.controllersStorage.controllers.filter(function (c) { return c._controllerElement === element; }));
        };
        var this_1 = this;
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var element = elements_1[_i];
            _loop_1(element);
        }
        for (var _a = 0, itemControllers_1 = itemControllers; _a < itemControllers_1.length; _a++) {
            var itemController = itemControllers_1[_a];
            if (itemController instanceof type) {
                return itemController;
            }
        }
        return undefined;
    };
    ItemsParser.prototype.appendItem = function (item, controller, itemObject) {
        controller[item.propertyKey] = itemObject;
    };
    ItemsParser.prototype.getElementsByName = function (item, controller) {
        var elements = [];
        switch (item.searchStrategy) {
            case 'all':
                elements = Array.from(document.querySelectorAll('[k-name]'));
                break;
            case 'children':
                elements = Array.from(controller._controllerElement.querySelectorAll('[k-name]'));
                break;
            case 'parents':
                elements = Array.from(document.querySelectorAll('[k-name]'));
                var insideElements_1 = Array.from(controller._controllerElement.querySelectorAll('[k-name]'));
                elements = elements.filter(function (e) { return insideElements_1.indexOf(e) === -1; });
                break;
            case 'siblings':
                var parent_1 = controller._controllerElement.parentElement;
                if (!parent_1) {
                    break;
                }
                elements = Array.from(parent_1.children).filter(function (e) { return e !== controller._controllerElement && e.matches('[k-name]'); });
                break;
        }
        var returnElements = [];
        for (var _i = 0, elements_2 = elements; _i < elements_2.length; _i++) {
            var element = elements_2[_i];
            var kNameValue = element.getAttribute('k-name');
            var kNames = kNameValue.replace(/\s+/g, '').split(';');
            for (var _a = 0, kNames_1 = kNames; _a < kNames_1.length; _a++) {
                var kName = kNames_1[_a];
                if (kName === item.name) {
                    returnElements.push(element);
                }
            }
        }
        return returnElements;
    };
    return ItemsParser;
}());
exports.ItemsParser = ItemsParser;
//# sourceMappingURL=items-parser.js.map