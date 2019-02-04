"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Injector = /** @class */ (function () {
    function Injector(parent) {
        this.parent = parent;
        this._dependencies = [];
        this._dependenciesCapsules = [];
    }
    Object.defineProperty(Injector.prototype, "dependencies", {
        get: function () {
            var dependencies = this._dependencies;
            if (this.parent) {
                dependencies = dependencies.concat(this.parent.dependencies);
            }
            return dependencies;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Injector.prototype, "dependenciesCapsules", {
        get: function () {
            var dependenciesCapsules = this._dependenciesCapsules;
            if (this.parent) {
                dependenciesCapsules = dependenciesCapsules.concat(this.parent.dependenciesCapsules);
            }
            return dependenciesCapsules;
        },
        enumerable: true,
        configurable: true
    });
    Injector.prototype.addTransient = function (dependencyCon) {
        this.add(dependencyCon, 'transient');
    };
    Injector.prototype.addSingleton = function (dependencyCon, dependency) {
        this.add(dependencyCon, 'singleton', dependency);
    };
    Injector.prototype.add = function (dependencyCon, type, dependency) {
        if (type === void 0) { type = 'singleton'; }
        if (dependency) {
            this._dependencies.push(dependency);
            Reflect.defineMetadata('Injector:constructor', dependencyCon, dependency);
            Reflect.defineMetadata('Injector:type', type, dependency);
        }
        this._dependenciesCapsules.push({
            dependencyCon: dependencyCon,
            type: type,
        });
    };
    Injector.prototype.getDependency = function (dependencyCon) {
        var dependency = this.dependencies.find(function (s) {
            var customType = Reflect.getMetadata('Injector:constructor', s) || s.constructor;
            var _s = dependencyCon;
            while (Object.getPrototypeOf(_s)) {
                if (_s === customType) {
                    return true;
                }
                _s = Object.getPrototypeOf(_s);
            }
            return customType === dependencyCon;
        });
        return dependency;
    };
    Injector.prototype.getDependencies = function (dependencyCon) {
        var dependencies = this.dependencies.filter(function (s) {
            return s.constructor === dependencyCon;
        });
        return dependencies;
    };
    Injector.prototype.resolve = function (targetCon) {
        var _this = this;
        var requiredParams = Reflect.getMetadata('design:paramtypes', targetCon) || [];
        var resolvedDependencies = requiredParams.map(function (param) { return _this.getOrCreateDependency(param); });
        var instance = this.createInstance(targetCon, resolvedDependencies);
        return instance;
    };
    Injector.prototype.resolveMethod = function (obj, method) {
        var _this = this;
        var requiredParams = Reflect.getMetadata('design:paramtypes', obj, method) || [];
        var resolvedDependencies = requiredParams.map(function (param) { return _this.getOrCreateDependency(param); });
        obj[method].apply(obj, resolvedDependencies);
    };
    Injector.prototype.createChildInjector = function () {
        return new Injector(this);
    };
    Injector.prototype.getOrCreateDependency = function (dependencyCon) {
        var _this = this;
        if (!dependencyCon) {
            return undefined;
        }
        var instance = this.getDependency(dependencyCon);
        if (!instance || Reflect.getMetadata('Injector:type', instance) === 'transient') {
            var dependencyCapsule = this.dependenciesCapsules.find(function (sc) { return sc.dependencyCon === dependencyCon; });
            if (!dependencyCapsule) {
                return undefined;
            }
            var requiredParams = Reflect.getMetadata('design:paramtypes', dependencyCon) || [];
            var resolvedDependencies = requiredParams.map(function (param) {
                return param ?
                    _this.getOrCreateDependency(param) : undefined;
            });
            instance = this.createInstance(dependencyCon, resolvedDependencies);
            this._dependencies.push(instance);
            Reflect.defineMetadata('Injector:constructor', dependencyCon, instance);
            Reflect.defineMetadata('Injector:type', dependencyCapsule.type, instance);
        }
        return instance;
    };
    Injector.prototype.createInstance = function (con, resolvedDependencies) {
        var instance = new (con.bind.apply(con, [void 0].concat(resolvedDependencies)))();
        for (var _i = 0, resolvedDependencies_1 = resolvedDependencies; _i < resolvedDependencies_1.length; _i++) {
            var resolvedParam = resolvedDependencies_1[_i];
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