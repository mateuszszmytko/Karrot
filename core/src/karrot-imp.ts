import { ControllersFactory } from "./controller";
import { ControllersResolver } from "./controller/controllers-resolver";
import { ControllersStorage } from "./controller/controllers-storage";
import { ItemsParser } from "./controller/parse/items-parser";
import { Hooks } from "./depedencies";
import { IInjector, Injector } from "./di/injector";
import { IKarrotArgs } from "./interfaces/karrot-args.interface";

export class KarrotImp {
    private _rootInjector: IInjector;
    private _controllersResolver: ControllersResolver;

    constructor(public args: IKarrotArgs) {
        this._rootInjector = new Injector();

        const controllersStorage = new ControllersStorage(args.controllers);
        const controllersFactory = new ControllersFactory(this._rootInjector);
        const itemsParser = new ItemsParser(controllersStorage);

        this._rootInjector.addSingleton(ControllersStorage, controllersStorage);
        this._rootInjector.addTransient(Hooks);

        this._controllersResolver = new ControllersResolver({
            controllersFactory,
            controllersStorage,
            itemsParser,
        });
    }

    public onInit(): void {
        if (this.args.depedencies) {
            for (const depedency of this.args.depedencies) {
                this._rootInjector.add(depedency, 'singleton');
            }
        }

        this._controllersResolver.onInit();
    }

}
