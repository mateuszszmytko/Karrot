"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-any */
function Item(name, capsule) {
    if (capsule === void 0) { capsule = { searchStrategy: 'children' }; }
    return function (target, propertyKey) {
        var metaElements = Reflect.getMetadata('Controller:items', target.constructor) || [];
        var itemName = name || propertyKey;
        if (typeof capsule === 'string') {
            capsule = { searchStrategy: capsule };
        }
        else {
            if (!capsule.searchStrategy) {
                capsule.searchStrategy = 'children';
            }
        }
        metaElements.push({ propertyKey: propertyKey, name: itemName, capsule: capsule });
        Reflect.defineMetadata('Controller:items', metaElements, target.constructor);
    };
}
exports.Item = Item;
//# sourceMappingURL=item.decorator.js.map