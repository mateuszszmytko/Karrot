"use strict";
/* tslint:disable:no-any */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Hooks = /** @class */ (function () {
    function Hooks() {
        this.actions = [];
        this.filters = [];
    }
    Hooks.prototype.addAction = function (actionName, action, index) {
        if (index === void 0) { index = 100; }
        this.actions.push({ name: actionName, method: action, index: index });
    };
    Hooks.prototype.doAction = function (actionName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var metaActions, _a, metaActions_1, action, method;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        metaActions = this.actions
                            .filter(function (a) { return a.name === actionName; })
                            .sort(function (a, b) { return a.index - b.index; });
                        if (metaActions.length === 0) {
                            return [2 /*return*/];
                        }
                        _a = 0, metaActions_1 = metaActions;
                        _b.label = 1;
                    case 1:
                        if (!(_a < metaActions_1.length)) return [3 /*break*/, 4];
                        action = metaActions_1[_a];
                        method = action.method.apply(action, args);
                        if (!(method instanceof Promise)) return [3 /*break*/, 3];
                        return [4 /*yield*/, method];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _a++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Hooks.prototype.addFilter = function (filterName, filter, index) {
        if (index === void 0) { index = 100; }
        this.filters.push({ name: filterName, method: filter, index: index });
    };
    Hooks.prototype.applyFilter = function (object, filterName) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var metaFilters, _a, metaFilters_1, filter, method;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        metaFilters = this.filters
                            .filter(function (a) { return a.name === filterName; })
                            .sort(function (a, b) { return a.index - b.index; });
                        _a = 0, metaFilters_1 = metaFilters;
                        _b.label = 1;
                    case 1:
                        if (!(_a < metaFilters_1.length)) return [3 /*break*/, 5];
                        filter = metaFilters_1[_a];
                        method = filter.method.apply(filter, [object].concat(args));
                        if (!(method instanceof Promise)) return [3 /*break*/, 3];
                        return [4 /*yield*/, method];
                    case 2:
                        object = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        object = method;
                        _b.label = 4;
                    case 4:
                        _a++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/, object];
                }
            });
        });
    };
    Hooks.prototype.applyFilterSync = function (object, filterName) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var metaFilters, _a, metaFilters_2, filter, method;
            return __generator(this, function (_b) {
                metaFilters = this.filters
                    .filter(function (a) { return a.name === filterName; })
                    .sort(function (a, b) { return a.index - b.index; });
                for (_a = 0, metaFilters_2 = metaFilters; _a < metaFilters_2.length; _a++) {
                    filter = metaFilters_2[_a];
                    method = filter.method.apply(filter, [object].concat(args));
                    if (method instanceof Promise) {
                        continue;
                    }
                    object = method;
                }
                return [2 /*return*/, object];
            });
        });
    };
    return Hooks;
}());
exports.Hooks = Hooks;
//# sourceMappingURL=hooks.js.map