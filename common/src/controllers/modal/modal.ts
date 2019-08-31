import { Hooks, ISettings, Karrot, KarrotItem } from '@karrot/core';
import { DOM } from '../../utils';

/* tslint:disable:no-any */

type ModalSettings = {
    positionX: 'middle' | 'left' | 'top';
    positionY: 'middle' | 'top' | 'bottom';
    hashTracking: boolean;
    closeOnConfirm: boolean;
    closeOnCancel: boolean;
    closeOnOutsideClick: boolean;
    modalId?: string;
};

enum ModalState {
    DuringOpening,
    DuringClosing,
    Open,
    Closed,
}

export class Modal {
    public defaultSettings: ModalSettings =  {
        closeOnCancel: true,
        closeOnConfirm: true,
        closeOnOutsideClick: true,
        hashTracking: true,
        positionX: 'middle',
        positionY: 'middle',
    };

    public settings: ISettings = {};
    public element: HTMLElement;
    public hooks: Hooks;

    public links: HTMLElement[];
    public wrapper: HTMLElement;
    public overlay: HTMLElement;

    public confirms: HTMLElement[] = Karrot.getMany('confirm', HTMLElement, this.element);
    public cancels: HTMLElement[] = Karrot.getMany('cancel', HTMLElement, this.element);
    public exits: HTMLElement[] = Karrot.getMany('close', HTMLElement, this.element);

    protected modalState: ModalState;
    protected modalId: string;

    constructor(item: KarrotItem) {
        this.modalState = ModalState.Closed;
        this.settings = item.appendSettings(this.defaultSettings);
        this.element = item.element;
        this.hooks = item.hooks;

    }

    public kOnInit(): void {
        this.modalState = ModalState.Closed;

        this.build();

        if (this.settings.hashTracking && window.location.hash === '#' + this.modalId) {
            this.openModal();
        }

        this.resolveModalId();
        this.links = Array.from(document.querySelectorAll(`[href="#${this.modalId}"]`));

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
        this.element.classList.add('k-modal');

        const wrapper = document.createElement('div');
        wrapper.classList.add('k-modal__wrapper');

        this.element.insertAdjacentElement('beforebegin', wrapper);
        wrapper.insertAdjacentElement('afterbegin', this.element);

        this.wrapper = wrapper;

        const overlay = document.createElement('div');
        overlay.classList.add('k-modal__overlay');

        this.element.insertAdjacentElement('beforebegin', overlay);

        this.overlay = overlay;

        if (this.settings.positionX !== 'middle') {
            DOM(this.element, this.wrapper).state.set(this.settings.positionX);
        }

        if (this.settings.positionY !== 'middle') {
            DOM(this.element, this.wrapper).state.set(this.settings.positionY);
        }

        DOM(this.wrapper).state.set('initialized');
    }

    protected resolveModalId(): void {
        if (this.settings.modalId) {
            this.modalId = this.settings.modalId;
        } else if (this.element.id) {
            this.modalId = this.element.id;
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

        await this.hooks.doAction('modal.open');

        DOM(this.element, this.overlay, this.wrapper).state.set('active');
        this.modalState = ModalState.Open;

    }

    protected async closeModal(): Promise<void> {
        if (this.modalState !== ModalState.Open) {
            return;
        }

        await this.hooks.doAction('modal.beforeClosing');

        this.modalState = ModalState.DuringClosing;
        DOM(this.element, this.overlay, this.wrapper).state.set('active', false);

        this.modalState = ModalState.Closed;
        await this.hooks.doAction('modal.close');
    }

    protected linkClick(e: Event): void {
        e.preventDefault();

        this.openModal();
    }

    protected overlayClick(e: Event): void {
        e.preventDefault();

        if (!this.settings.closeOnOutsideClick) {
            return;
        }

        this.closeModal();
    }

    protected async onConfirm(e: Event): Promise<void> {
        e.preventDefault();

        await this.hooks.doAction('modal.confirm');

        if (!this.settings.closeOnConfirm) {
            return;
        }

        this.closeModal();
    }

    protected async onCancel(e: Event): Promise<void> {
        e.preventDefault();

        await this.hooks.doAction('modal.cancel');

        if (!this.settings.closeOnCancel) {
            return;
        }

        this.closeModal();
    }

}
