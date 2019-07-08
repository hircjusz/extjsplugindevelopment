Ext.onReady(function () {

    Ext.define('ns.view.LabeledSpinnerView', {
        extend: 'Ext.Panel',
        alias: 'widget.labeledSpinnerPanel',
        constructor: function (config) {

            Ext.apply(this, {
                modal: true,
                width: 300,
                height: 230,
                title: 'labeledSpinnerPanel plugin',
                layout: 'fit',
                items: [{
                    xtype: 'labeledspinner',
                    fieldLabel: 'Time elapsed',
                    labelText: 'Days',
                    value: 10
                    //flex: 1
                }, {
                    xtype: 'text',
                    flex: 2,
                }]
            });
            this.callParent(arguments);
        }
    });

    var grid = Ext.create('ns.view.LabeledSpinnerView');
    grid.render('grid');
});