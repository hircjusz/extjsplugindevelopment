
Ext.onReady(function() {

    Ext.define('ns.view.gridsearch.GridSearchGrid', {
        extend: 'Ext.grid.Panel',
        alias: 'widget.gridsearchgrid',
        requires: [
            'ns.store.DummyStore'
        ],

        constructor: function(config) {

            Ext.apply(this, {
                border: false,
                store: Ext.create('ns.store.DummyStore'),
                plugins: ['gridsearch'],
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        dock: 'top'
                    }
                ],

                columns: [
                    {
                        header: 'Name',
                        dataIndex: 'name',
                        flex: 1
                    }, {
                        xtype: 'datecolumn',
                        header: 'Birth date',
                        dataIndex: 'birthdate',
                        format: 'm/d/Y'
                    }
                ]
            });

            this.callParent(arguments);

        }
    });

    var grid = Ext.create('ns.view.gridsearch.GridSearchGrid');
    grid.render('grid');
});
