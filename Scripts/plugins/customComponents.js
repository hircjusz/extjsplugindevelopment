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
            alias: 'plugin.readonlybutton',
            init: function (parent) {
                this.parent = parent;
                this.initEventHandlers();
                this.parent.save = this.save;
            },
            save: function () {
                if (this.rendered) {
                    this.displayEl.update(this.getValue());
                    this.displayEl.show();
                    this.inputEl.hide();
                }
            },
            initEventHandlers: function () {
                this.parent.on({
                    render: this.onParentRender,
                    scope: this
                });
            }, onParentRender: function (field) {
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
                        handler: function () {
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


    var mySubmitButton = function () {

        Ext.define('ns.component.Submit', {
            extend: 'Ext.Component',
            renderTo: document.body,
            autoEl: { tag: 'input', cls: 'custom_loginbtn', type: 'submit', value: 'Submit' },
            listeners: {
                afterrender: function (inputCmp) {
                    inputCmp.mon(inputCmp.el, 'click', function () {
                        alert('click');
                    });
                }
            }

        });

        var el = Ext.create('ns.component.Submit');

    };


    var viewImage = function () {

        Ext.define('ns.Image', {
            extend: 'Ext.data.Model',
            fields: [
                { name: 'src', type: 'string' },
                { name: 'caption', type: 'string' }
            ]
        }
            );

        var store = Ext.create('Ext.data.Store', {
            id: 'imagesStore',
            model: 'ns.Image',
            data: [
                 { src: 'http://www.sencha.com/img/20110215-feat-drawing.png', caption: 'Drawing & Charts' },
        { src: 'http://www.sencha.com/img/20110215-feat-data.png', caption: 'Advanced Data' },
        { src: 'http://www.sencha.com/img/20110215-feat-html5.png', caption: 'Overhauled Theme' },
        { src: 'http://www.sencha.com/img/20110215-feat-perf.png', caption: 'Performance Tuned' }
            ]
        });

        Ext.util.Observable.capture(store, function (evname) { console.log(evname, arguments); });


        var searchedStore = Ext.data.StoreManager.lookup('imagesStore');

        var imageTpl = new Ext.XTemplate(
                    '<tpl for=".">',
                      '<div style="margin: 20px; border:1px solid black" class="thumb-wrap">',
                        '<img src="{src}" />',
                        '<br/><span>{caption}</span>',
                      '</div>',
                    '</tpl>'
                );

        var itemContextMenu = Ext.create('Ext.menu.Menu', {
            renderTo: Ext.getBody(),
            items: [{
                text: 'item context menu'
            }]
        });

        var containerContextMenu = Ext.create('Ext.menu.Menu', {
            renderTo: Ext.getBody(),
            items: [{
                text: 'container context menu'
            }]
        });

        var view = Ext.create('Ext.view.View', {
            store: searchedStore,
            tpl: imageTpl,
            imageSelector: 'div.thum-wrap',
            emptyText: 'No images available',
            renderTo: document.body,
            width: 230,
            border: 1,
            margin: '10 10',
            style: {
                borderColor: 'black',
                borderStyle: 'solid'
            },
            listeners: {

                itemcontextmenu: function (view, record, item, index, e) {
                    if (console)
                        console.log('item context menu');

                    e.stopEvent();
                    itemContextMenu.showAt(e.getXY());
                },

                containercontextmenu: function (view, e) {
                    if (console)
                        console.log('container context menu');

                    e.stopEvent();
                    containerContextMenu.showAt(e.getXY());
                }
            },

            selModel: {
                mode: "MULTI",
                ignoreRightMouseSelection: true,
                deselectOnContainerClick: true
            }


        });

        Ext.util.Observable.capture(view, function (evname) { console.log(evname, arguments); });

        //Ext.Component({
        //    autoEl: 'form',
        //    renderTo: document.body
        //});

        Ext.Component({
            renderTo: document.body,

            tpl: '{name} is {age} years old and lives in {location}',

            data: {
                age: 25,
                location: 'Italy',
                name: 'Mario'
            }
        });

        var summary = new Ext.Component({
            renderTo: document.body,

            tpl: '{name} is {age} years old and lives in {location}',

            data: {
                age: 29,
                location: 'Italy',
                name: 'Mario'
            }
        });

        var button = new Ext.button.Button({
            renderTo: document.body,

            handler: function () {
                summary.update({
                    age: 78,
                    location: 'Japan',
                    name: 'Aimee'
                });
            }
        });



        var cmp = new Ext.Component({

            renderTo: document.body,
            autoEl: 'div',
            data: ['London', 'Paris', 'Moscow', 'New York', 'Tokyo'],

            tpl: [
                    '<tpl for=".">',
                        '<li>{.}</li>',
                    '</tpl>'
            ]
        });

        var toogleClass = new Ext.Component({
            renderTo: document.body,
            autoEl: 'div',
            data: ['London', 'Paris', 'Moscow', 'New York', 'Tokyo'],

            listeners: {
                // Add the listener to the component's main el 
                el: {
                    // Use a CSS class to filter the propagated clicks 
                    delegate: '.list-row',

                    click: function (ev, li) {
                        // Toggle a CSS class on the li when it is clicked 
                        Ext.fly(li).toggleCls('list-row-selected');
                    }
                }
            },

            tpl: [
                    '<tpl for=".">',
                        '<li class="list-row">{.}</li>',
                    '</tpl>'
            ]
        });

        Ext.define('TitledComponent', {
            extend: 'Ext.Component',
            renderTo: document.body,
            baseCls: 'titled-component',
            childEls: ['body', 'headerEl'],

            renderTpl: [
                '<h4 id="{id}-headerEl" class="{baseCls}-header">{header:htmlEncode}</h4>',
                '<div id="{id}-body" class="{baseCls}-body">{% this.renderContent(out, values) %}</div>'
            ],

            getTargetEl: function () {
                return this.body;
            },

            // Override the default implementation to add in the header text 
            initRenderData: function () {
                var data = this.callParent();

                // Add the header property to the renderData 
                data.header = this.header;

                return data;
            },

            setHeader: function (header) {
                this.header = header;

                // The headerEl will only exist after rendering 
                if (this.headerEl) {
                    this.headerEl.update(Ext.util.Format.htmlEncode(header));
                }
            }
        });

        Ext.define('BiographyComponent', {
            extend: 'TitledComponent',
            xtype: 'biography',

            header: 'Biography',
            tpl: '{name} is {age:plural("year")} old and lives in {location}',

            // Override update to automatically set the date in the header 
            update: function (data) {
                this.callParent(arguments);

                this.setHeader('Biography updated at ');
            }
        });

        var summary2 = new Ext.create('BiographyComponent', {
            data: {
                age: 26,
                location: 'Italy',
                name: 'Mario'
            }
        });




        Ext.util.Observable.capture(cmp, function (evname) { console.log(evname, arguments); });

        Ext.util.Observable.capture(Ext.Component({
            renderTo: document.body
        }), function (evname) { console.log(evname, arguments); });

    };

    var comboBoxes = function () {

        Ext.create('Ext.form.field.ComboBox', {
            renderTo: document.body,
            store: ['Red', 'Yellow', 'Green', 'Brown', 'Blue', 'Pink', 'Black'],
            listConfig: {
                getInnerTpl: function () {
                    return '<h3>{title} ({status})</h3>' + '<div class="reportedBy">Reported by {raisedBy}</div>' + '{body}';
                }
            }
            //initRenderData: function() {
            //    var data = this.__proto__.initRenderData();
            //    return data;
            //}
        });


    };

    var dataView = function () {

        Ext.define('LogEntry', {
            extend: 'Ext.data.Model',
            fields: [
               { name: 'text' }

            ]
        });

        var store = Ext.create('Ext.data.Store', {
            model: 'LogEntry',
            data: [
                { text: 'item 1' },
                { text: 'item 2' },
                { text: 'item 3' },
                { text: 'item 4' },
                { text: 'item 5' }
            ]
        });

        Ext.define('ns.plugin.dataviewEditor', {
            alias: 'plugin.dataviewEditor',
            extend: 'Ext.Editor',
            completeOnEnter: true,
            cancelOnEnter: true,
            hideEl: false,
            labelSelector: 'span',
            shim: false,
            alignment:'tl-tl',

            constructor: function (cfg) {
                Ext.apply(this, cfg);
                this.field = new Ext.form.TextField({
                    allowBlank: false,
                    selectionOnFocus: true
                });

                this.superclass.constructor.call(this, cfg);
                //this.callParent(arguments);
            },

            init: function (view) {
                this.view = view;
                view.on('render', this.initEditor, this);
                this.on('complete', this.onSave, this);

            },
            onSave: function(ed,value) {
                this.activeRecord.set(this.dataIndex, value);
                delete this.activeRecord;
            },
            initEditor: function () {
                this.view.on({
                    scope: this,
                    containerclick: this.doBlur,
                    click: this.doBlur
                });
                this.view.getEl().on('mousedown', this.onMouseDown, this, { delegate: this.labelSelector });
            },
            doBlur: function () {
                if (this.editing) {
                    this.field.blur();
                }
            },
            onMouseDown: function (e, target) {
                if (!e.ctrlKey && !e.shiftKey &&!this.activeRecord) {
                    var item = this.view.findItemByChild(target);
                    e.stopEvent();
                    var record = this.view.store.getAt(this.view.indexOf(item));
                    this.startEdit(target, record.data[this.dataIndex]);
                    this.activeRecord = record;
                } else {
                    e.preventDefault();
                }
            }

        });


        var panel = new Ext.Panel({
            id: 'images-view',
            renderTo: document.body,
            frame: true,
            width: 535,
            autoHeight: true,
            collapsible: true,
            layout: 'fit',
            title: 'Simple DataView (0 items selected)',

            items: [{
                xtype: 'dataview',
                plugins: [new Ext.create('ns.plugin.dataviewEditor', {dataIndex:'text'})],
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
    };

    dataView();
});