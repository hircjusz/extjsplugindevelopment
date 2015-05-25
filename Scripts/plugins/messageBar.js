/*!
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.onReady(function () {

    Ext.define('plugin.ux.MessageBar', {
        extend: 'Ext.toolbar.Toolbar',
        alias: 'widget.ux-msgbar',
        activeThreadId: 0,
        dock: 'bottom',
        config: {
            cls: 'x-messagebar',
            emptyText: '',
            defaultText: '',
            autoClear: 5000
        },


        initComponent: function () {
            this.callParent(arguments);
        },
        afterRender: function () {

            var me = this;


            var tpl = new Ext.XTemplate(
                '<div id="{id}-bar" class="{bodyCls}"',
                ' style="width: {width}px; {left}">',
                '<div class="{msgCls}"></div>',
                '<div style="float:right" class="{closeCls}">X</div>',
                '</div>'
            );


            tpl = tpl.apply({
                id: me.id,
                bodyCls: 'x-message-msgbar-body',
                width: me.ownerCt.getWidth() - 10,
                left: Ext.isIE8 ? 'left:5px' : '',
                msgCls: 'x-message-bar-msg',
                closeCls: 'x-message-bar-close'

            });

            me.ownerCt.el.createChild(tpl);

            Ext.select('.x-message-bar-close').on('click', function () {
                me.clearMessage();
            });
            this.callParent(arguments);
        },
        setMessage: function(o) {
            


        },
        clearMessage: function() {
            var bar = Ext.get(this.id + '-bar');
            if (bar) {
                bar.slideOut('b',  {
                    duration: 500,
                    easing: 'easeOut',
                    callback: function() {
                        cmp.select('.x-message-bar-msg').update('');
                    },
                    scope: this
                });

            }

        },
        showMessage: function (cfg) {
            var cmp = Ext.get(this.id + '-bar');

            if (cmp) {
                cmp.slideIn('b', {
                    duration: 500,
                    easing: 'easeIn',
                    callback: function () {
                        cmp.select('.x-message-bar-msg').update(cfg.text);
                    },
                    scope: this
                });
            }

            //todo icon classes
           // cmp.select('.x-message-bar-msg').update(cfg.text);
           // cmp.show();
        }
    });

});