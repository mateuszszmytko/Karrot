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
var injectable_1 = require("./injectable");
var injector_1 = require("./injector");
/* tslint:disable:no-any */
var STestDepedency = /** @class */ (function () {
    function STestDepedency(message) {
        this.message = message;
        //
    }
    STestDepedency = __decorate([
        injectable_1.Injectable(),
        __metadata("design:paramtypes", [String])
    ], STestDepedency);
    return STestDepedency;
}());
exports.STestDepedency = STestDepedency;
var TestDepedency = /** @class */ (function () {
    function TestDepedency(sTestDepedency) {
        this.sTestDepedency = sTestDepedency;
        this.counter = 0;
        //
    }
    TestDepedency.prototype.onInject = function (_owner) {
        this.counter++;
    };
    TestDepedency = __decorate([
        injectable_1.Injectable(),
        __metadata("design:paramtypes", [STestDepedency])
    ], TestDepedency);
    return TestDepedency;
}());
exports.TestDepedency = TestDepedency;
var TestDepedency2 = /** @class */ (function () {
    function TestDepedency2(testDepedency) {
        this.testDepedency = testDepedency;
        this.counter = 0;
        //
    }
    TestDepedency2.prototype.onInject = function (_owner) {
        this.counter++;
    };
    TestDepedency2 = __decorate([
        injectable_1.Injectable(),
        __metadata("design:paramtypes", [TestDepedency])
    ], TestDepedency2);
    return TestDepedency2;
}());
exports.TestDepedency2 = TestDepedency2;
var TestClass = /** @class */ (function () {
    function TestClass(testDepedency2, testDepedency, sTestDepedency) {
        this.testDepedency2 = testDepedency2;
        this.testDepedency = testDepedency;
        this.sTestDepedency = sTestDepedency;
        //
    }
    TestClass = __decorate([
        injectable_1.Injectable(),
        __metadata("design:paramtypes", [TestDepedency2,
            TestDepedency,
            STestDepedency])
    ], TestClass);
    return TestClass;
}());
exports.TestClass = TestClass;
describe('Injector', function () {
    var injector;
    beforeAll(function () {
        console.log('%c Injector ', 'background: #222; color: #bada55');
        injector = new injector_1.Injector();
        injector.addTransient(TestDepedency);
        injector.addSingleton(TestDepedency2);
        injector.addSingleton(STestDepedency, new STestDepedency('testMessage'));
        var test = injector.resolve(TestClass);
        var test2 = injector.resolve(TestClass);
        console.log(test, test2, injector.depedencies);
    });
    afterAll(function () {
        console.log('%c end of Injector', 'background: #222; color: #bada55');
    });
    it('should contains TestDepedency and TestDepedency2', function () {
        expect(injector.depedencies[1].constructor).toBe(TestDepedency);
        expect(injector.depedencies[2].constructor).toBe(TestDepedency2);
    });
    it('STestDepedency should contains message', function () {
        var stestServive = injector.getDepedency(STestDepedency);
        expect(stestServive).toBeDefined();
        expect(stestServive.message).toBe('testMessage');
    });
    it('TestDepedency should be as argument of TestDepedency2', function () {
        expect(injector.depedencies[2].testDepedency).toBe(injector.depedencies[1]);
    });
    it('transients objects should be different instances', function () {
        var testDepedencys = injector.getDepedencys(TestDepedency);
        expect(testDepedencys.length).toBeGreaterThanOrEqual(2);
        expect(testDepedencys[0]).not.toBe(testDepedencys[1]);
    });
});
//# sourceMappingURL=injector.spec.js.map