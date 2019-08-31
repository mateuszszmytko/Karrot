import { KarrotItem } from "@karrot/core";

export class LazyLoad {
    private img: HTMLImageElement;

    constructor(private item: KarrotItem<HTMLImageElement>) {
    }

    public kOnInit(): void {
        this.img = this.item.element;

        if (this.img.src) {
            console.warn(this.img, 'Image already contains src, skipped');

            return;
        }

        // tslint:disable-next-line:max-line-length
        this.img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsq6mrBwAE8QH5A52ECwAAAABJRU5ErkJggg==';
        this.img.style.height = this.item.settings.height + 'px';
        this.img.style.width = this.item.settings.height + 'px';

        this.observer();
    }

    private observer(): void {
        if (!('IntersectionObserver' in window)) {
            this.loadImage();
            return;
        }

        const options = {
            rootMargin: '100px',
            threshold: 0,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.intersectionRatio > 0) {
                    observer.unobserve(this.img);
                    this.loadImage();
                }
            });
        }, options);

        observer.observe(this.img);
    }

    private loadImage(): void {
        this.img.setAttribute('src', this.item.settings.src);
        this.img.style.height = '';
        this.img.style.width = '';
        const picture = this.img.parentElement;

        if (!picture || picture.nodeName !== "PICTURE") {
            return;
        }

        const sources = Array.from(picture.querySelectorAll('source'));

        for (const source of sources) {
            const src = source.getAttribute('data-srcset');

            if (src) {
                source.setAttribute('srcset', src);
            }
        }

    }
}
