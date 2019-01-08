"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-any */
function Item(name, searchStrategy) {
    if (searchStrategy === void 0) { searchStrategy = 'children'; }
    return function (target, propertyKey) {
        var metaElements = Reflect.getMetadata('Controller:items', target.constructor) || [];
        var itemName = name || propertyKey;
        metaElements.push({ propertyKey: propertyKey, name: itemName, searchStrategy: searchStrategy });
        Reflect.defineMetadata('Controller:items', metaElements, target.constructor);
    };
}
exports.Item = Item;
//# sourceMappingURL=item.decorator.js.map