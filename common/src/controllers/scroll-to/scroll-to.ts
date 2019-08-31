import { KarrotItem } from '@karrot/core';
import { scrollTo, TScrollToSettings } from '../../utils/scroll-to';

export class ScrollTo {
    public static defaultSettings: TScrollToSettings = {
        easing: 'easeInOutCubic',
        historyPush: true,
        offset: 0,
        speed: 500,
    };

    public scrollTarget: HTMLElement;
    constructor(public item: KarrotItem) {
        item.appendSettings(ScrollTo.defaultSettings);
    }

    public async kOnInit(): Promise<void> {
        const targetSelector = this.item.element.getAttribute('href');

        if (!targetSelector || targetSelector === '#') {
            console.warn('Href attribute is empty or is not valid: ' + targetSelector, this.item.element);
            return;
        }

        let scrollTarget = document.querySelector(targetSelector) as HTMLElement;
        scrollTarget = await this.item.hooks.applyFilter(scrollTarget, 'scrollTo.target');

        if (scrollTarget) {
            this.scrollTarget = scrollTarget;
        } else {
            console.warn('Cannot find element with selector: ' + targetSelector);
        }

        this.item.element.addEventListener('click', (e) => {
            this.onClick(e);
        });
    }

    protected async onClick(e: Event): Promise<void> {
        e.preventDefault();

        if (!this.scrollTarget) {
            return;
        }

        await this.item.hooks.doAction('scrollTo.before', this.scrollTarget);
        await scrollTo(this.scrollTarget, this.item.settings as TScrollToSettings);
        await this.item.hooks.doAction('scrollTo.after', this.scrollTarget);
    }

}
