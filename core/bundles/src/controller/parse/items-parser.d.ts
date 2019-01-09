import { IControllerDev } from "../../interfaces";
import { ControllersStorage } from "../controllers-storage";
export declare class ItemsParser {
    private controllersStorage;
    constructor(controllersStorage: ControllersStorage);
    parse(controller: IControllerDev): void;
    private getItemObject;
    private appendItem;
    private getElementsByName;
}
