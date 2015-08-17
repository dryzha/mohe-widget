/**
 * Created by dingrenyi on 15-8-17.
 */
define(function(require, exports, module) {
    var W = require('../widget/widget').W,
        Tab = require('../mod/tab').Tab,
        Class = require('../class/class');

    var tab_ext = new Class({
        __construct: function () {
            this.on('__tab', function ( index ) {
               $('#showtext').html( '点击了第' +(++index)+ '个标签');
            });
        }
    }, Tab)
    exports.Tab_ext = W.Tab_ext = tab_ext;
});