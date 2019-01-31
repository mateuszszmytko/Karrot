"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var controller_1 = require("./controller");
/* tslint:disable:no-any */
var TestController = /** @class */ (function () {
    function TestController() {
    }
    TestController = __decorate([
        controller_1.Controller({
            name: 'TestController',
        })
    ], TestController);
    return TestController;
}());
exports.TestController = TestController;
describe('Controller decorator', function () {
    it('controller prototype contains name of controller', function () {
        var controllerNameMetadata = Reflect.getMetadata('Controller:name', TestController);
        expect(controllerNameMetadata).toBe('TestController');
    });
    it('controller instance exists', function () {
        var testController = new TestController();
        expect(testController).toBeDefined();
    });
});
//# sourceMappingURL=controllers.spec.js.map