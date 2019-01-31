export declare class STestDepedency {
    message: string;
    constructor(message: string);
}
export declare class TestDepedency {
    sTestDepedency: STestDepedency;
    counter: number;
    constructor(sTestDepedency: STestDepedency);
    onInject(_owner: any): void;
}
export declare class TestDepedency2 {
    testDepedency: TestDepedency;
    counter: number;
    constructor(testDepedency: TestDepedency);
    onInject(_owner: any): void;
}
export declare class TestClass {
    testDepedency2: TestDepedency2;
    testDepedency: TestDepedency;
    sTestDepedency: STestDepedency;
    constructor(testDepedency2: TestDepedency2, testDepedency: TestDepedency, sTestDepedency: STestDepedency);
}
