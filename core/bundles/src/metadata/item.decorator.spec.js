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
var item_decorator_1 = require("./item.decorator");
/* tslint:disable:no-any */
var TestClass = /** @class */ (function () {
    function TestClass() {
    }
    __decorate([
        item_decorator_1.Item('myTestElement', 'siblings'),
        __metadata("design:type", HTMLElement)
    ], TestClass.prototype, "testElement", void 0);
    __decorate([
        item_decorator_1.Item(),
        __metadata("design:type", HTMLElement)
    ], TestClass.prototype, "testElement2", void 0);
    return TestClass;
}());
exports.TestClass = TestClass;
describe('Item decorator', function () {
    beforeAll(function () {
        console.log('%c Item decorator ', 'background: #222; color: #bada55');
    });
    afterAll(function () {
        console.log('%c end of Item decorator', 'background: #222; color: #bada55');
    });
    it('"items" metadata is defined', function () {
        var controllerItemMetadata = Reflect.getMetadata('Controller:items', TestClass);
        expect(controllerItemMetadata).toBeTruthy();
    });
    it('"items" metadata is an array', function () {
        var controllerItemMetadata = Reflect.getMetadata('Controller:items', TestClass);
        expect(Array.isArray(controllerItemMetadata)).toBeTruthy();
    });
    it('"items" metadata first object contains "propertyKey", "name" and "searchStrategy"', function () {
        var controllerItemMetadata = Reflect.getMetadata('Controller:items', TestClass);
        expect(controllerItemMetadata[0].propertyKey).toBeDefined();
        expect(controllerItemMetadata[0].name).toBeDefined();
        expect(controllerItemMetadata[0].searchStrategy).toBeDefined();
    });
    it('"items" metadata use "name" argument if exists', function () {
        var controllerItemMetadata = Reflect.getMetadata('Controller:items', TestClass);
        expect(controllerItemMetadata[0].name).not.toBe(controllerItemMetadata[0].propertyKey);
    });
    it('"items" metadata use "propertyKey" as "name" if exists', function () {
        var controllerItemMetadata = Reflect.getMetadata('Controller:items', TestClass);
        expect(controllerItemMetadata[1].name).toBe(controllerItemMetadata[1].propertyKey);
    });
    it('"items" metadata use "searchStrategy" argument if exists', function () {
        var controllerItemMetadata = Reflect.getMetadata('Controller:items', TestClass);
        expect(controllerItemMetadata[0].searchStrategy).toBe('siblings');
    });
});
//# sourceMappingURL=item.decorator.spec.js.map