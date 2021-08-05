/* version: 1.0.3 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global['MINI-MEMOIZE'] = factory());
}(this, (function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }

    // LRUCache
    var Cache = /** @class */ (function () {
        function Cache(max) {
            this.max = max;
            this.cache = new Map();
        }
        Cache.prototype.get = function (key) {
            var value = this.cache.get(key);
            if (value) {
                this.cache.delete(key);
                this.cache.set(key, value);
            }
            return value;
        };
        Cache.prototype.set = function (key, value) {
            if (this.max && this.cache.size === this.max) {
                if (this.cache.has(key)) {
                    this.cache.delete(key);
                }
                else {
                    this.cache.delete(this.cache.keys().next().value);
                }
            }
            this.cache.set(key, value);
        };
        Cache.prototype.delete = function (key) {
            return this.cache.delete(key);
        };
        Cache.prototype.clear = function () {
            this.cache.clear();
        };
        Cache.prototype.has = function (key) {
            return this.cache.has(key);
        };
        return Cache;
    }());

    var Event = /** @class */ (function () {
        function Event() {
            this.events = new Map();
        }
        Event.prototype.on = function (type, listener) {
            var listeners = this.events.get(type);
            if (!listeners) {
                this.events.set(type, []);
                listeners = this.events.get(type);
            }
            listeners.push(listener);
        };
        Event.prototype.off = function (type, listener) {
            var listeners = this.events.get(type);
            if (listeners) {
                var index = listeners.indexOf(listener);
                index > -1 && listeners.splice(index, 1);
            }
        };
        Event.prototype.emit = function (type) {
            var _this = this;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var listeners = this.events.get(type);
            if (listeners) {
                listeners.forEach(function (fn) {
                    fn.apply(_this, args);
                });
            }
        };
        return Event;
    }());

    var stringify = JSON.stringify;
    function index (fn, options) {
        var cache = new Cache(options ? options.max : null);
        var event = new Event();
        var memoize = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (args.length === 0)
                return fn.call(this);
            var key = stringify(args);
            var value = cache.get(key);
            if (!value) {
                value = fn.call.apply(fn, __spreadArray([this], args));
                cache.set(key, value);
            }
            return value;
        };
        memoize.get = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            event.emit('get', args);
            return cache.get(stringify(args));
        };
        memoize.delete = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            event.emit('delete', args);
            return cache.delete(stringify(args));
        };
        memoize.clear = function () {
            event.emit('clear');
            cache.clear();
        };
        memoize.has = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return cache.has(stringify(args));
        };
        memoize.on = function (type, listener) {
            event.on(type, listener);
        };
        memoize.off = function (type, listener) {
            event.off(type, listener);
        };
        return memoize;
    }

    return index;

})));
