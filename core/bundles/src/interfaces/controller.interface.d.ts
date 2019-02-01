import { IConstructorAny } from "./constructor.interface";
import { ControllerLifecycle } from "../controller/controller-lifecycle";
import { ItemsParser } from "../controller/parse/items-parser";
import { TItem } from "./item.interface";
export interface IController {
    kOnInit?(): void;
    kBeforeInit?(): void;
    kBeforeParseInit?(): void;
    kAfterParseInit?(): void;
}
export interface IControllerMeta {
    name: string;
    selector?: string;
    items?: TItem[];
    eventListeners?: Array<{
        target: string;
        method: string;
        type: string;
    }>;
    actions?: Array<{
        target: string;
        method: string;
        type: string;
        index: number;
    }>;
    depedencies?: IConstructorAny[];
}
export interface IControllerDev extends IController {
    _controllerId: string;
    _lifecycle: ControllerLifecycle;
    _controllerElement: HTMLElement;
    __karrotConstructor(): void;
    __karrotParse(parser: ItemsParser): void;
    __karrotInit(): void;
    [key: string]: any;
}
export interface IControllerArgs {
    name: string;
    selector?: string;
    depedencies?: IConstructorAny[];
    paramTypes?: IConstructorAny[];
    settings?: {
        [key: string]: any;
    };
}
