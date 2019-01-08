import { Controller, Hooks, Item } from '@karrot/core';

@Controller({
    name: 'test',
})
export class TestController {

    public message: string = 'lorem ipsum';

    constructor(private element: HTMLElement, public hooks: Hooks) {
    }

    public async kOnInit(): Promise<void> {

        this.element.addEventListener('click', async () => {
            console.log('e');

            console.log(this.message);
            this.hooks.doAction('testAction');
            this.message = await this.hooks.applyFilter(this.message, 'message');

            console.log(this.message);
        });
    }

}
