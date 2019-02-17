import { ItemsStorage } from "./items-storage";

describe('ItemsStorage class', () => {
    const storage = new ItemsStorage();
    beforeAll(() => {
        console.log('%c ItemsStorage ', 'background: #222; color: #bada55');

        const fixture = `
        <main id="fixture">
            <p k-item="my-a" id="i1">hello world</p>
            <p k-item="my-b; my-c" id="i2">hello world</p>
            <p k-item="my-c; my-d" id="i3">hello world</p>
            <p k-item="my-d" id="i4">
                <span k-item="my-c" id="i5">hello world</span>
            </p>
        </main>
        `;

        document.body.insertAdjacentHTML('beforeend', fixture);
        storage.init();
    });

    afterAll(() => {
        document.body.removeChild(document.getElementById('fixture') as HTMLElement);

        console.log('%c end of ItemsStorage', 'background: #222; color: #bada55');
    });

    it('should exists', () => {
        expect(ItemsStorage).toBeDefined();
    });

    it('should contains static methods: init, getItemsByName, getItemByElement', () => {
        expect(storage.init).toBeDefined();
        expect(storage.getItemsByName).toBeDefined();
        expect(storage.getItemByElement).toBeDefined();
    });

    it('should parse all elements', () => {
        expect(storage.items.length).toBe(5);
    });

    it('getItemsByName should return valid elements', () => {
        const getItems = storage.getItemsByName('my-c');
        const elements =
            Array.from(document.querySelectorAll('#i2, #i3, #i5'));

        expect(getItems.length).toBe(3);

        getItems.map((i, index) => {
            expect(i.element).toBe(elements[index] as HTMLElement);
        });

    });

    it('getItemsByElementshould return valid element', () => {
        const myD = storage.getItemsByName('my-d')[0];
        const myDElement = myD.element;

        expect(storage.getItemByElement(myDElement)).toBe(myD);
    });

});
