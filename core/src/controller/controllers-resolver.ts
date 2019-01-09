import { IControllerDev } from "../interfaces/controller.interface";
import { ControllersFactory } from "./controllers-factory";
import { ItemsParser } from "./parse/items-parser";

import { ControllersStorage } from './controllers-storage';

export type ControllersResolverArgs = {
    controllersStorage: ControllersStorage;
    controllersFactory: ControllersFactory;
    itemsParser: ItemsParser;
};

export class ControllersResolver {

    private _controllersFactory: ControllersFactory;
    private _controllersStorage: ControllersStorage;
    private _itemsParser: ItemsParser;

    constructor(args: ControllersResolverArgs) {
        this._controllersStorage = args.controllersStorage;
        this._controllersFactory = args.controllersFactory;
        this._itemsParser = args.itemsParser;

    }

    public onInit(): void {
        this.createControllers();
        this.initializeControllers();
    }

    private createControllers(): void {

        for (const controllerConstructor of this._controllersStorage.controllersConstructors) {
            const controllers = this._controllersFactory.create(controllerConstructor) as IControllerDev[];

            for (const controller of controllers) {
                this._controllersStorage.controllers.push(controller);
            }
        }

    }

    private initializeControllers(): void {
        for (const controller of this._controllersStorage.controllers) {
            controller.__karrotConstructor();
        }

        for (const controller of this._controllersStorage.controllers) {
            controller.__karrotParse(this._itemsParser);
        }

        for (const controller of this._controllersStorage.controllers) {
            controller.__karrotInit();
        }

    }
}
