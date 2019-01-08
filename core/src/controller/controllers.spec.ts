import { Controller } from './controller';
/* tslint:disable:no-any */
@Controller({
    name: 'TestController',
})
export class TestController {
    public button: HTMLElement;
}

describe('Controller decorator', () => {
	it('controller prototype contains name of controller', () => {
        const controllerNameMetadata = Reflect.getMetadata('Controller:name', TestController);

        expect(controllerNameMetadata).toBe('TestController');
    });

    it('controller instance exists', () => {
        const testController = new TestController();

        expect(testController).toBeDefined();
    });
});
