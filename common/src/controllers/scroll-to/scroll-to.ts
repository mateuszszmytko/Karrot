import { Hooks } from '@karrot/core';

import { scrollTo } from '../../utils/scroll-to';

export class ScrollTo {
    public scrollTarget: HTMLElement;

    constructor(public element: HTMLElement, public hooks: Hooks) {
    }

    public async kOnInit(): Promise<void> {
        const targetSelector = this.element.getAttribute('href');

        if (!targetSelector) {
            return;
        }

        let scrollTarget = document.querySelector(targetSelector) as HTMLElement;

        scrollTarget = await this.hooks.applyFilter(scrollTarget, 'scrollTo.target');

        if (scrollTarget) {
            this.scrollTarget = scrollTarget;
        }

        this.element.addEventListener('click', (e) => {
            this.onClick(e);
        });
    }

    protected async onClick(e: Event): Promise<void> {
        e.preventDefault();

        if (!this.scrollTarget) {
            return;
        }

        await this.hooks.doAction('scrollTo.before', this.scrollTarget);
        await scrollTo(this.scrollTarget);
        await this.hooks.doAction('scrollTo.after', this.scrollTarget);
    }

}
