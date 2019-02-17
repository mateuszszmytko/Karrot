import { KarrotController } from "./controller";
import { ISettings } from "../interfaces";
import { Karrot } from "../karrot";
import { Hooks } from "./hooks";

interface ITestSettings extends ISettings {
    a: string;
}

class TestController {

    constructor(public element: HTMLElement, public hooks: Hooks, public settings: ISettings) {
        this.settings.dsa = 'asd';

        console.log('test controller constructor', this.settings);
    }
    //
    public kOnInit(): void {
        console.log('test controller', this.settings);

        this.hooks.doAction('init', this.element);
    }
}

describe('Controller class', () => {
    beforeAll(() => {
        console.log('%c Controller ', 'background: #222; color: #bada55');

        const fixture = `
        <main id="fixture">
            <p k-item="my-p" id="item"
                data-my-string="simple-string"
                data-my-number="7"
                data-my-boolean="true"
                data-my-array="array-item1; array-item2"
                data-my-object="a: 7; c: true">hello world</p>
        </main>
        `;

        document.body.insertAdjacentHTML('beforeend', fixture);
        Karrot.init();
        Karrot.attach('my-p', TestController);

    });

    afterAll(() => {
        document.body.removeChild(document.getElementById('fixture') as HTMLElement);

        console.log('%c end of Controller', 'background: #222; color: #bada55');
    });

    it('should exists', () => {
        expect(KarrotController).toBeDefined();
        const testController = Karrot.get('my-p');

        expect(testController).toBeDefined();

        console.log(testController, 'dsa');
    });

    it('settings should take data from element datasrc', () => {
        const testController = Karrot.get('my-p', TestController) as TestController;
        console.log(testController);
        const settings = testController.settings;

        expect(settings.myString).toBe('simple-string');
        expect(settings.myNumber).toBe(7);
        expect(settings.myBoolean).toBe(true);
        expect(settings.myArray).toEqual(['array-item1', 'array-item2']);
        expect(settings.myObject).toEqual({a: 7, c: true});

    });

});
