/**
 * Copyright (c)
 * @intro 自动实例化类 data-w-type是类名 data-w-options是配置参数
 * @author
 */

define(function(require, exports, module) {
    // 引入widget
    var W = require('./widget').W;

    var Class = require('../class/class');

    var Instantiate = new Class({
        /**
         * 构造函数
         * @param options {Json}
         * @private
         */
        __construct: function ( options ) {
            this.options = $.extend(true, {
                }, options );
            this.init();
        },
        init: function () {
            var that = this;
            if ($('[data-w-type]').length === 0) {
                return;
            }
            $.each($('[data-w-type]'), function() {
                var config = $(this).attr('data-w-options');
                that._create($(this).attr('data-w-type'), config && $.parseJSON(config), this);
            });
            this.fire('ready');
        },
        _create: function (type, options, element) {
            if(/\./.test(type) && /^(W\.)/.test(type)){
                    var className = type.split('.')[1];
                    W[className] && new W[className](options).init(element);
            }
            // 实例化类
            else{
                console.log( new W[type](options).init );
                W[type] && new W[type](options).init(element) ;

            }
        }
    })
    new Instantiate;
});
