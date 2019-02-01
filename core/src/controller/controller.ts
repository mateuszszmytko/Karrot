import { IControllerArgs } from "../interfaces/controller.interface";
import { ControllerLifecycle } from "./controller-lifecycle";

import { IControllerDev } from "../interfaces";
import { ControllerUtils } from "../utils/controller-utils";
import { ItemsParser } from "./parse/items-parser";

// tslint:disable-next-line
export function Controller<T>(data: IControllerArgs): (con: new (...args: any[]) => T) => void {
    // tslint:disable-next-line
    return <T>(con: new (...args: any[]) => T) => {
        Reflect.defineMetadata('Controller:name', data.name, con);

        if (data.selector) {
            Reflect.defineMetadata('Controller:selector', data.selector, con);
        }

        Reflect.defineMetadata('Controller:depedencies', data.depedencies, con);
        Reflect.defineMetadata('Controller:settings', data.settings || [], con);

        if (data.paramTypes) {
            Reflect.defineMetadata('design:paramtypes', data.paramTypes, con);
        }

        // tslint:disable-next-line
        con.prototype.__karrotConstructor = function (this: IControllerDev) {
            this._controllerId = ControllerUtils.getControllerId();
            this._controllerElement.setAttribute(this._controllerId, '');

            this._lifecycle = new ControllerLifecycle(this);
        };

        // tslint:disable-next-line
        con.prototype.__karrotParse = function (this: IControllerDev, itemsParser: ItemsParser) {
            this._lifecycle.execute('kBeforeParse');
            itemsParser.parse(this);
            this._lifecycle.execute('kAfterParse');

        };

        // tslint:disable-next-line
        con.prototype.__karrotInit = function (this: IControllerDev) {
            this._lifecycle.execute('kBeforeInit');
            this._lifecycle.execute('kOnInit');

        };

    };
}
