
import { ControllersResolver } from "./controller/controllers-resolver";
import { IInjector, Injector } from "./di/injector";
import { IKarrotArgs } from "./interfaces/karrot-args.interface";

export class KarrotImp {
    private _rootInjector: IInjector;
    private _controllersResolver: ControllersResolver;

    constructor(public args: IKarrotArgs) {
        this._rootInjector = new Injector();

        this._controllersResolver = new ControllersResolver({
            controllersConstructors: args.controllers,
            rootInjector: this._rootInjector,
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
