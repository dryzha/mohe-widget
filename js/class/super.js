/**
 * 类
 * @module Class
 */
define(function (require, exports, module) {

    "use strict";

    var Util = require('../util/util');

    /**
     * 超类
     * @class Super
     * @constructor
     */
    var Super = function () {},
        dummy = function () {};

    Super.uber = Super.prototype = {

        _Super: Util.guid,

        /**
         * 构造函数
         * @method .__construct
         */
        __construct: function (options) {
            this.__eventList = {};
            // 增加订阅
            if (Util.isPlainObject(options) && Util.isPlainObject(options.on)) {
                this.on(options.on);
                // 删除数据，避免多次订阅
                options.on = null;
            }
        },

        /**
         * 绑定事件，暂不支持命名空间
         * @param {string} en 事件名
         * @param {function} fn 绑定回调函数
         * @method .on
         */
        on: function (en, fn) {
            var el = this.__eventList,
                on = {};
            if (Util.isPlainObject(el)) {
                if (Util.isPlainObject(en)) {
                    on = en;
                } else {
                    on[en] = fn;
                }
                Util.each(on, function (en, fn) {
                    if (Util.hasProp.call(el, en) && el[en])
                        el[en].push(fn);
                    else
                        el[en] = [fn];
                });
            }
            return this;
        },

        /**
         * 解除绑定的事件
         * @param {string} en 事件名
         * @param {function} fn 绑定回调函数
         * @method .off
         */
        off: function (en, fn) {
            var el = this.__eventList;
            if (Util.isPlainObject(el) && Util.hasProp.call(el, en)) {
                if (typeof fn === 'function') {
                    Util.each(el[en], function (i, n) {
                        if (n === fn)
                            el[en].splice(i, 1);
                    }, true);
                } else {
                    el[en] = null;
                }
            }
            return this;
        },

        /**
         * 触发绑定的事件
         * @param {string} en 事件名
         * @method .fire
         */
        fire: function (en) {
            var el = this.__eventList,
                args = [];
            if (Util.isPlainObject(el) && Util.hasProp.call(el, en)) {
                if (arguments.length > 1)
                    args = Util.arrSlice.call(arguments, 1);
                Util.proxy(el[en], this).apply(this, args);
            }
            return this;
        },

        /**
         * 扩展实例方法，返回当前实例
         * @param {object} obj1 实例方法集
         * @param {object} [objN] 实例方法集
         * @return {object}
         * @method .extend
         */
        extend: function (/*obj1[, objN]*/) {
            var args = Util.arrSlice.call(arguments, 0);
            args.unshift(true, this);
            Util.extend.apply(null, args);
            return this;
        }

    };

    /**
     * 类继承
     * @param {function} Child 子类
     * @param {function} Parent 父类
     * @method Super.inherit
     * @static
     */
    Super.inherit = function (Child, Parent) {
        dummy.prototype = Parent.prototype;
        Child.prototype = new dummy();
        Child.uber = Parent.prototype;
        Child.prototype.constructor = Child;
    };

    return Super;

});