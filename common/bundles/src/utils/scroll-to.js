"use strict";
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
var defaultOptions = {
    easing: 'easeInOutCubic',
    historyPush: true,
    offset: 0,
    speed: 500,
};
function scrollTo(target, options) {
    return __awaiter(this, void 0, void 0, function () {
        var manager;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!options) {
                        options = defaultOptions;
                    }
                    if (typeof target === "string") {
                        target = document.querySelector(target);
                    }
                    if (!target) {
                        return [2 /*return*/];
                    }
                    manager = new ScrollToManager(target, options);
                    return [4 /*yield*/, manager.onInit()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.scrollTo = scrollTo;
var ScrollToManager = /** @class */ (function () {
    function ScrollToManager(target, options) {
        this.target = target;
        this.options = options;
        this.startLocation = 0;
        this.endLocation = 0;
        this.targetHash = '';
        this.targetHash = '#' + this.target.getAttribute('id');
    }
    ScrollToManager.prototype.onInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.target) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.startAnimateScroll()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ScrollToManager.prototype.startAnimateScroll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var distance, timeLapsed;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.parseLocations();
                        distance = this.endLocation - this.startLocation;
                        timeLapsed = 0;
                        return [4 /*yield*/, new Promise(function (r) {
                                var interval = setInterval(function () {
                                    timeLapsed += 16;
                                    var percentage = (timeLapsed / _this.options.speed);
                                    percentage = (percentage > 1) ? 1 : percentage;
                                    var position = Math.floor(_this.startLocation + (distance * _this.easing(percentage)));
                                    window.scrollTo(0, position);
                                    var currentLocation = window.pageYOffset;
                                    if (currentLocation === _this.endLocation
                                        || percentage === 1
                                        || ((window.innerHeight + currentLocation) >= document.body.scrollHeight)) {
                                        _this.target.focus();
                                        clearInterval(interval);
                                        if (_this.targetHash && _this.targetHash !== '#' &&
                                            _this.targetHash.indexOf('#') === 0 && _this.options.historyPush) {
                                            if (document.location && document.location.hash !== _this.targetHash) {
                                                window.history.pushState('', '', _this.targetHash);
                                            }
                                        }
                                        r();
                                    }
                                }, 16);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ScrollToManager.prototype.parseLocations = function () {
        this.startLocation = window.pageYOffset;
        this.endLocation = 0;
        var parent = this.target;
        while (parent.offsetParent) {
            this.endLocation += parent.offsetTop;
            parent = parent.offsetParent;
        }
        this.endLocation -= this.options.offset;
    };
    ScrollToManager.prototype.easing = function (time) {
        var pattern = 1;
        switch (this.options.easing) {
            case 'easeInQuad':
                pattern = time * time;
                break;
            case 'easeOutQuad':
                pattern = time * (2 - time);
                break;
            case 'easeInOutQuad':
                pattern = pattern = time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time;
                break;
            case 'easeInCubic':
                pattern = time * time * time;
                break;
            case 'easeOutCubic':
                pattern = (--time) * time * time + 1;
                break;
            case 'easeInOutCubic':
                pattern = time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1;
                break;
            case 'easeInQuart':
                pattern = time * time * time * time;
                break;
            case 'easeOutQuart':
                pattern = 1 - (--time) * time * time * time;
                break;
            case 'easeInOutQuart':
                pattern = time < 0.5 ? 8 * time * time * time * time : 1 - 8 * (--time) * time * time * time;
                break;
            case 'easeInQuint':
                pattern = time * time * time * time * time;
                break;
            case 'easeOutQuint':
                pattern = 1 + (--time) * time * time * time * time;
                break;
            case 'easeInOutQuint':
                pattern = time < 0.5 ? 16 * time * time * time * time * time :
                    1 + 16 * (--time) * time * time * time * time;
                break;
        }
        return pattern;
    };
    return ScrollToManager;
}());
//# sourceMappingURL=scroll-to.js.map