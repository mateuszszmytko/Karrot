import { IControllerDev } from "../interfaces/controller.interface";
export declare type TLifecycleEvent = 'kOnInit' | 'kBeforeInit' | 'kBeforeParse' | 'kAfterParse';
export declare class ControllerLifecycle {
    private _controller;
    constructor(_controller: IControllerDev);
    execute(event: TLifecycleEvent): void;
}
