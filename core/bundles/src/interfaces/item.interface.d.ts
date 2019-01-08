export declare type TSearchStrategy = 'all' | 'parents' | 'children' | 'siblings';
export declare type TItem = {
    propertyKey: string;
    name: string;
    searchStrategy: TSearchStrategy;
};
