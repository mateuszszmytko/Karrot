import { toCamelCase } from "../utils/to-camel-case";
import { Karrot } from "../karrot";

export class ItemsStorage {
    public readonly items: Karrot[] = [];

    public init(): void {
        this.parse();
    }

    public getItemsByName(name: string, context?: HTMLElement): Karrot[] {
        let items = this.items.filter(item => item.names.indexOf(name) > -1);
        if (context) {
            items = items.filter(i => context.contains(i.element));
        }

        return items;
    }

    public getItemByElement(element: HTMLElement): Karrot | undefined {
        return this.items.find(item => item.element === element);
    }

    private parse(): void {
        const elements = Array.from(document.querySelectorAll('[k-item]')) as HTMLElement[];
        for (const element of elements) {
            const kNameValue = element.getAttribute('k-item') as string;
            const kNames = kNameValue.replace(/\s+/g, '').split(';');

            for (const kName of [...kNames]) {
                const camelKName = toCamelCase(kName);
                if (kName !== camelKName) {
                    kNames.push(camelKName);
                }
            }

            const karrotInstance = new Karrot(element);
            karrotInstance.names.push(...kNames);
            this.items.push(karrotInstance);
        }
    }
}
