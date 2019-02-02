import { IConstructorAny } from "./constructor.interface";
export interface IKarrotArgs {
    controllers: IConstructorAny[];
    dependencies?: IConstructorAny[];
}
