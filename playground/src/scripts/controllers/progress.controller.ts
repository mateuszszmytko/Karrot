import { Controller } from '@karrot/core';

@Controller({
    name: 'progress-bar',
})
export class ProgressController {

    constructor(private element: HTMLElement) { }

    public async kOnInit(): Promise<void> {
        if (!this.element) {
            return;
        }

        window.addEventListener('scroll', () => {
            const currentHeight = window.scrollY;
            const maxHeight = document.body.offsetHeight - window.innerHeight;
            const progress = Math.min(Math.ceil(currentHeight / maxHeight * 100), 100);

            this.element.style.maxWidth = progress.toString() + '%';
        }, { passive: true });
    }
}
