"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function DOM() {
    var elements = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        elements[_i] = arguments[_i];
    }
    return new DOMManager(elements);
}
exports.DOM = DOM;
var DOMManager = /** @class */ (function () {
    function DOMManager(elements) {
        var _this = this;
        this._class = {
            add: function () {
                var _a;
                var classNames = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    classNames[_i] = arguments[_i];
                }
                for (var _b = 0, _c = _this._elements; _b < _c.length; _b++) {
                    var element = _c[_b];
                    (_a = element.classList).add.apply(_a, classNames);
                }
                return _this;
            },
            remove: function () {
                var _a;
                var classNames = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    classNames[_i] = arguments[_i];
                }
                for (var _b = 0, _c = _this._elements; _b < _c.length; _b++) {
                    var element = _c[_b];
                    (_a = element.classList).remove.apply(_a, classNames);
                }
                return _this;
            },
            toggle: function () {
                var classNames = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    classNames[_i] = arguments[_i];
                }
                for (var _a = 0, _b = _this._elements; _a < _b.length; _a++) {
                    var element = _b[_a];
                    for (var _c = 0, classNames_1 = classNames; _c < classNames_1.length; _c++) {
                        var className = classNames_1[_c];
                        element.classList.toggle(className);
                    }
                }
                return _this;
            },
            contains: function () {
                var classNames = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    classNames[_i] = arguments[_i];
                }
                for (var _a = 0, _b = _this._elements; _a < _b.length; _a++) {
                    var element = _b[_a];
                    for (var _c = 0, classNames_2 = classNames; _c < classNames_2.length; _c++) {
                        var className = classNames_2[_c];
                        if (!element.classList.contains(className)) {
                            return false;
                        }
                    }
                }
                return true;
            },
        };
        this._state = {
            set: function (state, value) {
                if (value === void 0) { value = true; }
                for (var _i = 0, _a = _this._elements; _i < _a.length; _i++) {
                    var element = _a[_i];
                    value ? element.classList.add('is-' + state) : element.classList.remove('is-' + state);
                }
                return _this;
            },
            toggle: function (state) {
                _this._state.set(state, !_this._state.is(state));
                return _this;
            },
            is: function (state) {
                for (var _i = 0, _a = _this._elements; _i < _a.length; _i++) {
                    var element = _a[_i];
                    if (!element.classList.contains('is-' + state)) {
                        return false;
                    }
                }
                return true;
            },
        };
        this._attribute = {
            set: function (attr, value) {
                for (var _i = 0, _a = _this._elements; _i < _a.length; _i++) {
                    var element = _a[_i];
                    element.setAttribute(attr, value || '');
                }
                return _this;
            },
            get: function (attr) {
                return _this._elements[0] ? _this._elements[0].getAttribute(attr) || '' : '';
            },
            has: function (attr) {
                for (var _i = 0, _a = _this._elements; _i < _a.length; _i++) {
                    var element = _a[_i];
                    if (!element.hasAttribute(attr)) {
                        return false;
                    }
                }
                return true;
            },
        };
        this._event = {
            add: function (event, listener) {
                var _loop_1 = function (element) {
                    element.addEventListener(event, function (e) {
                        listener(e, element);
                    });
                };
                for (var _i = 0, _a = _this._elements; _i < _a.length; _i++) {
                    var element = _a[_i];
                    _loop_1(element);
                }
                return _this;
            },
        };
        this._elements = [];
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var element = elements_1[_i];
            if (!element) {
                continue;
            }
            if (Array.isArray(element)) {
                this._elements = this._elements.concat(element);
            }
            else {
                this._elements.push(element);
            }
        }
    }
    Object.defineProperty(DOMManager.prototype, "class", {
        get: function () {
            return this._class;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DOMManager.prototype, "state", {
        get: function () {
            return this._state;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DOMManager.prototype, "event", {
        get: function () {
            return this._event;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DOMManager.prototype, "attribute", {
        get: function () {
            return this._attribute;
        },
        enumerable: true,
        configurable: true
    });
    return DOMManager;
}());
//# sourceMappingURL=dom.js.map