import { IConstructorAny } from "../../interfaces/constructor.interface";

/* tslint:disable:no-any */

export class Settings<T = any> {
    public static defineStatic(controllerConstructor: IConstructorAny, options: { [key: string]: any }): void {
        const controllerSettingsMetadata = Reflect.getMetadata('Controller:settings', controllerConstructor);

        for (const key in options) {
            if (options.hasOwnProperty(key)) {
                const value = options[key];

                controllerSettingsMetadata[key] = value;
            }
        }

        Reflect.defineMetadata('Controller:settings', controllerSettingsMetadata, controllerConstructor);
    }

    private settings: Map<string, any> = new Map();

    constructor(private targetElement: HTMLElement, controllerConstructor: IConstructorAny) {
        const controllerSettingsMetadata = Reflect.getMetadata('Controller:settings', controllerConstructor);

        for (const key in controllerSettingsMetadata) {
            if (controllerSettingsMetadata.hasOwnProperty(key)) {
                const value = controllerSettingsMetadata[key];

                this.settings.set(key, value);
            }
        }

        const dataSettings = targetElement.dataset;

        for (const key in dataSettings) {
            if (!key || !dataSettings.hasOwnProperty(key)) {
                continue;
            }

            let value = dataSettings[key];

            if (!value) {
                continue;
            }

            // trying to parse array-line strings
            // like "item1; item2" or "item1: value1; item2: value2"

            if (value.indexOf(';') > 0 && !this.settings.get('skipArrayParsing')) {
                const valueArr = value.replace(/\;+\s+/g, ';').split(';');
                let newVal = value;
                let isObject = false;

                for (const valueChild of valueArr) {
                    if (valueChild.indexOf(':') > 0) {
                        isObject = true;

                        break;
                    }
                }

                newVal = isObject ? '{' : '[';

                for (const valueChild of valueArr) {
                    if (valueChild === '') {
                        continue;
                    }

                    if (isObject) {
                        const valueChildArr = valueChild.replace(/\:+\s+/g, ':').split(':');

                        newVal += `"${valueChildArr[0]}": `;
                        try {
                            JSON.parse(valueChildArr[1] || valueChildArr[0]);
                            newVal += valueChildArr[1] + ',';

                        } catch (e) {
                            newVal += `"${valueChildArr[1] || valueChildArr[0]}",`;
                        }
                        //
                    } else {
                        try {
                            JSON.parse(valueChild);
                            newVal += valueChild + ',';

                        } catch (e) {
                            newVal += `"${valueChild}",`;
                        }
                    }
                }

                newVal = newVal.substr(0, newVal.length - 1);

                newVal += isObject ? '}' : ']';

                value = newVal;
            }

            try {
                const val = value
                    .replace(/\'/g, `"`);

                if (!val) {
                    throw new Error();
                }

                value = JSON.parse(val);
            } catch (e) {
                //
            }

            this.settings.set(key, value);
        }
    }

    public get<K extends keyof T>(property: K): T[K] {
        return this.settings.get(property as string);
    }

    public set<K extends keyof T>(property: K, value: T[K], dataSync: boolean = false): T[K] {
        if (typeof value !== 'function' && dataSync) {
            try {
                const dataValue = typeof value === 'object' ? JSON.stringify(value) : value!.toString();
                this.targetElement.dataset[property as string] = dataValue;
            } catch {
                //
            }
        }

        this.settings.set(property as string, value);

        return value;
    }
}
