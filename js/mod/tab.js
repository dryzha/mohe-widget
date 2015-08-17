/**
 * Copyright (c) 2013 - 2014, Sohu Inc. All rights reserved.
 * @fileoverview Sohu
 * @author
 * @version
 */
/**
 * 简单的选项卡功能
 * 点击选项卡菜单，对应的内容显示，隐藏其他内容
 * 无任何动态效果
 */
define(function(require, exports, module) {
    var W = require('../widget/widget').W,
        Class = require('../class/class');


    var tab = new Class({
        __construct: function( options ) {
            this.options = $.extend(true, {
                wrap: '[uTag="tabWrap"]',
                // 幻灯片容器下的轮播大图容器
                viewWrap: '[uTag="tabViewWrap"]',
                // 幻灯片容器下的轮播小图容器
                menuWrap: '[uTag="tabMenuWrap"]',
                // menu焦点类名
                activeCls: 'on',
                // 切换的事件名
                events: 'click',
                // 自动播放
                autoPlay: false,
                // 自动播放时间间隔
                delay: 2000
            }, options);
            this._guid = + new Date();
            this._parent = $( this.options.wrap );
            this._parent.data('guid', this._guid);
        },
        /**
         * 初始化
         * @return {[undefined]} [undefined]
         */
        init: function( ) {

            /* console.log( 'tab_init' );*/
            // 自动播放的定时器对象
            this.timer = null;
            // 自动播放
            this.autoPlay();
            // 初始化菜单事件
            this.initMenuEvt();

        },
        /**
         * 自动播放
         * @return {[Object]} this [当前创建的对象]
         */
        autoPlay: function() {
            var me = this;
            var options = this.options;
            // 自动播放
            if (options.autoPlay) {
                // 开启定时器
                this.timer = window.setInterval(function() {
                    // 获取焦点元素焦点
                    var elem = me.getActiveElem();
                    // 切换包括切换菜单和内容
                    me.switchs(elem);
                }, options.delay);
                // 调用停止
                this.pause();
            }
            return this;
        },
        /**
         * 暂停
         * @return {[Object]} this [当前创建的对象]
         */
        pause: function() {
            var me = this;
            var options = this.options;
            // 鼠标悬停暂停播放清除定时器，鼠标立刻开启定时器
            me._parent.find(options.menuWrap).parent().hover(function() {
                clearInterval(me.timer);
            }, function() {
                me.autoPlay();
            });
            return this;
        },
        /**
         * 获取焦点元素节点
         * @return {[Object]} [焦点元素节点]
         */
        getActiveElem: function() {
            var options = this.options;
            var children = me._parent.find(options.menuWrap).children();
            var curIndex = 0;
            var curElem = $();
            $.each(children, function(i, v) {
                if ($(this).hasClass(options.activeCls)) {
                    curIndex = ++i;
                    return;
                }
            });
            curIndex = curIndex >= children.length ? 0 : curIndex;
            return children.eq(curIndex).get(0);
        },
        /**
         * 初始化选项卡菜单事件
         * @return {[undefined]} [undefined]
         */
        initMenuEvt: function() {
            var me = this;
            var options = me.options;
            // 绑定选项卡菜单事件
            me._parent.find(options.menuWrap).children().on(options.events, function( e ) {
                e.preventDefault();
                // 调用切换方法
                console.log('click');
                me.switchs(this);
                me.fire('__tab', $( this ).index() );
            });
        },
        /**
         * 切换包括切换菜单和切换内容
         * @param  {[Object]} elem [当前点击的元素节点]
         * @return {[Object]} this [当前创建的对象]
         */
        switchs: function(elem) {
            // 切换菜单
            this.switchMenu(elem);
            // 切换内容
            this.switchView(elem);
            // 返回this
            return this;
        },
        /**
         * 切换选项卡菜单
         * @param  {[Object]} elem [当前点击的元素节点]
         * @return {[Object]} this [当前创建的对象]
         */
        switchMenu: function(elem) {
            // 当前状态的class值
            var activeCls = this.options.activeCls;
            // 当前元素节点添加class且其他元素节点删除class
            $(elem).addClass(activeCls).siblings().removeClass(activeCls);
            // 返回this
            return this;
        },
        /**
         * 切换选项卡内容
         * @param  {[Object]} elem [当前点击的元素节点]
         * @return {[Object]} this [当前创建的对象]
         */
        switchView: function(elem) {
            var options = this.options;
            // 获取当前元素节点的索引值
            var index = $(elem).index();
            // 获取所有内容节点
            var children = this._parent.find(options.viewWrap).children();
            // 隐藏所有的内容
            children.hide();
            // 显示相应内容
            children.eq(index).show();
            // 返回this
            return this;
        }
    })
    exports.Tab = W.Tab = tab ;
});
