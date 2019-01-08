"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cookies = /** @class */ (function () {
    function Cookies() {
    }
    Cookies.prototype.set = function (cookieName, cookieValue, expireDays) {
        if (expireDays === void 0) { expireDays = 30; }
        var d = new Date();
        d.setTime(d.getTime() + (expireDays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
    };
    Cookies.prototype.get = function (cookieName) {
        var name = cookieName + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var _i = 0, ca_1 = ca; _i < ca_1.length; _i++) {
            var c = ca_1[_i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    };
    return Cookies;
}());
exports.Cookies = Cookies;
//# sourceMappingURL=cookies.js.map