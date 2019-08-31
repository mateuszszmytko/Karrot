import { IFunctionAny, IConstructor, IConstructorAny, IFunctionAttach } from "./interfaces/constructor.interface";
import { DataParser } from "./utils/data-parser";
import { Hooks } from "./addon/hooks";
import { ISettings } from "./interfaces/settings.interface";
import { Karrot } from "./karrot";

// tslint:disable:no-any
export class KarrotItem<E extends HTMLElement = HTMLElement> {
    public readonly names: string[] = [];
    public readonly attachments: any[] = [];

    public readonly hooks: Hooks = new Hooks();
    private _settings: ISettings = DataParser.parse(this.element);

    public get settings(): ISettings {
        return this._settings;
    }

    constructor(public element: E) {
    }

    public appendSettings(settings: ISettings): ISettings {
        this._settings = Object.assign({}, settings, this.settings);

        return this._settings;
    }

    public attach(...attachments: Array<IConstructorAny | IFunctionAttach>): void {
        for (const attachment of attachments) {
            const existingInstance =
                this.attachments.find(a => {
                    return Object.getPrototypeOf(a) === attachment.prototype;
                });

            if (existingInstance) {
                continue;
            }
            const instance = (new (attachment as any)(this));

            if (instance.kOnInit && typeof instance.kOnInit === 'function') {
                instance.kOnInit();
            }

            this.attachments.push(instance);

        }
    }

    public attachment<T>(type: IConstructor<T>): T | undefined {
        return this.attachments.find(a => a instanceof type);
    }
}
