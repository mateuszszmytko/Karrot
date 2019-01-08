import { Controller, Hooks } from '@karrot/core';

import { scrollTo } from '../../utils/scroll-to';

@Controller({
    name: 'scrollTo',
})
export class ScrollToController {
    public scrollTarget: HTMLElement;

    constructor(private element: HTMLElement, public readonly hooks: Hooks) { }

    public kOnInit(): void {
        const targetSelector = this.element.getAttribute('href');

        if (!targetSelector) {
            return;
        }

        const scrollTarget = document.querySelector(targetSelector) as HTMLElement;

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

        await this.hooks.doAction('beforeScroll', this.scrollTarget);
        await scrollTo(this.scrollTarget);
        await this.hooks.doAction('afterScroll', this.scrollTarget);
    }

}
