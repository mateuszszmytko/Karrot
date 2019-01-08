import { TSearchStrategy } from "../interfaces/item.interface";

/* tslint:disable:no-any */

export function Item(name?: string, searchStrategy: TSearchStrategy = 'children'): any {
    return (target: any, propertyKey: string) => {
        const metaElements = Reflect.getMetadata('Controller:items', target.constructor) || [];
        const itemName = name || propertyKey;

        metaElements.push({propertyKey, name: itemName, searchStrategy});
        Reflect.defineMetadata('Controller:items', metaElements, target.constructor  );
    };
}
