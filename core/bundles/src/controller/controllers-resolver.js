"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ControllersResolver = /** @class */ (function () {
    function ControllersResolver(args) {
        this._controllersStorage = args.controllersStorage;
        this._controllersFactory = args.controllersFactory;
        this._itemsParser = args.itemsParser;
    }
    ControllersResolver.prototype.onInit = function () {
        this.createControllers();
        this.initializeControllers();
    };
    ControllersResolver.prototype.createControllers = function () {
        for (var _i = 0, _a = this._controllersStorage.controllersConstructors; _i < _a.length; _i++) {
            var controllerConstructor = _a[_i];
            var controllers = this._controllersFactory.create(controllerConstructor);
            for (var _b = 0, controllers_1 = controllers; _b < controllers_1.length; _b++) {
                var controller = controllers_1[_b];
                this._controllersStorage.controllers.push(controller);
            }
        }
    };
    ControllersResolver.prototype.initializeControllers = function () {
        for (var _i = 0, _a = this._controllersStorage.controllers; _i < _a.length; _i++) {
            var controller = _a[_i];
            controller.__karrotConstructor();
        }
        for (var _b = 0, _c = this._controllersStorage.controllers; _b < _c.length; _b++) {
            var controller = _c[_b];
            controller.__karrotParse(this._itemsParser);
        }
        for (var _d = 0, _e = this._controllersStorage.controllers; _d < _e.length; _d++) {
            var controller = _e[_d];
            controller.__karrotInit();
        }
    };
    return ControllersResolver;
}());
exports.ControllersResolver = ControllersResolver;
//# sourceMappingURL=controllers-resolver.js.map