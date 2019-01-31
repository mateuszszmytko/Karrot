import { IConstructorAny } from "./constructor.interface";

export type TSearchStrategy = 'all' | 'parents' | 'children' | 'siblings';

export type TItemCapsule = {
    type?: IConstructorAny,
    searchStrategy: TSearchStrategy,
};

export type TItem = {
    propertyKey: string,
    name: string,
    capsule: TItemCapsule,
};
