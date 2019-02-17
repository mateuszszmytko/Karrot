import {  Karrot, Hooks, ISettings } from '@karrot/core';

export class ClickToggle {
    public targets: HTMLElement[] = [];

    constructor(public element: HTMLElement, public hooks: Hooks, public settings: ISettings) {
    }

    public async kOnInit(): Promise<void> {

        for (const target of this.settings.targets) {
            const targets = Karrot.getMany(target, HTMLElement);

            if (targets) {
                this.targets.push(...targets);
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
