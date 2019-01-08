import { Injectable } from "./injectable";
import { Injector } from "./injector";

/* tslint:disable:no-any */

@Injectable()
export class STestDepedency {
    constructor(public message: string) {
        //
    }
}

@Injectable()
export class TestDepedency {
    public counter: number = 0;
    constructor(public sTestDepedency: STestDepedency) {
        //
    }

    public onInject(_owner: any): void {
        this.counter ++;
    }
}

@Injectable()
export class TestDepedency2 {
    public counter: number = 0;
    constructor(public testDepedency: TestDepedency) {
        //
    }

    public onInject(_owner: any): void {
        this.counter ++;
    }
}

@Injectable()
export class TestClass {
    constructor(public testDepedency2: TestDepedency2,
                public testDepedency: TestDepedency,
                public sTestDepedency: STestDepedency) {
        //
    }
}

describe('Injector', () => {
    let injector: Injector;
    beforeAll(() => {
        console.log('%c Injector ', 'background: #222; color: #bada55');

        injector = new Injector();
        injector.addTransient(TestDepedency);
        injector.addSingleton(TestDepedency2);
        injector.addSingleton(STestDepedency, new STestDepedency('testMessage'));

        const test = injector.resolve(TestClass);
        const test2 = injector.resolve(TestClass);
        console.log(test, test2, injector.depedencies);
    });

    afterAll(() => {
        console.log('%c end of Injector', 'background: #222; color: #bada55');
    });

    it('should contains TestDepedency and TestDepedency2', () => {
        expect(injector.depedencies[1].constructor).toBe(TestDepedency);
        expect(injector.depedencies[2].constructor).toBe(TestDepedency2);
    });

    it('STestDepedency should contains message', () => {
        const stestServive: STestDepedency = injector.getDepedency(STestDepedency) as STestDepedency;

        expect(stestServive).toBeDefined();
        expect(stestServive.message).toBe('testMessage');
    });

    it('TestDepedency should be as argument of TestDepedency2', () => {
        expect(injector.depedencies[2].testDepedency).toBe(injector.depedencies[1]);
    });

    it('transients objects should be different instances', () => {
        const testDepedencys = injector.getDepedencys(TestDepedency);

        expect(testDepedencys.length).toBeGreaterThanOrEqual(2);
        expect(testDepedencys[0]).not.toBe(testDepedencys[1]);
    });
});
