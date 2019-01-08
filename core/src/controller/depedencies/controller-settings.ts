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
            if (!key) {
                continue;
            }

            if (dataSettings.hasOwnProperty(key)) {
                let value;
                try {
                    const val = dataSettings[key];

                    if (!val) {
                        throw new Error();
                    }

                    value = JSON.parse(val);
                } catch (e) {
                    value = dataSettings[key];
                }

                this.settings.set(key, value);
            }
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
