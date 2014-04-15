/*!
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.onReady(function () {

    Ext.define("AwesomeClock", {
        extend: "Ext.Component",
        cls: "myclock",
        afterRender: function () {
            this.callParent(arguments);

            this.hourHand = this.el.createChild({cls:"myclock-hand"});
        }
    });

    var clock = new AwesomeClock({
        width: 320,
        height: 320,
        renderTo: Ext.getBody()
    });

});