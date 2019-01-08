import { IInjector } from "../di/injector";
import { IConstructorAny } from "../interfaces/constructor.interface";
import { IControllerDev } from "../interfaces/controller.interface";
import { ControllersFactory } from "./controllers-factory";
import { ItemsParser } from "./parse/items-parser";

export type ControllersResolverArgs = {
    controllersConstructors: IConstructorAny[];
    rootInjector: IInjector;
};

export class ControllersResolver {
    public get controllers(): IControllerDev[] {
        return this._controllers;
    }

    private _itemsParser: ItemsParser;
    private _controllersFactory: ControllersFactory;
    private _controllersConstructors: IConstructorAny[];
    private _rootInjector: IInjector;
    private _controllers: IControllerDev[] = [];

    constructor(args: ControllersResolverArgs) {
        this._controllersConstructors = args.controllersConstructors;
        this._rootInjector = args.rootInjector;

        this._controllersFactory = new ControllersFactory(this._rootInjector);

    }

    public onInit(): void {
        this.createControllers();
        this._itemsParser = new ItemsParser(this.controllers);

        this.initializeControllers();
    }

    private createControllers(): void {

        for (const controllerConstructor of this._controllersConstructors) {
            const controllers = this._controllersFactory.create(controllerConstructor) as IControllerDev[];

            this._controllers = this._controllers.concat(controllers);
        }

    }

    private initializeControllers(): void {
        for (const controller of this._controllers) {
            controller.__karrotConstructor();
        }

        for (const controller of this._controllers) {
            controller.__karrotParse(this._itemsParser);
        }

        for (const controller of this._controllers) {
            controller.__karrotInit();
        }

    }
}
