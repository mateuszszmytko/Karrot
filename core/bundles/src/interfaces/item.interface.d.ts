import { IConstructorAny } from "./constructor.interface";
export declare type TSearchStrategy = 'all' | 'parents' | 'children' | 'siblings';
export declare type TItemCapsule = {
    type?: IConstructorAny;
    searchStrategy: TSearchStrategy;
};
export declare type TItem = {
    propertyKey: string;
    name: string;
    capsule: TItemCapsule;
};
