/**
 * 基础库
 * @module Util
 */
define(function (require, exports, module) {

    "use strict";

    /**
     * Util库
     * @class Util
     * @static
     */
    var Util = function () {};

    // Util.prototype.constructor = Util;

    /**
     * NUID
     * 生成一个新的GUID
     * @return {string} 数据类型
     * @method Util.nuid
     */
    Util.nuid = function () {
        return new Date().getTime().toString(36);
    };

    /**
     * GUID
     * @property Util.guid
     */
    Util.guid = Util.nuid();

    /**
     * NOOP
     * @property Util.noop
     */
    Util.noop = function () {};

    /**
     * Object.prototype.toString
     * @method Util.obj2str
     */
    Util.obj2str = Object.prototype.toString;

    /**
     * Object.prototype.hasOwnProperty
     * @method Util.hasProp
     */
    Util.hasProp = Object.prototype.hasOwnProperty;

    /**
     * Array.prototype.shift
     * @method Util.arrShift
     */
    Util.arrShift = Array.prototype.shift;

    /**
     * Array.prototype.slice
     * @method Util.arrSlice
     */
    Util.arrSlice = Array.prototype.slice;

    /**
     * 获取对象数据类型
     * @param {object} obj 对象
     * @return {string} 数据类型
     * @method Util.typeOf
     */
    Util.typeOf = function (obj) {
        if (typeof obj === 'undefined')
            return 'undefined';
        if (typeof obj === 'object' && !obj)
            return 'null';
        return Util.obj2str.call(obj).match(/^\[object ([a-z]+)\]$/i)[1].toLowerCase();
    };

    /**
     * 迭代对象和数组
     * @param {object} obj 对象或数组
     * @param {function} callback 迭代函数
     * @param {boolean} reverse 反转方向迭代（仅当对象是数组时有效）
     * @method Util.each
     */
    Util.each = function (obj, callback, reverse) {
        var i,
            n,
            t = Util.typeOf(obj);
        if (t === 'array') {
            if (reverse) {
                for (i = obj.length - 1; i >= 0; i--)
                    if (callback.call(obj[i], i, obj[i]) === false)
                        break;
            } else {
                for (i = 0, n = obj.length; i < n; i++)
                    if (callback.call(obj[i], i, obj[i]) === false)
                        break;
            }
        } else if (t === 'object') {
            for (i in obj)
                if (callback.call(obj[i], i, obj[i]) === false)
                    break;
        }
    };

    /**
     * 返回元素在数组里的索引，未找到则返回-1
     * @param {mixed} elem 需要查找的元素
     * @param {array} arr 数组
     * @returns {type}
     */
    Util.inArray = function (elem, arr) {
        var index = -1;
        if (Util.isArray(arr)) {
            Util.each(arr, function (i, n) {
                if (n === elem) {
                    index = i;
                    return false;
                }
            });
        }
        return index;
    };

    /**
     * 检查是否为数组
     * @param {object} obj 对象
     * @return {boolean}
     * @method Util.isArray
     */

    /**
     * 检查是否为布尔型
     * @param {object} obj 对象
     * @return {boolean}
     * @method Util.isBoolean
     */

    /**
     * 检查是否为日期对象
     * @param {object} obj 对象
     * @return {boolean}
     * @method Util.isDate
     */

    /**
     * 检查是否为错误对象
     * @param {object} obj 对象
     * @return {boolean}
     * @method Util.isError
     */

    /**
     * 检查是否为函数对象
     * @param {object} obj 对象
     * @return {boolean}
     * @method Util.isFunction
     */

    /**
     * 检查是否为NULL
     * @param {object} obj 对象
     * @return {boolean}
     * @method Util.isNull
     */

    /**
     * 检查是否为数值型
     * @param {object} obj 对象
     * @return {boolean}
     * @method Util.isNumber
     */

    /**
     * 检查是否为对象，由对象字面量或new构造
     * @param {object} obj 对象
     * @return {boolean}
     * @method Util.isObject
     */

    /**
     * 检查是否为正则表达式对象
     * @param {object} obj 对象
     * @return {boolean}
     * @method Util.isRegExp
     */

    /**
     * 检查是否为字符型
     * @param {object} obj 对象
     * @return {boolean}
     * @method Util.isString
     */

    /**
     * 检查是否为未定义
     * @param {object} obj 对象
     * @return {boolean}
     * @method Util.isUndefined
     */
    Util.each(['Array', 'Boolean', 'Date', 'Error', 'Function', 'Null',
            'Number', 'Object', 'RegExp', 'String', 'Undefined'],
        function (i, n) {
            Util['is' + n] = function (obj) {
                return Util.typeOf(obj) === n.toLowerCase();
            };
        });

    /**
     * 检查是否为空对象
     * @param {object} obj 对象
     * @return {boolean}
     * @method Util.isEmptyObject
     */
    Util.isEmptyObject = function(obj) {
        var key;
        if (typeof obj !== 'object')
            return false;
        for (key in obj)
            return false;
        return true;
    };

    /**
     * 检查是否为纯对象，`{}`或`new Object`
     * @param {object} obj 对象
     * @return {boolean}
     * @method Util.isPlainObject
     */
    Util.isPlainObject = function (obj) {
        if (!obj || typeof obj !== 'object' || obj.nodeType || Util.isWindow(obj))
            return false;

        if (obj.constructor && !Util.hasProp.call(obj, 'constructor') && !Util.hasProp.call(obj.constructor.prototype, 'isPrototypeOf'))
            return false;

        return true;
    };

    /**
     * 检查是否浏览器的window对象
     * @param {object} obj 对象
     * @return {boolean}
     * @method Util.isWindow
     */
    Util.isWindow = function (obj) {
        return obj !== null && obj === obj.window;
    };

    /**
     * 将多个对象合并到第一个
     * @param {boolean} [deep] 是否深拷贝
     * @param {object} obj 对象
     * @param {object} obj1 对象
     * @param {object} [objN] 对象
     * @return {object} 合并后的对象
     * @method Util.extend
     */
    Util.extend = function (/*[deep], obj, obj1[, objN]*/) {
        var deep = false,
            args = Util.arrSlice.call(arguments, 0),
            obj = {},
            src;

        if (args.length === 0)
            return obj;

        if (typeof args[0] === 'boolean')
            deep = args.shift();

        if (args.length === 0)
            return obj;

        obj = args.shift();

        while (src = args.shift()) {
            if (!Util.isPlainObject(src))
                continue;

            Util.each(src, function (n, v) {
                if (obj === v)
                    return true;
                if (deep && Util.isPlainObject(v)) {
                    if (!Util.isPlainObject(obj[n]))
                        obj[n] = {};
                    Util.extend(deep, obj[n], v);
                } else {
                    obj[n] = v;
                }
            });
        }

        return obj;
    };

    /**
     * 返回一个绑定了指定上下文的新函数
     * @param {function|array} fn 函数或由函数组成的数组
     * @param {object} ctx 上下文对象
     * @return {function}
     * @method Util.proxy
     */
    Util.proxy = function (fn, ctx) {
        if (typeof fn === 'function')
            return function () {
                return fn.apply(ctx, arguments);
            };
        else if (Util.isArray(fn))
            return function () {
                var r = [], i, n;
                for (i = 0, n = fn.length; i < n; i++)
                    if (typeof fn[i] === 'function')
                       r.push(fn[i].apply(ctx, arguments));
                return r;
            };
        else
            return Util.noop;
    };

    return Util;

});