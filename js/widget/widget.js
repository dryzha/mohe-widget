/**
 * Copyright (c)
 * @intro 自动实例化类 data-w-type是类名 data-w-options是配置参数
 * @author
 */

define(function(require, exports, module) {
    var Widgets = {};

    Widgets.inherit = function(Parent, Child) {
        var prototype = Object(Parent.prototype);
        prototype.constructor = Child;
        Child.prototype = prototype;
    };

    exports.W = Widgets;
});
