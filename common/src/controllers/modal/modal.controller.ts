import { Controller, Hooks, Item,  Settings } from '@karrot/core';
import { DOM } from '../../utils';

/* tslint:disable:no-any */

type ModalSettings = {
    positionX: 'middle' | 'left' | 'top';
    positionY: 'middle' | 'top' | 'bottom';
    hashTracking: boolean;
    closeOnConfirm: boolean;
    closeOnCancel: boolean;
    closeOnOutsideClick: boolean;
    modalId: string;
};

enum ModalState {
    DuringOpening,
    DuringClosing,
    Open,
    Closed,
}

@Controller({
    name: 'modal',
    settings: {
        closeOnCancel: true,
        closeOnConfirm: true,
        closeOnOutsideClick: true,
        hashTracking: true,
        positionX: 'middle',
        positionY: 'middle',
    },
})
export class ModalController {
    public links: HTMLElement[];
    public wrapper: HTMLElement;
    public overlay: HTMLElement;

    @Item('confirm')
    public confirms: HTMLElement[];

    @Item('cancel')
    public cancels: HTMLElement[];

    @Item('close')
    public exits: HTMLElement[];

    protected modalState: ModalState;
    protected modalId: string;

    constructor(public modal: HTMLElement,
                protected hooks: Hooks,
                protected settings: Settings<ModalSettings>) {
        this.modalState = ModalState.Closed;
    }

    public kOnInit(): void {
        this.modalState = ModalState.Closed;

        this.build();

        if (this.settings.get('hashTracking') && window.location.hash === '#' + this.modalId) {
            this.openModal();
        }

        this.resolveModalId();
        this.links = Array.from(document.querySelectorAll(`[href="#${this.modalId}"]`));

        for (const link of this.links) {
            link.addEventListener('click', (e) => {
                this.linkClick(e);
            });
        }

        DOM(this.links)
            .event.add('click', (e) => {
                this.linkClick(e);
            });

        DOM(this.overlay, this.exits)
            .event.add('click', (e) => {
                this.overlayClick(e);
            });

        DOM(this.confirms)
            .event.add('click', (e) => {
                this.onConfirm(e);
            });

        DOM(this.cancels)
            .event.add('click', (e) => {
                this.onCancel(e);
            });

    }

    protected build(): void {
        this.modal.classList.add('k-modal');

        const wrapper = document.createElement('div');
        wrapper.classList.add('k-modal__wrapper');

        this.modal.insertAdjacentElement('beforebegin', wrapper);
        wrapper.insertAdjacentElement('afterbegin', this.modal);

        this.wrapper = wrapper;

        const overlay = document.createElement('div');
        overlay.classList.add('k-modal__overlay');

        this.modal.insertAdjacentElement('beforebegin', overlay);

        this.overlay = overlay;

        if (this.settings.get('positionX') !== 'middle') {
            DOM(this.modal, this.wrapper).state.set(this.settings.get('positionX'));
        }

        if (this.settings.get('positionY') !== 'middle') {
            DOM(this.modal, this.wrapper).state.set(this.settings.get('positionY'));
        }

        DOM(this.wrapper).state.set('initialized');
    }

    protected resolveModalId(): void {
        if (this.settings.get('modalId')) {
            this.modalId = this.settings.get('modalId');
        } else if (this.modal.id) {
            this.modalId = this.modal.id;
        } else {
            this.modalId = (this as any)._controllerId;
        }
    }

    protected async openModal(): Promise<void> {
        if (this.modalState !== ModalState.Closed) {
            return;
        }

        DOM(this.wrapper).state.set('dirty');
        this.modalState = ModalState.DuringOpening;

        await this.hooks.doAction('open');

        DOM(this.modal, this.overlay, this.wrapper).state.set('active');
        this.modalState = ModalState.Open;

    }

    protected async closeModal(): Promise<void> {
        if (this.modalState !== ModalState.Open) {
            return;
        }

        await this.hooks.doAction('beforeClosing');

        this.modalState = ModalState.DuringClosing;
        DOM(this.modal, this.overlay, this.wrapper).state.set('active', false);

        this.modalState = ModalState.Closed;
        await this.hooks.doAction('close');
    }

    protected linkClick(e: Event): void {
        e.preventDefault();

        this.openModal();
    }

    protected overlayClick(e: Event): void {
        e.preventDefault();

        if (!this.settings.get('closeOnOutsideClick')) {
            return;
        }

        this.closeModal();
    }

    protected async onConfirm(e: Event): Promise<void> {
        e.preventDefault();

        await this.hooks.doAction('confirm');

        if (!this.settings.get('closeOnConfirm')) {
            return;
        }

        this.closeModal();
    }

    protected async onCancel(e: Event): Promise<void> {
        e.preventDefault();

        await this.hooks.doAction('cancel');

        if (!this.settings.get('closeOnCancel')) {
            return;
        }

        this.closeModal();
    }

}
