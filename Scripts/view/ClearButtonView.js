
Ext.onReady(function() {

    Ext.define('ns.view.ClearButtonView', {
        extend: 'Ext.Panel',
        alias: 'widget.clearbutton',
        constructor: function(config) {

            Ext.apply(this, {
                modal: true,
                width: 300,
                height: 230,
                title: 'ClearButton plugin',
                layout: 'fit',
                items: [{
                    xtype: 'form',
                    bodyPadding: 10,
                    defaults: {
                        anchor: '95%'
                    },
                    items: [{
                        xtype: 'textfield',
                        plugins: ['clearbutton'],
                        value: 'textfield'
                    }
                    //, {
                    //    xtype: 'textareafield',
                    //    //lugins: ['clearbutton'],
                    //    value: 'textareafield'
                    //}, {
                    //    xtype: 'combobox',
                    //    //plugins: ['clearbutton'],
                    //    value: 'combobox'
                    //}, {
                    //    xtype: 'datefield',
                    //    //plugins: ['clearbutton'],
                    //    value: new Date()
                    //}
                    ]
                }]
            });

            this.callParent(arguments);

        }
    });

    var grid = Ext.create('ns.view.ClearButtonView');
    grid.render('grid');
});
