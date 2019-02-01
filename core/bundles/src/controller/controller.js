"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controller_lifecycle_1 = require("./controller-lifecycle");
var controller_utils_1 = require("../utils/controller-utils");
// tslint:disable-next-line
function Controller(data) {
    // tslint:disable-next-line
    return function (con) {
        Reflect.defineMetadata('Controller:name', data.name, con);
        if (data.selector) {
            Reflect.defineMetadata('Controller:selector', data.selector, con);
        }
        Reflect.defineMetadata('Controller:depedencies', data.depedencies, con);
        Reflect.defineMetadata('Controller:settings', data.settings || [], con);
        if (data.paramTypes) {
            Reflect.defineMetadata('design:paramtypes', data.paramTypes, con);
        }
        // tslint:disable-next-line
        con.prototype.__karrotConstructor = function () {
            this._controllerId = controller_utils_1.ControllerUtils.getControllerId();
            this._controllerElement.setAttribute(this._controllerId, '');
            this._lifecycle = new controller_lifecycle_1.ControllerLifecycle(this);
        };
        // tslint:disable-next-line
        con.prototype.__karrotParse = function (itemsParser) {
            this._lifecycle.execute('kBeforeParse');
            itemsParser.parse(this);
            this._lifecycle.execute('kAfterParse');
        };
        // tslint:disable-next-line
        con.prototype.__karrotInit = function () {
            this._lifecycle.execute('kBeforeInit');
            this._lifecycle.execute('kOnInit');
        };
    };
}
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map