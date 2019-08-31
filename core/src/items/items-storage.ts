import { toCamelCase } from "../utils/to-camel-case";
import { KarrotItem } from "../karrot-item";

export class ItemsStorage {
    private _items: KarrotItem[] = [];

    public get items(): KarrotItem[] {
        return this._items;
    }

    public init(): void {
        this.parse();
    }

    public getItemsByName(name: string, context?: HTMLElement): KarrotItem[] {
        let items = this.items.filter(item => item.names.indexOf(name) > -1);
        if (context) {
            items = items.filter(i => context.contains(i.element));
        }

        return items;
    }

    public getItemsByContext(context: HTMLElement): KarrotItem[] {
        const items = this.items.filter(i => context.contains(i.element));

        return items;
    }

    public getItemByElement(element: HTMLElement): KarrotItem | undefined {
        return this.items.find(item => item.element === element);
    }

    public parse(clear: boolean = true, context: Document | HTMLElement = document): void {
        if (clear) {
            this._items = [];
        }

        const elements = Array.from(context.querySelectorAll('[k-item]')) as HTMLElement[];

        if (context !== document) {
            elements.push(context as HTMLElement);
        }

        for (const element of elements) {
            if (this.getItemByElement(element)) {
                continue;
            }

            const kNameValue = element.getAttribute('k-item') as string;
            const kNames = kNameValue.replace(/\s+/g, '').split(';');

            for (const kName of [...kNames]) {
                const camelKName = toCamelCase(kName);
                if (kName !== camelKName) {
                    kNames.push(camelKName);
                }
            }

            const karrotInstance = new KarrotItem(element);
            karrotInstance.names.push(...kNames);
            this.items.push(karrotInstance);
        }
    }
}
