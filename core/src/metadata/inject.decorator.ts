import { IConstructorAny } from "../interfaces";

/* tslint:disable:no-any */

export function Inject(con: IConstructorAny): any {
    return (target: any, propertyKey: string) => {
        Reflect.defineMetadata('design:type', con, target, propertyKey);
    };
}
