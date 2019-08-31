import { Karrot } from "./karrot";
import { KarrotItem } from "./karrot-item";

class TestController {
    constructor(private item: KarrotItem) {
        console.log('test controller constructor');
    }
    //
    public kOnInit(): void {
        console.log('test controller');

        setTimeout(() => {
            this.item.hooks.doAction('test.init', this.item.element);
        }, 200);
    }
}

class AppController {
    //
    public test = Karrot.get('my-p');

    constructor(element: HTMLElement) {

        console.log('app controller constructor');
    }

    public kOnInit(): void {
        console.log('app controller with test controller: ', this.test);
        if (this.test) {
            this.test.hooks.addAction('test.init', () => {
                console.log('test initialized');
            });

            this.test.hooks.addAction('test.init', () => {
                console.log('test initialized0');
            }, 99);
        }
    }
}

fdescribe('Karrot class', () => {
    beforeAll(() => {
        console.log('%c Karrot ', 'background: #222; color: #bada55');

        const fixture = `
        <main k-item="my-app" id="fixture">
            <p k-item="my-p">hello world</p>
            <input k-item="my-i" type="text">
        </main>
        `;

        document.body.insertAdjacentHTML('beforeend', fixture);

    });

    afterAll(() => {
        document.body.removeChild(document.getElementById('fixture') as HTMLElement);

        console.log('%c end of Karrot', 'background: #222; color: #bada55');
    });

    it('should exists', () => {
        expect(Karrot).toBeDefined();
    });

    it('should contains static methods: get, getMany, attach, init', () => {
        expect(Karrot.getMany).toBeDefined();
        expect(Karrot.get).toBeDefined();
        expect(Karrot.attach).toBeDefined();

    });

    it('get method should returns what have in argument', () => {
        Karrot.attach('my-i', TestController);
        Karrot.attach('my-app', AppController);

        const a = Karrot.get('my-i', TestController) as TestController;
        const aElement = Karrot.get('my-i', HTMLElement) as HTMLElement;
        console.log(a, aElement, TestController);
        const _a = Karrot.get(aElement, TestController) as TestController;

        console.log(a, _a, 'a');
        expect(a.constructor).toBe(TestController);
        expect(a).toBe(_a);
        expect(aElement.constructor).toBe(HTMLInputElement);
    });
});
