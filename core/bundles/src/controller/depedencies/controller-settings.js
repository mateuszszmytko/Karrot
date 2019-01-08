"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-any */
var Settings = /** @class */ (function () {
    function Settings(targetElement, controllerConstructor) {
        this.targetElement = targetElement;
        this.settings = new Map();
        var controllerSettingsMetadata = Reflect.getMetadata('Controller:settings', controllerConstructor);
        for (var key in controllerSettingsMetadata) {
            if (controllerSettingsMetadata.hasOwnProperty(key)) {
                var value = controllerSettingsMetadata[key];
                this.settings.set(key, value);
            }
        }
        var dataSettings = targetElement.dataset;
        for (var key in dataSettings) {
            if (!key) {
                continue;
            }
            if (dataSettings.hasOwnProperty(key)) {
                var value = void 0;
                try {
                    var val = dataSettings[key];
                    if (!val) {
                        throw new Error();
                    }
                    value = JSON.parse(val);
                }
                catch (e) {
                    value = dataSettings[key];
                }
                this.settings.set(key, value);
            }
        }
    }
    Settings.defineStatic = function (controllerConstructor, options) {
        var controllerSettingsMetadata = Reflect.getMetadata('Controller:settings', controllerConstructor);
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                var value = options[key];
                controllerSettingsMetadata[key] = value;
            }
        }
        Reflect.defineMetadata('Controller:settings', controllerSettingsMetadata, controllerConstructor);
    };
    Settings.prototype.get = function (property) {
        return this.settings.get(property);
    };
    Settings.prototype.set = function (property, value, dataSync) {
        if (dataSync === void 0) { dataSync = false; }
        if (typeof value !== 'function' && dataSync) {
            try {
                var dataValue = typeof value === 'object' ? JSON.stringify(value) : value.toString();
                this.targetElement.dataset[property] = dataValue;
            }
            catch (_a) {
                //
            }
        }
        this.settings.set(property, value);
        return value;
    };
    return Settings;
}());
exports.Settings = Settings;
//# sourceMappingURL=controller-settings.js.map