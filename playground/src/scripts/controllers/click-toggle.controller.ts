import { Controller, Hooks, Settings } from '@karrot/core';

import { ItemsManager } from '@karrot/common';

@Controller({
    name: 'click-toggle',
})
export class ClickToggleController {
    public targets: HTMLElement[] = [];

    constructor(private element: HTMLElement,
                public hooks: Hooks, public settings: Settings, private itemsManager: ItemsManager) {
    }

    public async kOnInit(): Promise<void> {

        for (const target of this.settings.get('targets')) {
            const targetEl = this.itemsManager.getElement(target);

            if (targetEl) {
                this.targets.push(targetEl);
            }
        }

        this.targets.push(this.element);

        this.element.addEventListener('click', () => {
            for (const target of this.targets) {
                target.classList.toggle('is-active');
                this.hooks.doAction('classToggle', target);
            }
        });
    }

}
