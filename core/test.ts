/* tslint:disable */
declare const __karma__: any;
declare const require: any;


__karma__.loaded = function () {};

const context = (<any>require).context('./', true, /\.spec\.ts$/);
context.keys().map(context);

__karma__.start();

