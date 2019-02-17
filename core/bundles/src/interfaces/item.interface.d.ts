import { Controller } from "../controller";
import { IFunctionAny } from "./constructor.interface";
export declare type TItem = {
    names: string[];
    element: HTMLElement;
    attached: Array<Controller | IFunctionAny>;
};
export declare type TItemContainer = {
    name: string;
    items: TItem[];
};
