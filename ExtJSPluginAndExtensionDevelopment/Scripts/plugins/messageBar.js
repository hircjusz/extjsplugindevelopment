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
                        this.setMessageData({
                            text: cfg.text,
                            iconCls: 'x-message-' + (cfg.type || '') + ' ',
                            clear: Ext.isDefined(cfg.clear) ? cfg.clear : true

                        });
                        //cmp.select('.x-message-bar-msg').update(cfg.text);
                    },
                    scope: this
                });
            }

            //todo icon classes
           // cmp.select('.x-message-bar-msg').update(cfg.text);
           // cmp.show();
        },
        setMessageData: function(o) {
            o = o || {};
            if (o.text) {
                this.setText(o.text);
            }
            if (o.iconCls) {
                var bar = Ext.get(this.id + '-bar');

                if (o.iconCls == 'x-message-error ') {
                    bar.removeCls('x-message-msg-body');
                    bar.addCls('x-message-error-body');
                } else {
                    bar.removeCls('x-message-error-body');
                    bar.addCls('x-message-msg-body');
                }
                this.setIcon(o.iconCls);

            }
            if (o.clear) {
                var c = o.clear;
                if (Ext.isNumber(c)) {

                    Ext.defer(this.clearMessage, c, this, [c]);
                }
            }


        },
        setIcon: function(cls) {

            cls = cls || '';
            if (this.currIconCls) {
                Ext.get(this.id + '-bar').removeCls(this.currIconCls);
                this.currIconCls = null;
            }
            if (cls.length > 0) {
                Ext.get(this.id + '-bar').addCls(cls);
                this.currIconCls = cls;
            }
            return this;
        },

        setText: function(text) {
            this.text = text || '';
            if (this.rendered) {
                Ext.get(this.id + '-bar').select('.x-message-bar-msg').update(this.text);
            }
            return this;
        }
    });

});