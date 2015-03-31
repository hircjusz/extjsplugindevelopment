/*!
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.onReady(function () {

    Ext.define('ns.plugin.ClearButton', {
        alias: 'plugin.clearbutton',
        constructor: function (cfg) {
            Ext.apply(this, cfg);

            this.callParent(arguments);
        },
        init: function (textField) {
            this.textField = textField;
            if (!textField.rendered) {
                textField.on('afterrender', this.handleAfterRender, this);
            }
            else {
                // probably an existing input element transformed to extjs field
                this.handleAfterRender();
            }
        },
        handleAfterRender: function () {

            this.TextArea = this.textField.inputEl.dom.type.toLowerCase() == 'textarea';
            this.createClearButtonEl();
            this.addListeners();
        },

        createClearButtonEl: function () {
            this.createClearButtonEl = this.textField.bodyEl.createChild({
                tag: 'div',
                cls:this.clearButtonsCls
            });
        },
        addListeners: function() {
            
            var textField = this.textField;
            var bodyEl = textField.bodyEl;


        }


    });

});