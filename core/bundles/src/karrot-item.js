"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var data_parser_1 = require("./utils/data-parser");
var hooks_1 = require("./addon/hooks");
// tslint:disable:no-any
var KarrotItem = /** @class */ (function () {
    function KarrotItem(element) {
        this.element = element;
        this.names = [];
        this.attachments = [];
        this.hooks = new hooks_1.Hooks();
        this._settings = data_parser_1.DataParser.parse(this.element);
    }
    Object.defineProperty(KarrotItem.prototype, "settings", {
        get: function () {
            return this._settings;
        },
        enumerable: true,
        configurable: true
    });
    KarrotItem.prototype.appendSettings = function (settings) {
        this._settings = Object.assign({}, settings, this.settings);
        return this._settings;
    };
    KarrotItem.prototype.attach = function () {
        var attachments = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            attachments[_i] = arguments[_i];
        }
        var _loop_1 = function (attachment) {
            var existingInstance = this_1.attachments.find(function (a) {
                return Object.getPrototypeOf(a) === attachment.prototype;
            });
            if (existingInstance) {
                return "continue";
            }
            var instance = (new attachment(this_1));
            if (instance.kOnInit && typeof instance.kOnInit === 'function') {
                instance.kOnInit();
            }
            this_1.attachments.push(instance);
        };
        var this_1 = this;
        for (var _a = 0, attachments_1 = attachments; _a < attachments_1.length; _a++) {
            var attachment = attachments_1[_a];
            _loop_1(attachment);
        }
    };
    KarrotItem.prototype.attachment = function (type) {
        return this.attachments.find(function (a) { return a instanceof type; });
    };
    return KarrotItem;
}());
exports.KarrotItem = KarrotItem;
//# sourceMappingURL=karrot-item.js.map