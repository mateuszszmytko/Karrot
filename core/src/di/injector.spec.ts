import { Injectable } from "./injectable";
import { Injector } from "./injector";

/* tslint:disable:no-any */

@Injectable()
export class STestDependency {
    constructor(public message: string) {
        //
    }
}

@Injectable()
export class TestDependency {
    public counter: number = 0;
    constructor(public sTestDependency: STestDependency) {
        //
    }

    public onInject(_owner: any): void {
        this.counter ++;
    }
}

@Injectable()
export class TestDependency2 {
    public counter: number = 0;
    constructor(public testDependency: TestDependency) {
        //
    }

    public onInject(_owner: any): void {
        this.counter ++;
    }
}

@Injectable()
export class TestClass {
    constructor(public testDependency2: TestDependency2,
                public testDependency: TestDependency,
                public sTestDependency: STestDependency) {
        //
    }
}

describe('Injector', () => {
    let injector: Injector;
    beforeAll(() => {
        console.log('%c Injector ', 'background: #222; color: #bada55');

        injector = new Injector();
        injector.addTransient(TestDependency);
        injector.addSingleton(TestDependency2);
        injector.addSingleton(STestDependency, new STestDependency('testMessage'));

        const test = injector.resolve(TestClass);
        const test2 = injector.resolve(TestClass);
        console.log(test, test2, injector.dependencies);
    });

    afterAll(() => {
        console.log('%c end of Injector', 'background: #222; color: #bada55');
    });

    it('should contains TestDependency and TestDependency2', () => {
        expect(injector.dependencies[1].constructor).toBe(TestDependency);
        expect(injector.dependencies[2].constructor).toBe(TestDependency2);
    });

    it('STestDependency should contains message', () => {
        const stestServive: STestDependency = injector.getDependency(STestDependency) as STestDependency;

        expect(stestServive).toBeDefined();
        expect(stestServive.message).toBe('testMessage');
    });

    it('TestDependency should be as argument of TestDependency2', () => {
        expect(injector.dependencies[2].testDependency).toBe(injector.dependencies[1]);
    });

    it('transients objects should be different instances', () => {
        const testDependencys = injector.getDependencys(TestDependency);

        expect(testDependencys.length).toBeGreaterThanOrEqual(2);
        expect(testDependencys[0]).not.toBe(testDependencys[1]);
    });
});
