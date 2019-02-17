/* tslint:disable:no-any */

export type TAction<A> = {
    name: keyof A;
    method: any;
    index: number;
};

export type TFilter<F> = {
    name: keyof F;
    method: any;
    index: number;
};

export class Hooks<A = any, F = any> {
    private actions: Array<TAction<A>> = [];
    private filters: Array<TFilter<F>> = [];

    public addAction<T extends keyof A>(actionName: T, action: A[T], index: number = 100): void {
        this.actions.push({ name: actionName, method: action, index });
    }

    public async doAction<T extends keyof A>(actionName: T, ...args: any[]): Promise<void> {
        const metaActions = this.actions
            .filter(a => a.name === actionName)
            .sort((a: any, b: any) => a.index - b.index);

        if (metaActions.length === 0) {
            return;
        }

        for (const action of metaActions) {
            const method = action.method(...args);

            if (method instanceof Promise) {
                await method;
            }
        }
    }

    public addFilter<T extends keyof F>(filterName: T, filter: F[T], index: number = 100): void {
        this.filters.push({ name: filterName, method: filter, index });
    }

    public async applyFilter<L, T extends keyof F>(object: L, filterName: T, ...args: any[]): Promise<L> {
        const metaFilters = this.filters
            .filter(a => a.name === filterName)
            .sort((a: any, b: any) => a.index - b.index);

        for (const filter of metaFilters) {
            const method = filter.method(object, ...args);

            if (method instanceof Promise) {
                object = await method;
            } else {
                object = method;
            }
        }

        return object;
    }

    public applyFilterSync<L, T extends keyof F>(object: L, filterName: T, ...args: any[]): L {
        const metaFilters = this.filters
            .filter(a => a.name === filterName)
            .sort((a: any, b: any) => a.index - b.index);

        for (const filter of metaFilters) {
            const method = filter.method(object, ...args);

            if (method instanceof Promise) {
                continue;
            }

            object = method;
        }

        return object;
    }

}
