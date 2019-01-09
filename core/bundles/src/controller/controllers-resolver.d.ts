import { ControllersFactory } from "./controllers-factory";
import { ItemsParser } from "./parse/items-parser";
import { ControllersStorage } from './controllers-storage';
export declare type ControllersResolverArgs = {
    controllersStorage: ControllersStorage;
    controllersFactory: ControllersFactory;
    itemsParser: ItemsParser;
};
export declare class ControllersResolver {
    private _controllersFactory;
    private _controllersStorage;
    private _itemsParser;
    constructor(args: ControllersResolverArgs);
    onInit(): void;
    private createControllers;
    private initializeControllers;
}
