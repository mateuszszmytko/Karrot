import { IControllerDev } from "../interfaces/controller.interface";

export type TLifecycleEvent =
    'kOnInit' |
    'kBeforeInit' |
    'kBeforeParse' |
    'kAfterParse';

export class ControllerLifecycle {
    constructor(private _controller: IControllerDev) {    }

    public execute(event: TLifecycleEvent): void {
        if (typeof this._controller[event]  === "function") {
            this._controller[event]();
        }
    }
}
