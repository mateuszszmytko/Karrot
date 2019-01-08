import { Item } from './item.decorator';

/* tslint:disable:no-any */

export class TestClass {
    @Item('myTestElement', 'siblings')
    public testElement: HTMLElement;

    @Item()
    public testElement2: HTMLElement;
}

describe('Item decorator', () => {
    beforeAll(() => {
        console.log('%c Item decorator ', 'background: #222; color: #bada55');
    });

    afterAll(() => {
        console.log('%c end of Item decorator', 'background: #222; color: #bada55');
    });

	it('"items" metadata is defined', () => {
        const controllerItemMetadata = Reflect.getMetadata('Controller:items', TestClass);
        expect(controllerItemMetadata).toBeTruthy();
    });

    it('"items" metadata is an array', () => {
        const controllerItemMetadata = Reflect.getMetadata('Controller:items', TestClass) as any[];
        expect(Array.isArray(controllerItemMetadata)).toBeTruthy();
    });

    it('"items" metadata first object contains "propertyKey", "name" and "searchStrategy"', () => {
        const controllerItemMetadata = Reflect.getMetadata('Controller:items', TestClass);
        expect(controllerItemMetadata[0].propertyKey).toBeDefined();
        expect(controllerItemMetadata[0].name).toBeDefined();
        expect(controllerItemMetadata[0].searchStrategy).toBeDefined();
    });

    it('"items" metadata use "name" argument if exists', () => {
        const controllerItemMetadata = Reflect.getMetadata('Controller:items', TestClass);
        expect(controllerItemMetadata[0].name).not.toBe(controllerItemMetadata[0].propertyKey);
    });

    it('"items" metadata use "propertyKey" as "name" if exists', () => {
        const controllerItemMetadata = Reflect.getMetadata('Controller:items', TestClass);
        expect(controllerItemMetadata[1].name).toBe(controllerItemMetadata[1].propertyKey);
    });

    it('"items" metadata use "searchStrategy" argument if exists', () => {
        const controllerItemMetadata = Reflect.getMetadata('Controller:items', TestClass);
        expect(controllerItemMetadata[0].searchStrategy).toBe('siblings');
    });

});
