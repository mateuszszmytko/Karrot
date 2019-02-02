import { Karrot } from "./karrot";

import { Controller } from "./controller/controller";
import { Injectable } from "./di/injectable";
import { Item } from "./metadata/item.decorator";

// import { ControllerSettings } from "./controller/controller-settings";

/* tslint:disable:no-any */

@Injectable()
class TestDependency {
    constructor() {
        //
    }
}

@Injectable()
class TestLocalDependency {
    constructor() {
        //
    }
}

@Controller({
    dependencies: [TestLocalDependency],
    name: 'form',
})
class FormController {
    public element: HTMLFormElement;

    @Item()
    public inputs: HTMLButtonElement[];

    constructor(public testDependency: TestDependency, _testLocalDependency: TestLocalDependency) {
    }

    public onInit(): void {
        // this._eventEmmiter.emit('open', {asd: 'dsa'});
    }

}

@Controller({
    dependencies: [TestLocalDependency],
    name: 'myApp',
})
class AppController {
    @Item()
    public submit: HTMLButtonElement;

    @Item('my-form')
    public asdForm: FormController;

    constructor(public testDependency: TestDependency,
                testLocalDependency: TestLocalDependency,
                public element: HTMLElement) {
        console.log(testLocalDependency);
    }

    public onInit(): void {
        console.log('element', this.element);
        console.log('submit', this.submit);
        console.log('form', this.asdForm);

        console.log(this);
    }
}

describe('Karrot main object', () => {

    beforeAll(() => {

        console.log('%c Karrot ', 'background: #222; color: #bada55');

        const fixture = `
        <main k-name="myApp" id="fixture">
            <div class="container">
                <div>
                    <form k-name="form; formAjax" novalidate>
                        First name:
                        <input k-name="inputs" type="text" name="firstname" required minlength="6">
                        Last name:
                        <input k-name="inputs" type="text" name="lastname" required>
                        <input k-name="submit" type="submit" value="Submit">
                        <div k-name="inputs">
                            <input type="text" name="lastname" required>
                        </div>
                    </form>
                </div>
                <div k-name="myModal">
                    lorem ipsum dolor sit amet
                    <a href="#" k-name="exit">Exit</a>
                </div>
            </div>
        </main>
        `;

        document.body.insertAdjacentHTML('beforeend', fixture);

        Karrot({
            controllers: [FormController, AppController],
            dependencies: [TestDependency],
        });
    });

    afterAll(() => {
        document.body.removeChild(document.getElementById('fixture') as HTMLElement);

        console.log('%c end of Karrot', 'background: #222; color: #bada55');
    });

    it('should exists', () => {
        expect(true).toBe(true);
    });

});
