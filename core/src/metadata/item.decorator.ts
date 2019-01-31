import { TItemCapsule, TSearchStrategy } from "../interfaces/item.interface";

/* tslint:disable:no-any */

export function Item(name?: string,
    capsule: TSearchStrategy |  TItemCapsule = { searchStrategy: 'children' }): any {
    return (target: any, propertyKey: string) => {
        const metaElements = Reflect.getMetadata('Controller:items', target.constructor) || [];
        const itemName = name || propertyKey;

        if (typeof capsule === 'string') {
            capsule = { searchStrategy: capsule };
        } else {
            if (!capsule.searchStrategy) {
                capsule.searchStrategy = 'children';
            }
        }

        metaElements.push({propertyKey, name: itemName, capsule});
        Reflect.defineMetadata('Controller:items', metaElements, target.constructor  );
    };
}
