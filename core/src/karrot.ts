import { IKarrotArgs } from "./interfaces/karrot-args.interface";
import { KarrotImp } from "./karrot-imp";

export function Karrot(args: IKarrotArgs): void {
    const karrotImp = new KarrotImp(args);
    karrotImp.onInit();
}
