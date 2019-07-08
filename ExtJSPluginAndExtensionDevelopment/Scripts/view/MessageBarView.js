
Ext.onReady(function () {

    Ext.define('ns.view.MessageBarView', {
        extend: 'Ext.Panel',
        alias: 'widget.messagebar',
        constructor: function (config) {

            Ext.apply(this, {
                modal: true,
                width: 300,
                height: 230,
                title: 'MessageBar plugin',
                layout: 'fit',
                items: [{
                    xtype: 'form',
                    bodyPadding: 10,
                    defaults: {
                        anchor: '95%'
                    },
                    items: [{
                        xtype: 'textfield',
                        value: 'textfield'
                    },
                    {
                        xtype: 'button',
                        text: 'Show message',
                        handler: function () {
                            this.up('messagebar').showMessage();
                        }
                    }
                    ]
                }],
                dockedItems: [
                    {
                        xtype: 'ux-msgbar'
                    }
                ]
            });

            this.callParent(arguments);

        }, showMessage: function () {
            var text = this.down('textfield').getValue(),
                type =  'info';

            this.down('ux-msgbar').showMessage({
                text: text,
                type: type,
                clear:200
            });

        }
    });

    var view = Ext.create('ns.view.MessageBarView');
    view.render('view');
});
