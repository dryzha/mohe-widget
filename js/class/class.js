/**
 * 类
 * @module Class
 */
define(function (require, exports, module) {

    "use strict";

    var Util = require('../util/util'),
        Super = require('./super');

    /**
     * 标准类
     * @class Class
     * @extends Super
     * @param {object} [Proto] 将要扩展的实例方法集
     * @param {function} [Brood] 将要继承的父类（只继承其原型方法）
     * @return {function}
     * @constructor
     */
    var Class = function (/*[Proto][, Brood]*/) {

        var args = Util.arrSlice.call(arguments, 0),
            Dummy,
            Proto,
            Brood;

        switch (args.length) {
            case 2:
                if (Util.isPlainObject(args[0]))
                    Proto = args[0];

                if (typeof args[1] === 'function')
                    Brood = args[1];

                break;
            case 1:
                if (typeof args[0] === 'function')
                    Brood = args[0];
                else if (Util.isPlainObject(args[0]))
                    Proto = args[0];

                break;
        }

        Dummy = function () {
            var _this = this,
                _args = Util.arrSlice.call(arguments, 0),
                _uber = function (uber) {
                    if (uber && Util.hasProp.call(uber, '__construct')){
                        _uber.call(this, uber.constructor.uber);
                        uber.__construct.apply(this, _args);
                    }
                },
                _func = _this.constructor,
                _prot = _func.prototype;

            // call parents' __construct
            _uber.call(_this, _func.uber);

            // call __construct
            if (Util.hasProp.call(_prot, '__construct'))
                _prot.__construct.apply(_this, _args);

            // load __plugins
            if (Util.hasProp.call(_func, '__plugins'))
                Util.each(_func.__plugins, function (n, f) {
                    f.apply(_this, args);
                });

            // notify constructed, for plugins
            this.fire('load');
        };

        // plugins
        Dummy.__plugins = (Brood && Brood.__plugins) ? Brood.__plugins : {};
        Dummy.plugins = function (plugins) {
            Util.extend(Dummy.__plugins, plugins);
        };

        // make sure Classes inherited from Super or Super's sub-classes
        if (typeof Brood === 'undefined')
            Brood = Super;
        else if (!Util.isPlainObject(Brood.uber) || Brood.uber._Super !== Util.guid)
            Super.inherit(Brood, Super);

        Super.inherit(Dummy, Brood);

        if (typeof Proto !== 'undefined')
            Util.extend(Dummy.prototype, Proto);

        return Dummy;

    };

    return Class;

});