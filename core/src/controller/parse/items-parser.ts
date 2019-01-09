import { IControllerDev } from "../../interfaces";
import { TItem } from "../../interfaces/item.interface";
import { ControllerUtils } from "../../utils/controller-utils";
import { toCamelCase } from "../../utils/to-camel-case";
import { ControllersStorage } from "../controllers-storage";

/* tslint:disable:no-any */

export class ItemsParser {
    constructor(private controllersStorage: ControllersStorage) {
    }

    public parse(controller: IControllerDev): void {
        const meta = ControllerUtils.getControllerMeta(controller);
        const items = meta.items;

        if (!items) {
            return;
        }

        for (const item of items) {
            const itemObject = this.getItemObject(item, controller);

            if (itemObject) {
                this.appendItem(item, controller, itemObject);
            }
        }

    }

    private getItemObject(item: TItem, controller: IControllerDev): any {
        const type = Reflect.getMetadata("design:type", controller, item.propertyKey);
        const elements = this.getElementsByName(item, controller);

        if (!type) {
            return;
        }

        if (!elements) {
            return;
        }

        let _s = type;
        while (Object.getPrototypeOf(_s)) {
            if (_s === HTMLElement) {
                return elements[0];
            }

            _s = Object.getPrototypeOf(_s);
        }

        if (type === Array) {
            const controllersByName = this.controllersStorage.controllers.filter(c => {
                const meta = ControllerUtils.getControllerMeta(c);

                return meta.name === name;
            });

            if (controllersByName.length === 0) {
                return elements;
            } else {
                return controllersByName;
            }
        }

        const itemControllers = [];

        for (const element of elements) {
            itemControllers.push(...this.controllersStorage.controllers.filter(c => c._controllerElement === element));
        }

        for (const itemController of itemControllers) {
            if (itemController instanceof type) {
                return itemController;
            }
        }

        return undefined;
    }

    private appendItem(item: TItem, controller: IControllerDev, itemObject: any): void {
        controller[item.propertyKey] = itemObject;
    }

    private getElementsByName(item: TItem, controller: IControllerDev): HTMLElement[] {
        let elements: HTMLElement[] = [];

        switch (item.searchStrategy) {
            case 'all':
                elements = Array.from(document.querySelectorAll('[k-name]'));
                break;
            case 'children':
                elements = Array.from(controller._controllerElement.querySelectorAll('[k-name]'));
                break;
            case 'parents':
                elements = Array.from(document.querySelectorAll('[k-name]'));
                const insideElements = Array.from(controller._controllerElement.querySelectorAll('[k-name]'));

                elements = elements.filter(e => insideElements.indexOf(e) === -1);
                break;
            case 'siblings':
                const parent = controller._controllerElement.parentElement;

                if (!parent) {
                    break;
                }

                elements = Array.from(parent.children).filter
                    (e => e !== controller._controllerElement && e.matches('[k-name]')) as HTMLElement[];
                break;

        }

        const returnElements = [];
        const itemName = toCamelCase(item.name);

        for (const element of elements) {
            const kNameValue = element.getAttribute('k-name') as string;
            const kNames = kNameValue.replace(/\s+/g, '').split(';');

            for (const kName of kNames) {
                const camelKName = toCamelCase(kName);

                if (camelKName === itemName) {
                    returnElements.push(element as HTMLElement);
                }
            }
        }

        return returnElements;
    }
}
