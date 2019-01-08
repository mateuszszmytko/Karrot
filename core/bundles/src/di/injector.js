"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Injector = /** @class */ (function () {
    function Injector(parent) {
        this.parent = parent;
        this._depedencies = [];
        this._depedenciesCapsules = [];
    }
    Object.defineProperty(Injector.prototype, "depedencies", {
        get: function () {
            var depedencies = this._depedencies;
            if (this.parent) {
                depedencies = depedencies.concat(this.parent.depedencies);
            }
            return depedencies;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Injector.prototype, "depedenciesCapsules", {
        get: function () {
            var depedenciesCapsules = this._depedenciesCapsules;
            if (this.parent) {
                depedenciesCapsules = depedenciesCapsules.concat(this.parent.depedenciesCapsules);
            }
            return depedenciesCapsules;
        },
        enumerable: true,
        configurable: true
    });
    Injector.prototype.addTransient = function (depedencyCon) {
        this.add(depedencyCon, 'transient');
    };
    Injector.prototype.addSingleton = function (depedencyCon, depedency) {
        this.add(depedencyCon, 'singleton', depedency);
    };
    Injector.prototype.add = function (depedencyCon, type, depedency) {
        if (type === void 0) { type = 'singleton'; }
        if (depedency) {
            this._depedencies.push(depedency);
            Reflect.defineMetadata('Injector:constructor', depedencyCon, depedency);
            Reflect.defineMetadata('Injector:type', type, depedency);
        }
        this._depedenciesCapsules.push({
            depedencyCon: depedencyCon,
            type: type,
        });
    };
    Injector.prototype.getDepedency = function (depedencyCon) {
        var depedency = this.depedencies.find(function (s) {
            var customType = Reflect.getMetadata('Injector:constructor', s) || s.constructor;
            var _s = depedencyCon;
            while (Object.getPrototypeOf(_s)) {
                if (_s === customType) {
                    return true;
                }
                _s = Object.getPrototypeOf(_s);
            }
            return customType === depedencyCon;
        });
        return depedency;
    };
    Injector.prototype.getDepedencys = function (depedencyCon) {
        var depedencies = this.depedencies.filter(function (s) {
            return s.constructor === depedencyCon;
        });
        return depedencies;
    };
    Injector.prototype.resolve = function (targetCon) {
        var _this = this;
        var requiredParams = Reflect.getMetadata('design:paramtypes', targetCon) || [];
        var resolvedDepedencys = requiredParams.map(function (param) { return _this.getOrCreateDepedency(param); });
        var instance = this.createInstance(targetCon, resolvedDepedencys);
        return instance;
    };
    Injector.prototype.resolveMethod = function (obj, method) {
        var _this = this;
        var requiredParams = Reflect.getMetadata('design:paramtypes', obj, method) || [];
        var resolvedDepedencys = requiredParams.map(function (param) { return _this.getOrCreateDepedency(param); });
        obj[method].apply(obj, resolvedDepedencys);
    };
    Injector.prototype.createChildInjector = function () {
        return new Injector(this);
    };
    Injector.prototype.getOrCreateDepedency = function (depedencyCon) {
        var _this = this;
        if (!depedencyCon) {
            return undefined;
        }
        var instance = this.getDepedency(depedencyCon);
        if (!instance || Reflect.getMetadata('Injector:type', instance) === 'transient') {
            var depedencyCapsule = this.depedenciesCapsules.find(function (sc) { return sc.depedencyCon === depedencyCon; });
            if (!depedencyCapsule) {
                return undefined;
            }
            var requiredParams = Reflect.getMetadata('design:paramtypes', depedencyCon) || [];
            var resolvedDepedencys = requiredParams.map(function (param) {
                return param ?
                    _this.getOrCreateDepedency(param) : undefined;
            });
            instance = this.createInstance(depedencyCon, resolvedDepedencys);
            this._depedencies.push(instance);
            Reflect.defineMetadata('Injector:constructor', depedencyCon, instance);
            Reflect.defineMetadata('Injector:type', depedencyCapsule.type, instance);
        }
        return instance;
    };
    Injector.prototype.createInstance = function (con, resolvedDepedencys) {
        var instance = new (con.bind.apply(con, [void 0].concat(resolvedDepedencys)))();
        for (var _i = 0, resolvedDepedencys_1 = resolvedDepedencys; _i < resolvedDepedencys_1.length; _i++) {
            var resolvedParam = resolvedDepedencys_1[_i];
            if (!resolvedParam) {
                continue;
            }
            if (typeof resolvedParam.onInject === 'function') {
                resolvedParam.onInject(instance);
            }
        }
        return instance;
    };
    return Injector;
}());
exports.Injector = Injector;
//# sourceMappingURL=injector.js.map