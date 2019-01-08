import { IConstructorAny, IControllerDev, IControllerMeta } from "../interfaces";

/* tslint:disable:no-any */

export class ControllerUtils {
    public static getControllerId(): string {
        ControllerUtils._currentControllerId++;
        return 'k_' + ControllerUtils._currentControllerId;
    }

    public static getControllerMeta(target: IConstructorAny | IControllerDev): IControllerMeta {
        if (!target.prototype || !target.prototype.constructor) {
            target = Object.getPrototypeOf(target).constructor;
        }

        const meta: {[key: string]: any} = {};

        for (const key of Reflect.getMetadataKeys(target)) {
            if (key.indexOf('Controller:') !== 0) {
                continue;
            }

            const truncKey = key.replace('Controller:', '');
            const metaValue = Reflect.getMetadata(key, target);

            meta[truncKey] = metaValue;
        }

        return meta as IControllerMeta;
    }

    private static _currentControllerId: number = 0;
    private static _conntrollers: IControllerDev[] = [];

}
