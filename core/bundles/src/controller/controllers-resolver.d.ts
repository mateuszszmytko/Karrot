import { IInjector } from "../di/injector";
import { IConstructorAny } from "../interfaces/constructor.interface";
import { IControllerDev } from "../interfaces/controller.interface";
export declare type ControllersResolverArgs = {
    controllersConstructors: IConstructorAny[];
    rootInjector: IInjector;
};
export declare class ControllersResolver {
    readonly controllers: IControllerDev[];
    private _itemsParser;
    private _controllersFactory;
    private _controllersConstructors;
    private _rootInjector;
    private _controllers;
    constructor(args: ControllersResolverArgs);
    onInit(): void;
    private createControllers;
    private initializeControllers;
}
