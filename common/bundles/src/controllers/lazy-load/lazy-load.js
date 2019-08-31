"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LazyLoad = /** @class */ (function () {
    function LazyLoad(item) {
        this.item = item;
    }
    LazyLoad.prototype.kOnInit = function () {
        this.img = this.item.element;
        if (this.img.src) {
            console.warn(this.img, 'Image already contains src, skipped');
            return;
        }
        // tslint:disable-next-line:max-line-length
        this.img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsq6mrBwAE8QH5A52ECwAAAABJRU5ErkJggg==';
        this.img.style.height = this.item.settings.height + 'px';
        this.img.style.width = this.item.settings.height + 'px';
        this.observer();
    };
    LazyLoad.prototype.observer = function () {
        var _this = this;
        if (!('IntersectionObserver' in window)) {
            this.loadImage();
            return;
        }
        var options = {
            rootMargin: '100px',
            threshold: 0,
        };
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.intersectionRatio > 0) {
                    observer.unobserve(_this.img);
                    _this.loadImage();
                }
            });
        }, options);
        observer.observe(this.img);
    };
    LazyLoad.prototype.loadImage = function () {
        this.img.setAttribute('src', this.item.settings.src);
        this.img.style.height = '';
        this.img.style.width = '';
        var picture = this.img.parentElement;
        if (!picture || picture.nodeName !== "PICTURE") {
            return;
        }
        var sources = Array.from(picture.querySelectorAll('source'));
        for (var _i = 0, sources_1 = sources; _i < sources_1.length; _i++) {
            var source = sources_1[_i];
            var src = source.getAttribute('data-srcset');
            if (src) {
                source.setAttribute('srcset', src);
            }
        }
    };
    return LazyLoad;
}());
exports.LazyLoad = LazyLoad;
//# sourceMappingURL=lazy-load.js.map