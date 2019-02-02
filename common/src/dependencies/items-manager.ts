import { ControllersStorage, IConstructorAny, Injectable } from '@karrot/core';

@Injectable()
export class ItemsManager {
    constructor(private controllersStorage: ControllersStorage) {
        //

        console.log(controllersStorage);
    }

    public getControllers<T>(name: string, type: { new (...args: Array<unknown>): T }): T[] {
        const elements = this.getElements(name);

        const controllersByName = this.controllersStorage.controllers.filter(c => {

                return elements.indexOf(c._controllerElement) >= 0 && c.constructor === type;
        }) as unknown;

        return controllersByName as T[] || [];
    }

    public getController<T>(name: string, type: { new (...args: Array<unknown>): T }): T | undefined {
        return this.getControllers<T>(name, type)[0] || undefined;
    }

    public getElement(name: string, context: HTMLElement = document.body): HTMLElement | undefined {
        return this.getElements(name, context)[0] || undefined;
    }

    public getElements(name: string, context: HTMLElement = document.body): HTMLElement[] {
        const elements: HTMLElement[] = Array.from(context.querySelectorAll('[k-name]'));
        const itemsElements: HTMLElement[] = [];

        for (const element of elements) {
            const kNameValue = element.getAttribute('k-name') as string;
            const kNames = kNameValue.replace(/\s+/g, '').split(';');

            for (const kName of kNames) {
                if (kName === name) {
                    itemsElements.push(element as HTMLElement);
                }
            }
        }

        return itemsElements;
    }
}
