Ext.onReady(function () {

    var myExamples1 = function () {
        var myDiv1 = Ext.get('div1');

        //myDiv1.on('click', function() {
        //    myDiv1.setHeight(200);
        //});

        myDiv1.setSize(350, 350, { duration: 1, easing: 'bounceOut' });
        myDiv1.highlight();
        myDiv1.createChild('Child from a string');
        myDiv1.createChild('<div>Element from a string</div>');
        myDiv1.createChild({
            tag: 'div',
            html: 'Child from a config object'
        });
        myDiv1.createChild({
            tag: 'div',
            id: 'nestedDiv',
            style: 'border: 1px dashed; padding: 5px;',
            children: {
                tag: 'div',

                html: '...a nested div',
                style: 'color: #EE0000; border: 1px solid'
            }
        });

        var myTpl = Ext.create('Ext.Template', "<div>Hello {0}.</div>");
        myTpl.append(document.body, ['Marjan']);
        myTpl.append(document.body, ['Michael']);
        myTpl.append(document.body, ['Sebastian']);

        var myTpl2 = Ext.create('Ext.Template', [
            '<div style="background-color:{color};margin: 10px;">',
            '<b>Name :</b> {name} <br/>',
            '<b>Age :</b> {age} <br/>',
            '<b>DOB :</b> {dob} <br/>',
            '</div>'
        ]);

        myTpl2.compile();

        myTpl2.append(document.body, {
            color: '#E9e9FF',
            name: 'John Smith',
            age: '20',
            dob: '10/20/89'
        });

        myTpl2.append(document.body, {
            color: '#E9e9FF',
            name: 'Naomi White',
            age: '25',
            dob: '10/20/89'
        });

        var myTplData = [
            {
                color: '#E9e9FF',
                name: 'John Smith v2',
                age: '20',
                dob: '10/20/89',
                cars: ['Civic', 'Camry', 'S20000']
            },
            {
                color: '#E9e9FF',
                name: 'Naomi White v2',
                age: '25',
                dob: '10/20/89',
                cars: ['Civic', 'Accord', 'Camry']
            }
        ];

        var myTplAdvanced = Ext.create('Ext.XTemplate', [
            '<tpl for=".">',
            '<div style="background-color:{color};margin:10px;"',
            '<b>Name :</b> {name} <br/>',
            '<b>Age :</b> {age} <br/>',
            '<b>DOB :</b> {dob} <br/>',
            '</div>',
            '</tpl>'
        ]);

        myTplAdvanced.compile();
        myTplAdvanced.append(document.body, myTplData);

        var myTplAdvCars = Ext.create('Ext.XTemplate', [
            '<tpl for=".">',
            '<div style="background-color:{color};margin:10px;"',
            '<b>Name :</b> {name} <br/>',
            '<b>Age :</b> {age} <br/>',
            '<b>DOB :</b> {dob} <br/>',
            '<b>Cars: </b>',
            '<tpl for="cars">',
            '{.}',
            '<tpl if="this.isCamry(values)">',
            '<b> (same car)</b>',
            '</tpl>',
            '{[(xindex<xcount? ",":"")]}',
            '</tpl>',
            '<br/>',
            '</div>',
            '</tpl>', {
                isCamry: function (car) {
                    return car === 'Camry';
                }
            }
        ]);
        myTplAdvCars.compile();
        myTplAdvCars.append(document.body, myTplData);

        var myPanel = Ext.create('Ext.panel.Panel', {
            //xtype: 'panel',
            height: 100,
            width: 100,
            html: 'Hello!',
            renderTo: document.body,
            frame: true
        });

        Ext.define('mycustom.field1', {
            extend: 'Ext.Component',
            renderTo: document.body,
            renderTpl: '<input type="text" value="{name}"></input>',
            renderData: { name: 'LeVeon' }
            //html:'custom component'
        });
        var myCustomComponent = Ext.create('mycustom.field1');

    };

    var myPluginReadonlyField = function () {

        Ext.define('Ext.ux.ReadOnlyField', {
            alias:'plugin.readonlybutton',
            init: function(parent) {
                this.parent = parent;
                this.initEventHandlers();
                this.parent.save = this.save;
            },
            save: function() {
                 if (this.rendered) {
                     this.displayEl.update(this.getValue());
                     this.displayEl.show();
                     this.inputEl.hide();
                 }
            },
            initEventHandlers: function() {
                 this.parent.on({
                     render: this.onParentRender,
                     scope: this
                 });
            }, onParentRender: function(field) {
                field.displayEl =
                    Ext.DomHelper.append(field.bodyEl, {
                        tag: 'div',
                        style:
                            {
                                height: '22px',
                                "line-height": '18px',
                                margin: '2px 0 0 5px'
                            }
                    }, true).setVisibilityMode(Ext.Element.DISPLAY);
                field.inputEl.setVisibilityMode(Ext.Element.DISPLAY);
            }
        });

        var form = Ext.create('Ext.form.Panel',
            {
                renderTo: Ext.getBody(),
                bbar: [{ xtype: 'button', text: 'Edit' },
                    {
                        xtype: 'button',
                        text: 'Save',
                        handler: function() {
                            form.items.get(0).save();
                        }
                    },
                    { xtype: 'button', text: 'Cancel' }],
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Email Address',
                    plugins: ['readonlybutton']
                }]
            });
    };
    myPluginReadonlyField();


});