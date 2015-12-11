/*!
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.onReady(function () {    

    //Ext.define('LogEntry', {
    //    extend: 'Ext.data.Model',
    //    fields: [
    //       { name: 'text' }
          
    //    ]
    //});

    var store = Ext.create('Ext.data.Store', {
      //  model: 'LogEntry',
        data: [
            { text: 'item 1' },
            { text: 'item 2' },
            { text: 'item 3' },
            { text: 'item 4' },
            { text: 'item 5' }
        ]
    });


    var panel = new Ext.Panel({
        id: 'images-view',
        renderTo:document.body,
        frame: true,
        width: 535,
        autoHeight: true,
        collapsible: true,
        layout: 'fit',
        title: 'Simple DataView (0 items selected)',
        
        items:[{
            xtype: 'dataview',
            store: store,
            tpl: Ext.create('Ext.XTemplate',
                '<tpl for=".">',
                    '<div class="logentry">',
                        '<span>{text}</span>',
                        '<div class="removeicon"></div>',
                    '</div>',
                '</tpl>'
            ),
            itemSelector: 'div.logentry',
            trackOver: true,
            overItemCls: 'logentry-hover'
        }]
    });

});