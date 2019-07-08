/*!
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.onReady(function () {

    var form = new Ext.form.FormPanel({
        renderTo: Ext.getBody(),
        items: [
		{
		    xtype: "textfield",
		    label: "TextField",
		    plugins: Ext.create('Examples.plugin.Sms')//['plugin.sms']
		}
	]
    });
});