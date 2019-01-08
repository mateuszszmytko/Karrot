export type TSearchStrategy = 'all' | 'parents' | 'children' | 'siblings';
export type TItem = {propertyKey: string, name: string, searchStrategy: TSearchStrategy};
