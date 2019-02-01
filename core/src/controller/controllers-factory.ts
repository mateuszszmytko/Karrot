import { IControllerDev } from "../interfaces";
import { IConstructorAny } from "../interfaces/constructor.interface";

import { IInjector, Injector } from "../di/injector";
import { ControllerUtils } from "../utils/controller-utils";
import { toCamelCase } from "../utils/to-camel-case";
import { Settings } from "./depedencies/controller-settings";

/* tslint:disable:no-any */

export class ControllersFactory {
    private _controllersConstructors: IConstructorAny[] = [];

    constructor(private _injector: IInjector) {

    }

    public create(constructor: IConstructorAny): IControllerDev[] {
        const controllers: IControllerDev[] = [];

        const meta = ControllerUtils.getControllerMeta(constructor);

        if (meta.name) {
            const controllerName = toCamelCase(meta.name);

            const elements = Array.from(document.querySelectorAll(`[k-name]`));

            for (const element of elements) {
                const kNameValue = element.getAttribute('k-name') as string;
                const kNames = kNameValue.replace(/\s+/g, '').split(';');

                for (const kName of kNames) {
                    const camelKName = toCamelCase(kName);

                    if (camelKName === controllerName) {
                        const controller = this.createController(constructor, element as HTMLElement);

                        if (controller) {
                            controller._controllerElement = element as HTMLElement;
                            controllers.push(controller);
                        }
                    }
                }
            }
        }

        if (meta.selector) {
            //
            const elements = Array.from(document.querySelectorAll(meta.selector));

            for (const element of elements) {
                const controller = this.createController(constructor, element as HTMLElement);

                if (controller) {
                    controller._controllerElement = element as HTMLElement;
                    controllers.push(controller);
                }
            }
        }

        return controllers;
    }

    private createController(constructor: IConstructorAny, element: HTMLElement): IControllerDev | undefined {

        if (!constructor) {
            return undefined;
        }

        const controllerMeta = ControllerUtils.getControllerMeta(constructor);

        const settings = new Settings(element, constructor);
        const injector = new Injector(this._injector);

        injector.addSingleton(HTMLElement, element as HTMLElement);
        injector.addSingleton(Settings, settings);

        if (controllerMeta.depedencies) {
            for (const depedencyCon of controllerMeta.depedencies) {
                injector.addSingleton(depedencyCon);
            }
        }

        const controller = injector.resolve(constructor);

        return controller;
    }
}
