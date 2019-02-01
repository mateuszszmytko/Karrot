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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@karrot/core");
var ItemsManager = /** @class */ (function () {
    function ItemsManager(controllersStorage) {
        //
        this.controllersStorage = controllersStorage;
        console.log(controllersStorage);
    }
    ItemsManager.prototype.getControllers = function (name, type) {
        var elements = this.getElements(name);
        var controllersByName = this.controllersStorage.controllers.filter(function (c) {
            return elements.indexOf(c._controllerElement) >= 0 && c.constructor === type;
        });
        return controllersByName || [];
    };
    ItemsManager.prototype.getController = function (name, type) {
        return this.getControllers(name, type)[0] || undefined;
    };
    ItemsManager.prototype.getElement = function (name, context) {
        if (context === void 0) { context = document.body; }
        return this.getElements(name, context)[0] || undefined;
    };
    ItemsManager.prototype.getElements = function (name, context) {
        if (context === void 0) { context = document.body; }
        var elements = Array.from(context.querySelectorAll('[k-name]'));
        var itemsElements = [];
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var element = elements_1[_i];
            var kNameValue = element.getAttribute('k-name');
            var kNames = kNameValue.replace(/\s+/g, '').split(';');
            for (var _a = 0, kNames_1 = kNames; _a < kNames_1.length; _a++) {
                var kName = kNames_1[_a];
                if (kName === name) {
                    itemsElements.push(element);
                }
            }
        }
        return itemsElements;
    };
    ItemsManager = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_1.ControllersStorage])
    ], ItemsManager);
    return ItemsManager;
}());
exports.ItemsManager = ItemsManager;
//# sourceMappingURL=items-manager.js.map