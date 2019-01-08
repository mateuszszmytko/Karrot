import { IKarrotArgs } from "./interfaces/karrot-args.interface";
export declare class KarrotImp {
    args: IKarrotArgs;
    private _rootInjector;
    private _controllersResolver;
    constructor(args: IKarrotArgs);
    onInit(): void;
}
