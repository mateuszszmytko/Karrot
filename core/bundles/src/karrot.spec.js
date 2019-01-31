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
var karrot_1 = require("./karrot");
var controller_1 = require("./controller/controller");
var injectable_1 = require("./di/injectable");
var item_decorator_1 = require("./metadata/item.decorator");
// import { ControllerSettings } from "./controller/controller-settings";
/* tslint:disable:no-any */
var TestDepedency = /** @class */ (function () {
    function TestDepedency() {
        //
    }
    TestDepedency = __decorate([
        injectable_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], TestDepedency);
    return TestDepedency;
}());
var TestLocalDepedency = /** @class */ (function () {
    function TestLocalDepedency() {
        //
    }
    TestLocalDepedency = __decorate([
        injectable_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], TestLocalDepedency);
    return TestLocalDepedency;
}());
var FormController = /** @class */ (function () {
    function FormController(testDepedency, _testLocalDepedency) {
        this.testDepedency = testDepedency;
    }
    FormController.prototype.onInit = function () {
        // this._eventEmmiter.emit('open', {asd: 'dsa'});
    };
    __decorate([
        item_decorator_1.Item(),
        __metadata("design:type", Array)
    ], FormController.prototype, "inputs", void 0);
    FormController = __decorate([
        controller_1.Controller({
            depedencies: [TestLocalDepedency],
            name: 'form',
        }),
        __metadata("design:paramtypes", [TestDepedency, TestLocalDepedency])
    ], FormController);
    return FormController;
}());
var AppController = /** @class */ (function () {
    function AppController(testDepedency, testLocalDepedency, element) {
        this.testDepedency = testDepedency;
        this.element = element;
        console.log(testLocalDepedency);
    }
    AppController.prototype.onInit = function () {
        console.log('element', this.element);
        console.log('submit', this.submit);
        console.log('form', this.asdForm);
        console.log(this);
    };
    __decorate([
        item_decorator_1.Item(),
        __metadata("design:type", HTMLButtonElement)
    ], AppController.prototype, "submit", void 0);
    __decorate([
        item_decorator_1.Item('my-form'),
        __metadata("design:type", FormController)
    ], AppController.prototype, "asdForm", void 0);
    AppController = __decorate([
        controller_1.Controller({
            depedencies: [TestLocalDepedency],
            name: 'myApp',
        }),
        __metadata("design:paramtypes", [TestDepedency,
            TestLocalDepedency,
            HTMLElement])
    ], AppController);
    return AppController;
}());
describe('Karrot main object', function () {
    beforeAll(function () {
        console.log('%c Karrot ', 'background: #222; color: #bada55');
        var fixture = "\n        <main k-name=\"myApp\" id=\"fixture\">\n            <div class=\"container\">\n                <div>\n                    <form k-name=\"form; formAjax\" novalidate>\n                        First name:\n                        <input k-name=\"inputs\" type=\"text\" name=\"firstname\" required minlength=\"6\">\n                        Last name:\n                        <input k-name=\"inputs\" type=\"text\" name=\"lastname\" required>\n                        <input k-name=\"submit\" type=\"submit\" value=\"Submit\">\n                        <div k-name=\"inputs\">\n                            <input type=\"text\" name=\"lastname\" required>\n                        </div>\n                    </form>\n                </div>\n                <div k-name=\"myModal\">\n                    lorem ipsum dolor sit amet\n                    <a href=\"#\" k-name=\"exit\">Exit</a>\n                </div>\n            </div>\n        </main>\n        ";
        document.body.insertAdjacentHTML('beforeend', fixture);
        karrot_1.Karrot({
            controllers: [FormController, AppController],
            depedencies: [TestDepedency],
        });
    });
    afterAll(function () {
        document.body.removeChild(document.getElementById('fixture'));
        console.log('%c end of Karrot', 'background: #222; color: #bada55');
    });
    it('should exists', function () {
        expect(true).toBe(true);
    });
});
//# sourceMappingURL=karrot.spec.js.map