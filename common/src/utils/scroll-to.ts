type scrollToOptions = {
    easing: string,
    historyPush: boolean,
    offset: number,
    speed: number,
};

const defaultOptions: scrollToOptions = {
    easing: 'easeInOutCubic',
    historyPush: true,
    offset: 0,
    speed: 500,
};

export async function scrollTo(target: HTMLElement | string, options?: scrollToOptions): Promise<void> {
    if (!options) {
        options = defaultOptions;
    }

    if (typeof target === "string") {
        target = document.querySelector(target) as HTMLElement;
    }

    if (!target) {
        return;
    }

    const manager = new ScrollToManager(target, options);
    await manager.onInit();
}

class ScrollToManager {

    public startLocation: number = 0;
    public endLocation: number = 0;

    protected targetHash: string = '';
    constructor(public target: HTMLElement, public options: scrollToOptions) {
        this.targetHash = '#' + this.target.getAttribute('id');

    }
    public async onInit(): Promise<void> {
        if (!this.target) {
            return;
        }

        await this.startAnimateScroll();
    }

    public async startAnimateScroll(): Promise<void> {
        this.parseLocations();

        const distance: number = this.endLocation - this.startLocation;
        let timeLapsed: number = 0;

        await new Promise((r) => {
            const interval = setInterval(() => {

                timeLapsed += 16;
                let percentage = (timeLapsed / this.options.speed);

                percentage = (percentage > 1) ? 1 : percentage;
                const position = Math.floor(this.startLocation + (distance * this.easing(percentage)));
                window.scrollTo(0, position);

                const currentLocation = window.pageYOffset;
                if (currentLocation === this.endLocation
                    || percentage === 1
                    || ((window.innerHeight + currentLocation) >= document.body.scrollHeight)) {

                    this.target.focus();
                    clearInterval(interval);

                    if (this.targetHash && this.targetHash !== '#' &&
                        this.targetHash.indexOf('#') === 0 && this.options.historyPush) {

                        if (document.location && document.location.hash !== this.targetHash) {
                            window.history.pushState('', '', this.targetHash);

                        }
                    }
                    r();
                }
            }, 16);
        });
    }

    private parseLocations(): void {
        this.startLocation = window.pageYOffset;
        this.endLocation = 0;

        let parent = this.target;

        while (parent.offsetParent) {
            this.endLocation += parent.offsetTop;
            parent = parent.offsetParent as HTMLElement;
        }

        this.endLocation -= this.options.offset;

    }

    private easing(time: number): number {
        let pattern = 1;

        switch (this.options.easing) {
            case 'easeInQuad':
                pattern = time * time;
                break;
            case 'easeOutQuad':
                pattern = time * (2 - time);
                break;
            case 'easeInOutQuad':
                pattern = pattern = time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time;
                break;
            case 'easeInCubic':
                pattern = time * time * time;
                break;
            case 'easeOutCubic':
                pattern = (--time) * time * time + 1;
                break;
            case 'easeInOutCubic':
                pattern = time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1;
                break;
            case 'easeInQuart':
                pattern = time * time * time * time;
                break;
            case 'easeOutQuart':
                pattern = 1 - (--time) * time * time * time;
                break;
            case 'easeInOutQuart':
                pattern = time < 0.5 ? 8 * time * time * time * time : 1 - 8 * (--time) * time * time * time;
                break;
            case 'easeInQuint':
                pattern = time * time * time * time * time;
                break;
            case 'easeOutQuint':
                pattern = 1 + (--time) * time * time * time * time;
                break;
            case 'easeInOutQuint':
                pattern = time < 0.5 ? 16 * time * time * time * time * time :
                            1 + 16 * (--time) * time * time * time * time;
                break;
        }

        return pattern;
    }
}
