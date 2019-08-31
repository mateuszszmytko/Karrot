export interface IFilters {
    [key: string]: (...args: any[]) => any;
}
export interface IActions {
    [key: string]: (...args: any[]) => void;
}
export declare type TAction<A> = {
    name: keyof A;
    method: any;
    index: number;
};
export declare type TFilter<F> = {
    name: keyof F;
    method: any;
    index: number;
};
export declare class Hooks<A = IActions, F = IFilters> {
    private actions;
    private filters;
    addAction<T extends keyof A>(actionName: T, action: A[T], index?: number): void;
    doAction<T extends keyof A>(actionName: T, ...args: any[]): Promise<void>;
    addFilter<T extends keyof F>(filterName: T, filter: F[T], index?: number): void;
    applyFilter<L, T extends keyof F>(object: L, filterName: T, ...args: any[]): Promise<L>;
    applyFilterSync<L, T extends keyof F>(object: L, filterName: T, ...args: any[]): L;
}
