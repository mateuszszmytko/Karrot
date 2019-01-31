"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-any */
function Inject(con) {
    return function (target, propertyKey) {
        Reflect.defineMetadata('design:type', con, target, propertyKey);
    };
}
exports.Inject = Inject;
//# sourceMappingURL=inject.decorator.js.map