export function DOM(...elements: Array<HTMLElement | HTMLElement[]>): DOMManager {
    return new DOMManager(elements);
}

type TDOMClass<T> = {
    add: (...classNames: string[]) => T;
    remove: (...classNames: string[]) => T;
    toggle: (...classNames: string[]) => T;
    contains: (...classNames: string[]) => boolean;
};

type TDOMState<T> = {
    set: (state: string, value?: boolean) => T;
    toggle: (state: string) => T;
    is: (state: string) => boolean;
};

type TDOMAttribute<T> = {
    set: (attr: string, value?: string) => T;
    get: (attr: string) => string;
    has: (attr: string) => boolean;
};

type TDOMEvent<T> = {
    add: <K extends keyof HTMLElementEventMap>
        (event: K, listener: (ev: HTMLElementEventMap[K], element: HTMLElement) => void) => T;
};

class DOMManager {
    private _elements: HTMLElement[];
    private _class: TDOMClass<DOMManager> = {
        add: (...classNames: string[]) => {
            for (const element of this._elements) {
                    element.classList.add(...classNames);
            }

            return this;
        },
        remove: (...classNames: string[]) => {
            for (const element of this._elements) {
                    element.classList.remove(...classNames);
            }

            return this;
        },
        toggle: (...classNames: string[]) => {
            for (const element of this._elements) {
                for (const className of classNames) {
                    element.classList.toggle(className);
                }
            }

            return this;
        },
        contains: (...classNames: string[]) => {
            for (const element of this._elements) {
                for (const className of classNames) {
                    if (!element.classList.contains(className)) {
                        return false;
                    }
                }
            }

            return true;
        },

    };

    private _state: TDOMState<this> = {
        set: (state: string, value: boolean = true) => {
            for (const element of this._elements) {
                value ? element.classList.add('is-' + state) : element.classList.remove('is-' + state);
            }

            return this;
        },
        toggle: (state: string) => {
            this._state.set(state, !this._state.is(state));

            return this;
        },
        is: (state: string) => {
            for (const element of this._elements) {
                if (!element.classList.contains('is-' + state)) {
                    return false;
                }
            }

            return true;
        },

    };

    private _attribute: TDOMAttribute<this> = {
        set: (attr: string, value?: string) => {
            for (const element of this._elements) {
                element.setAttribute(attr, value || '');
            }

            return this;
        },
        get: (attr: string) => {
            return this._elements[0] ? this._elements[0].getAttribute(attr) || '' : '';
        },
        has: (attr: string) => {
            for (const element of this._elements) {
                if (!element.hasAttribute(attr)) {
                    return false;
                }
            }

            return true;
        },

    };

    private _event: TDOMEvent<this> = {
        add: <K extends keyof HTMLElementEventMap>
            (event: K, listener: (ev: HTMLElementEventMap[K], element: HTMLElement) => void) => {
            for (const element of this._elements) {
                element.addEventListener(event, (e) => {
                    listener(e, element);
                });
            }

            return this;
        },
    };

    public get class(): TDOMClass<DOMManager> {
        return this._class;
    }

    public get state(): TDOMState<DOMManager> {
        return this._state;
    }

    public get event(): TDOMEvent<DOMManager> {
        return this._event;
    }

    public get attribute(): TDOMAttribute<DOMManager> {
        return this._attribute;
    }

    constructor(elements: Array<HTMLElement | HTMLElement[]> ) {
        this._elements = [];
        for (const element of elements) {
            if (!element) {
                continue;
            }

            if (Array.isArray(element)) {
                this._elements = this._elements.concat(element);
            } else {
                this._elements.push(element);
            }
        }
    }

}
