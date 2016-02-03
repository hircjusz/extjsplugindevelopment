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
            },
            onParentRender: function (field) {
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
            bbar: [
                { xtype: 'button', text: 'Edit' },
                {
                    xtype: 'button',
                    text: 'Save',
                    handler: function () {
                        form.items.get(0).save();
                    }
                },
                { xtype: 'button', text: 'Cancel' }
            ],
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Email Address',
                    plugins: ['readonlybutton']
                }
            ]
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
            items: [
                {
                    text: 'item context menu'
                }
            ]
        });

        var containerContextMenu = Ext.create('Ext.menu.Menu', {
            renderTo: Ext.getBody(),
            items: [
                {
                    text: 'container context menu'
                }
            ]
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
            alignment: 'tl-tl',

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
            onSave: function (ed, value) {
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
                if (!e.ctrlKey && !e.shiftKey && !this.activeRecord) {
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
            tbar: [
                {
                    text: 'GetChanges',
                    handler: function () {
                        var t = this.dataView;
                    }
                }
            ],
            items: [
                {
                    ref: '../dataView',
                    xtype: 'dataview',
                    plugins: [new Ext.create('ns.plugin.dataviewEditor', { dataIndex: 'text' })],
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
                }
            ]
        });
    };

    var dataViewEditors = function () {

        Ext.define('LogEntry', {
            extend: 'Ext.data.Model',
            fields: [
                { name: 'text' },
                { name: 'date' }
            ]
        });

        var store = Ext.create('Ext.data.Store', {
            model: 'LogEntry',
            data: [
                { text: 'item 1', date: '12-12-2015' },
                { text: 'item 2', date: '12-12-2015' },
                { text: 'item 3', date: '12-12-2015' },
                { text: 'item 4', date: '12-12-2015' },
                { text: 'item 5', date: '12-12-2015' }
            ]
        });

        Ext.define('ns.editabelDataView', {
            extend: 'Ext.DataView',
            store: store,
            tpl: Ext.create('Ext.XTemplate',
                '<tpl for=".">',
                '<div class="logentry">',
                '<span class="item-text-cls">{text}</span>',
                '<span class="item-date-cls">{date}</span>',
                '<div class="removeicon"></div>',
                '</div>',
                '</tpl>'
            ),
            columns: [
                {
                    dataIndex: 'text',
                    cls: 'item-text-cls',
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false

                    }
                }, {
                    dataIndex: 'date',
                    cls: 'item-date-cls',
                    editor: {
                        xtype: 'datefield',
                        allowBlank: false

                    }
                }
            ],
            itemSelector: 'div.logentry',
            trackOver: true,
            overItemCls: 'logentry-hover',
            enableEdit: function () {
                var me = this;

                if (this.editors && this.editors.length > 0) {
                    this.completeEdit();
                }
                this.editors = [];
                var j;

                for (j = 0; j < this.getNodes().length; j++) {
                    var i;
                    for (i = 0; i < me.columns.length; i++) {

                        var cm = me.columns[i];
                        var item = Ext.get(this.getNodes()[j]).down('.' + cm.cls);

                        var editor = new Ext.Editor({
                            field: cm.editor,
                            completeOnEnter: false,
                            updateEl: true,
                            allowBlur: false,
                            record: me.store.getAt(j),
                            fieldRecord: cm.dataIndex
                        });
                        me.editors.push(editor);
                        editor.startEdit(item, editor.record.get(cm.dataIndex));
                    };

                };
            },
            completeEdit: function () {
                var me = this;
                Ext.each(this.editors, function (ed) {
                    ed.completeEdit();
                    ed.record.set(ed.fieldRecord, ed.getValue());
                });
                var modified = me.store.getModifiedRecords();
            }
        });

        var panel = new Ext.Panel({
            renderTo: document.body,
            frame: true,
            width: 535,
            autoHeight: true,
            collapsible: true,
            layout: 'fit',
            title: 'Simple DataView (0 items selected)',
            tbar: [
                {
                    text: 'Enable Edit',
                    handler: function () {
                        this.ownerCt.ownerCt.items.get(0).enableEdit();
                    }
                }, {
                    text: 'Complete Edit',
                    handler: function () {
                        this.ownerCt.ownerCt.items.get(0).completeEdit();
                    }
                }
            ],
            items: [
                new Ext.create('ns.editabelDataView')
            ]
        });


    };

    var comboBoxTemplates = function () {

        Ext.define('AMShiva.ux.custom.Combo', {
            extend: 'Ext.form.field.ComboBox',
            alias: 'widget.ux_combo',


            colorField: 'color', //to get color value
            displayField: 'text',
            valueField: 'value',

            editable: false,
            defaultAutoCreate: { tag: "div", tabindex: '0' },
            // displayField: 'template',
            multiple: false,
            triggerAction: 'all',
            trigger2Class: 'x-window-trigger',
            trigger3Class: 'x-question-trigger',
            templateIndex: 'template',
            fieldsDefinitionIndex: 'fields',

            assertValue: Ext.emptyFn,

            initComponent: function () {
                var me = this;
                // dropdown item template
                me.tpl = Ext.create('Ext.XTemplate',
                    '<tpl for=".">',
                    '<div class="x-boundlist-item">',
                    '<span style="background-color: {' + me.colorField + '};" class="color-box-icon"></span>{' + me.displayField + '}',
                    '</div>',
                    '</tpl>'
                );
                this.store = Ext.create('Ext.data.Store', {
                    fields: ['value', 'text', 'color'],
                    data: [
                        { value: 'Val1', text: 'text1', color: 'red' },
                        { value: 'Val2', text: 'text2', color: 'blue' }
                    ]
                });

                me.callParent(arguments);

                // here change the selection item html
                me.on('change',
                    function (element, newValue) {
                        var inputEl = element.inputCell.child('input');
                        var data = element.getStore().findRecord(element.valueField, newValue);

                        if (data) {
                            inputEl.applyStyles('padding-left:26px');
                            var parent = inputEl.parent(),
                                spanDomEle = parent.child('span');

                            if (!spanDomEle) {
                                Ext.DomHelper.insertFirst(parent, { tag: 'span', cls: 'color-box-icon' });
                                var newSpanDomEle = parent.child('span');
                                newSpanDomEle.applyStyles('background-color: ' + data.get(element.colorField) + ';float: left;position: absolute;margin: 3px 2px 2px 4px;');
                            } else {
                                spanDomEle.applyStyles('background-color:' + data.get(element.colorField));
                            }
                        }
                    });
            },
            initTrigger: function () {
                if (this.triggerEl) {
                    this.triggerEl.remove();
                }
                var insertEl = this.triggerCell.elements[0];
                this.triggerEl = insertEl.createChild(this.triggerConfig || { tag: "img", src: '/Content/images/loading.gif', alt: "", cls: " x-form-trigger x-question-trigger " + this.triggerCls });
                this.triggerEl.elements = [];
                this.superclass.initTrigger.call(this);

                //this.trigger = this.wrap.createChild(this.triggerConfig || { tag: "img", src: Ext.BLANK_IMAGE_URL, alt: "", cls: "x-form-trigger " + this.triggerClass }, this.el);
                //Ext.extensions.form.standardnotation.StandardNotation.superclass.initTrigger.call(this);

                this.trigger2 = insertEl.createChild({ tag: "img", src: Ext.BLANK_IMAGE_URL, alt: "", cls: "x-form-trigger x-form-trigger2 " + this.trigger2Class });
                this.mon(this.trigger2, 'click', this.onTrigger2Click, this, { preventDefault: true });
                this.trigger2.addClsOnOver('x-form-trigger-over');
                this.trigger2.addClsOnClick('x-form-trigger-click');

                this.trigger3 = insertEl.createChild({ tag: "img", src: Ext.BLANK_IMAGE_URL, alt: "", cls: "x-form-trigger x-form-trigger3 " + this.trigger3Class });
                this.mon(this.trigger3, 'click', this.onTrigger3Click, this, { preventDefault: true });
                this.trigger3.addClsOnOver('x-form-trigger-over');
                this.trigger3.addClsOnClick('x-form-trigger-click');

                //this.triggerEl[this.store.autoStore ? 'addClass' : 'removeClass']('x-hide-display');
                //this.trigger2[this.records.length ? 'removeClass' : 'addClass']('x-hide-display');
                //this.trigger3[this.records.length ? 'removeClass' : 'addClass']('x-hide-display');
            }
        });

        Ext.create('AMShiva.ux.custom.Combo', { renderTo: document.body });

    };

<<<<<<< HEAD
    var extElement = function() {

        var el = Ext.DomHelper.createDom({ tag: 'div', cls: 'new-div-cls', id: 'new-div-id' }, document.body);
        el.addCls('test-class1');
    };
    extElement();
=======
    var domHelperEx = function () {

        Ext.DomHelper.append(document.body, { tag: 'a', href: 'http://google.pl', html: 'My Link', target: '_blank' });
        var el = Ext.get('preExistingDiv');
        Ext.DomHelper.append(el, { tag: 'div', id: 'append', html: 'append' });

        Ext.DomHelper.insertAfter(el, {
            tag: 'div',
            id: 'insertAfter',
            cn: [
            {
                tag: 'ul', id: 'list',
                cn: [
                {
                    tag: 'li', html: 'element a'
                }, { tag: 'li', html: 'element b' },
                { tag: 'li', html: 'element c' }
                ]
            }]
        });

        Ext.DomHelper.insertFirst('list', { tag: 'li', html: 'inserted element' });
        Ext.DomHelper.insertFirst(el, { tag: 'li', html: 'inserted Before' });

        function handleKeyUp(e) {
            var code = e.keyCode ? e.keyCode : e.which;
            if (code === 38) { //up key
                alert('up');
            } else if (code === 40) { //down key
                alert('down');
            }
        }
        var tileDiv = new Ext.Element({
            tag: 'div',
            id: 'tileId',
            cls: 'tile',
            html: '<h1>Hello world</h1>',
            listeners: {
                keyup: handleKeyUp,
                scope: this
            }
        });
        //Ext.DomHelper.insertHtml(el, el.dom, tileDiv);

        var spec = {
            tag: "form",
            cn: [
            {
                name: "parentNode",
                type: "text",
                tag: "input"
            }, {
                name: "parentNode2",
                type: "radio",
                tag: "input"
            }, {
                name: "parentNode2",
                type: "checkbox",
                tag: "input"
            }]
        };


        Ext.DomHelper.append(Ext.getBody(), spec);
    };

    //domHelperEx();

    var eventAggregator = function () {
        Ext.define('EventAggregator', {
            singleton: true,
            mixins: {
                observable: 'Ext.util.Observable'
            },
            events: [
                'userloggedin',
                'userloginError',
                'useraccountcreated',
                'useraccountcreationError',
                'brokerageaccountcreated',
                'brokerageaccountcreationError',
                'externalaccountcreated',
                'externalaccountcreationError',
                'brokerageaccountedited',
                'brokerageaccounteditError',
                'brokerageaccountsstoreloaded',
                'brokerageaccountschartstoreloaded',
                'brokerageaccountsstoreloadError',
                'instrumentsstoreloaded',
                'instrumentsstoreloadError',
                'ordercanceled',
                'ordercancellationError',
                'orderestimatecreated',
                'orderestimatecreationError',
                'ordercreated',
                'ordercreationError',
                'marketpricerecieved',
                'marketpricerecieveError',
                'transactionsstoreloaded',
                'transactionsstoreloadError',
                'externalaccountsstoreloaded',
                'externalaccountsstoreloadError',
                'transferprocessed',
                'transferprocessError',
                'tradeordercomplianceError',
                'ordersstoreloaded',
                'ordersstoreloadError'
            ],
            hasListeners: {},

            publish: function publish(eventName, eventArgs, customArgs) {
                EventAggregator.fireEvent(eventName, eventArgs, eventName, customArgs);
            },

            subscribeForever: function subscribeForever(eventName, eventHandler, scopeObject) {
                EventAggregator.addListener(eventName, eventHandler, scopeObject);
            },

            subscribe: function subscribe(eventName, eventHandler, scopeObject) {
                EventAggregator.addListener(eventName, eventHandler, scopeObject, { single: true });
            },

            unsubscribe: function unsubscribe(eventName, eventHandler, scopeObject) {
                EventAggregator.removeListener(eventName, eventHandler, scopeObject);
            }

        });
    }
    //eventAggregator();
    var eventDelegation = function () {


        var panel = new Ext.panel.Panel({
            renderTo: document.body,
            width: 400,
            height: 400,
            title: 'Event Delegation Test',
            tpl: '<tpl for="."><div><span class="foo-div">{foo}</span> {bar}</div></tpl>',
            data: [
                { foo: 'One', bar: 'one' },
                { foo: 'Two', bar: 'two' },
                { foo: 'Three', bar: 'three' }
            ],
            listeners: {
                element: 'el',
                delegate: 'span.foo-div',
                click: function () {
                    console.log('click');
                }
            }
        });

    }
    //    eventDelegation();

    var xTemplate = function () {

        var productData = [{
            name: 'Product A',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            price: 1.99,
            sale: true
        }, {
            name: 'Product B',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            price: 6.99
        }, {
            name: 'Product C',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            price: 19.99
        }, {
            name: 'Product D',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            price: 14.99
        }, {
            name: 'Product E',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            price: 4.99,
            sale: true
        }, {
            name: 'Product F',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            price: 49.99
        }, {
            name: 'Product G',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            price: 4.99
        }];

        var categoryData = [{
            name: 'Toys',
            children: [{
                name: 'Infant'
            }, {
                name: 'Preschool'
            }]
        }, {
            name: 'Books',
            children: [{
                name: 'Fiction',
                children: [{
                    name: 'Mystery'
                }, {
                    name: 'Sci-fi'
                }]
            }, {
                name: 'Non-fiction',
                children: [{
                    name: 'Biographies'
                }]
            }]
        }, {
            name: 'Electronics'
        }];

        var categoriesTpl = new Ext.XTemplate(
        '<tpl for=".">',
            '<span class="category">- {name}</span>',
            '<div class="children">',
                '{[ this.recurse(values) ]}',
            '</div>',
        '</tpl>',
        {
            compiled: true,
            recurse: function (values) {
                if (values.children && values.children.length) {
                    return this.apply(values.children);
                }
                return '';
            }
        }
    );
        var categories = new Ext.Component({
            cls: 'categories',
            width: 200,
            html: categoriesTpl.apply(categoryData)
        });



        Ext.XTemplate.prototype.preGroupString = function (xindex, groupCount, str) {
            return xindex == 1 || xindex % groupCount == 1 ? str : "";
        };

        Ext.XTemplate.prototype.postGroupString = function (xindex, xcount, groupCount, str) {
            return xindex == xcount || xindex % groupCount == 0 ? str : "";
        };

        var productTpl = new Ext.XTemplate(
        '<div class="product">',
            '<span class="name">{name}</span>',
            '<span class="price {[ this.saleClass(values) ]}">{price:usMoney}</span>',
            '<div class="desc">{desc}</div>',
        '</div>',
        {
            compiled: true,
            saleClass: function (values) {
                return values.sale ? 'sale' : '';
            }
        }
    );

        var productsTpl = new Ext.XTemplate(
            '<tpl for=".">',
                '{[ this.preGroupString(xindex, 3, "<div class=\\"group\\">") ]}',
                '{[ this.renderProduct(values) ]}',
                '{[ this.postGroupString(xindex, xcount, 3, "</div>") ]}',
            '</tpl>',
            {
                renderProduct: function (values) {
                    return productTpl.apply(values);
                }
            }
        );


        var products = new Ext.DataView({
            cls: 'productlist',
            flex: 1,
            tpl: productsTpl,
            store: new Ext.data.JsonStore({
                fields: ['name', 'desc', 'price', 'sale'],
                data: productData
            }),
            itemSelector: '.product'
        });

        var main = new Ext.Container({
            layout: {
                type: 'hbox',
                align: 'top'
            },
            items: [categories, products]
        });

        var details = new Ext.Component({
            cls: 'details',
            tpl: productTpl
        });

        var card = new Ext.Container({
            renderTo: 'content',
            layout: 'card',
            activeItem: 0,
            items: [main, details]
        });

        products.on('click', function (dv, index, node) {
            var record = dv.getStore().getAt(index);
            details.update(record.data);
            card.getLayout().setActiveItem(details);
        });

        Ext.fly('header').on('click', function () {
            card.getLayout().setActiveItem(main);
        });

    }





    //xTemplate();
    var xTemplate2 = function () {

        var data = {
            name: 'I am Here',
            messages: ['aaa', 'bbbb', 'ccc', 'dddd']
        };

        var tpl = new Ext.Template(
            '<h2>{name}</h2>',
              '<tpl for="messages">',
                '<p>.</p>',
              '</tpl>'
            );
        tpl.compile();

        tpl.append(document.body, data);
    };

    var checkBoxMulstiSelectEx = function () {

        Ext.define('ns.Field', {
            extend: 'Ext.data.Model',
            fields: [
                { name: 'field1', type: 'string' },
                { name: 'field2', type: 'string' }
            ]
        }
       );

        var store = Ext.create('Ext.data.Store', {
            id: 'fieldStore',
            model: 'ns.Field',
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            },
            data: [
                { field1: 'http://www.sencha.com/img/20110215-feat-drawing.png', field2: 'Drawing & Charts' },
                { field1: 'http://www.sencha.com/img/20110215-feat-data.png', field2: 'Advanced Data' },
                { field1: 'http://www.sencha.com/img/20110215-feat-html5.png', field2: 'Overhauled Theme' },
                { field1: 'http://www.sencha.com/img/20110215-feat-perf.png', field2: 'Performance Tuned' }
            ]
        });

        Ext.data.StoreManager.register(store);
        var lookup = Ext.data.StoreManager.lookup('fieldStore');

        Ext.define('ComboBoxMulti', {
            /**
 * @cfg {String} title If supplied, a header element is created containing this text and added into the top of
 * the dropdown list (defaults to undefined, with no header element)
 */

            // private
            defaultAutoCreate: { tag: "input", type: "text", size: "24", autocomplete: "off" },

            /**
             * @cfg {String} listClass The CSS class to add to the predefined 'x-checkboxcombo-list' class
             * applied the dropdown list element (defaults to '').
             */
            listClass: '',

            /**
             * @cfg {String} listEmptyText The empty text to display in the data view if no items are found.
             * (defaults to '')
             */
            listEmptyText: '',

            /**
             * @cfg {String} triggerClass An additional CSS class used to style the trigger button.  The trigger will always
             * get the class 'x-form-trigger' and triggerClass will be appended if specified
             * (defaults to 'x-form-arrow-trigger' which displays a downward arrow icon).
             */
            triggerClass: 'x-form-arrow-trigger',

            /**
             * @cfg {Boolean/String} shadow true or "sides" for the default effect, "frame" for
             * 4-way shadow, and "drop" for bottom-right
             */
            shadow: 'sides',

            /**
             * @cfg {String/Array} listAlign A valid anchor position value. See {@link Ext.Element#alignTo} for details
             * on supported anchor positions and offsets. To specify x/y offsets as well, this value
             * may be specified as an Array of {@link Ext.Element#alignTo} method arguments.
        
             * 
            [ 'tl-bl?', [6,0] ]
            (defaults to 'tl-bl?')
             */
            listAlign: 'tl-bl?',

            /**
             * @cfg {Number} maxHeight The maximum height in pixels of the dropdown list before scrollbars are shown
             * (defaults to 300)
             */
            maxHeight: 300,

            /**
             * @cfg {Number} minHeight The minimum height in pixels of the dropdown list when the list is constrained by its
             * distance to the viewport edges (defaults to 90)
             */
            minHeight: 90,

            /**
             * @cfg {Boolean} selectOnFocus true to select any existing text in the field immediately on focus.
             * Only applies when {@link Ext.form.TriggerField#editable editable} = true (defaults to
             * false).
             */
            selectOnFocus: false,

            /**
             * @cfg {Boolean} false to prevent the user from typing text directly into the field, the field will only respond to a click on the trigger to set the value. (defaults to false).
             */
            editable: false,

            /**
             * @cfg {String} loadingText The text to display in the dropdown list while data is loading.  Only applies
             * when {@link #mode} = 'remote' (defaults to 'Loading...')
             */
            loadingText: 'Loading...',

            /**
             * @cfg {String} mode Acceptable values are 'remote' (Default) or 'local'
             */
            mode: 'remote',

            /**
             * @cfg {Number} minListWidth The minimum width of the dropdown list in pixels (defaults to 70, will
             * be ignored if {@link #listWidth} has a higher value)
             */
            minListWidth: 70,


            /**
             * @cfg {Boolean} lazyInit true to not initialize the list for this combo until the field is focused
             * (defaults to true)
             */
            lazyInit: true,


            /**
             * @cfg {Boolean} submitValue False to clear the name attribute on the field so that it is not submitted during a form post.
             * If a hiddenName is specified, setting this to true will cause both the hidden field and the element to be submitted.
             * Defaults to undefined.
             */
            submitValue: undefined,

            extend: 'Ext.form.TriggerField',
            initComponent: function() {
               

                this.addEvents(
                    'expand',
                    'collapse',
                    'change'
                );
                if (!this.tpl) {
                    this.tpl = new Ext.XTemplate('{' + this.displayField + '}');
                }

                this.store = Ext.data.StoreManager.lookup('fieldStore');

                this.superclass.initComponent.call(this);
            },
            onRender: function(ct, position) {
                this.superclass.onRender.call(this, ct, position);

                if (!this.lazyInit) {
                    this.initList();
                } else {
                    this.on('focus', this.initList, this, { single: true });
                }

            },
            initList: function() {
                if (!this.list) {
                    var cls = 'x-checkboxcombo-list',
                        listParent = Ext.getDom(this.getListParent() || Ext.getBody()),
                        zindex = parseInt(Ext.fly(listParent).getStyle('z-index'), 10);

                    this.list = new Ext.Layer({
                        parentEl: listParent,
                        shadow: this.shadow,
                        cls: [cls, this.listClass].join(' '),
                        constrain: false,
                        zindex: (zindex || 12000) + 5
                    });

                    var lw = this.listWidth || Math.max(this.triggerWrap.getWidth(), this.minListWidth);
                    this.list.setWidth(lw);
                    this.list.swallowEvent('mousewheel');
                    this.assetHeight = 0;


                    this.innerList = this.list.createChild({ cls: cls + '-inner' });
                    this.innerList.setWidth(lw - this.list.getFrameWidth('lr'));
                    this.mon(this.innerList, 'mouseover', this.onListOver, this, { delegate: '.x-form-item' });
                    this.mon(this.innerList, 'mousemove', this.onListMove, this, { delegate: '.x-form-item' });
                    this.mon(this.innerList, 'click', this.onListClick, this, { delegate: '.x-form-item' });
                }

                this.bindStore();


            },
            onListOver: function(e,t) {
                var target = e.getTarget('div.x-form-item');
                if (target) {
                    target = Ext.get(target);
                    target.radioClass('x-checkboxcombo-item-over');
                }
            },
            onListMove: function() {
                this.inKeyMode = false;
            },
            onListClick: function(e,t) {


                if (Ext.get(e.getTarget()).dom.tagName == 'INPUT' || Ext.get(e.getTarget()).dom.tagName == 'LABEL') {
                    return;
                }

                var target = Ext.get(e.target);
                if (target) {
                    //var cb = target.up('.x-form-trigger-wrap');
                    //var cmp = Ext.getCmp(cb.id);
                    this.setValue(this.getValue() ? false : true);

                    // Fire an event for this check event
                }

            },
            getValue: function() {

                if (this.valueField) {
                    return Ext.isDefined(this.value) ? this.value : '';
                } else {
                    return this.superclass.getValue.call(this);
                }

            },
            setValue: function (vals) {
                 vals = vals || [];

                if (typeof vals === 'string') {
                    vals = vals.split(',');
                }

                var text = [];

                // First set everything to false
                Ext.each(this.store.data.items, function (rec) {
                    rec.checked = false;
                }, this);

                Ext.each(vals, function (v) {
                    if (this.valueField) {
                        var r = this.findRecord(this.valueField, v);
                        if (r) {
                            text.push(r.data[this.displayField]);
                            r.checked = true;
                        }
                    }
                }, this);

                if (typeof vals === 'array' || typeof vals === 'object') {
                    vals = vals.join(',');
                }

                if (this.cbgroup) {
                    this.cbgroup.setValue(Ext.pluck(this.store.data.items, 'checked'));
                }

                if (this.hiddenField) {
                    this.hiddenField.value = Ext.value(vals, '');
                }

                this.lastSelectionText = text.join(', ');
                this.superclass.setValue.call(this, text.join(', '));
                this.value = vals;
                return this;
                
            },

            findRecord: function (prop, value) {
                var record;
                if (this.store.getCount() > 0) {
                    record = this.store.getAt(this.store.findExact(prop, value));
                    return (record ? record : false);
                }
            },
            bindStore: function() {

                this.removeCheckBoxes();
                this.addCheckBoxes();


            },
            removeCheckBoxes: function() {
                
            },
            addCheckBoxes: function() {

                var checkboxes = [];

                Ext.each(this.store.data.items, function(rec) {
                    checkboxes.push({name: rec.id, boxLabel: this.tpl.apply(rec.data), inputValue: rec.data[this.valueField], checked: (rec.checked ? rec.checked : false)});
                }, this);
		
                this.cbgroup = new Ext.form.CheckboxGroup({
                    renderTo: this.innerList,
                    columns: 1,
                    autoHeight: true,
                    border: false,
                    items: checkboxes
                });

            },
            getListParent: function () {
                return document.body;
            },
            onTriggerClick: function() {

                this.inputEl.focus();

            }
        });

        var combo = Ext.create('ComboBoxMulti', { lazyInit: true,displayField:'field1',valueField:'field2' });
        combo.render(document.body);



    };

    var  checkBoxExample= function() {
        
        Ext.namespace('Ext.ux.form');

        Ext.define('ns.Field', {
            extend: 'Ext.data.Model',
            fields: [
                { name: 'field1', type: 'string' },
                { name: 'field2', type: 'string' }
            ]
        }
     );

        var store = Ext.create('Ext.data.Store', {
            id: 'fieldStore',
            model: 'ns.Field',
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            },
            data: [
                { field1: 'http://www.sencha.com/img/20110215-feat-drawing.png', field2: 'Drawing & Charts' },
                { field1: 'http://www.sencha.com/img/20110215-feat-data.png', field2: 'Advanced Data' },
                { field1: 'http://www.sencha.com/img/20110215-feat-html5.png', field2: 'Overhauled Theme' },
                { field1: 'http://www.sencha.com/img/20110215-feat-perf.png', field2: 'Performance Tuned' }
            ]
        });

        Ext.data.StoreManager.register(store);

        Ext.ux.form.CheckboxCombo = Ext.extend(Ext.form.TriggerField, {
            /**
             * @cfg {String} title If supplied, a header element is created containing this text and added into the top of
             * the dropdown list (defaults to undefined, with no header element)
             */

            // private
            defaultAutoCreate: { tag: "input", type: "text", size: "24", autocomplete: "off" },

            /**
             * @cfg {String} listClass The CSS class to add to the predefined 'x-checkboxcombo-list' class
             * applied the dropdown list element (defaults to '').
             */
            listClass: '',

            /**
             * @cfg {String} listEmptyText The empty text to display in the data view if no items are found.
             * (defaults to '')
             */
            listEmptyText: '',

            /**
             * @cfg {String} triggerClass An additional CSS class used to style the trigger button.  The trigger will always
             * get the class 'x-form-trigger' and triggerClass will be appended if specified
             * (defaults to 'x-form-arrow-trigger' which displays a downward arrow icon).
             */
            triggerClass: 'x-form-arrow-trigger',

            /**
             * @cfg {Boolean/String} shadow true or "sides" for the default effect, "frame" for
             * 4-way shadow, and "drop" for bottom-right
             */
            shadow: 'sides',

            /**
             * @cfg {String/Array} listAlign A valid anchor position value. See {@link Ext.Element#alignTo} for details
             * on supported anchor positions and offsets. To specify x/y offsets as well, this value
             * may be specified as an Array of {@link Ext.Element#alignTo} method arguments.
        
             * 
            [ 'tl-bl?', [6,0] ]
            (defaults to 'tl-bl?')
             */
            listAlign: 'tl-bl?',

            /**
             * @cfg {Number} maxHeight The maximum height in pixels of the dropdown list before scrollbars are shown
             * (defaults to 300)
             */
            maxHeight: 300,

            /**
             * @cfg {Number} minHeight The minimum height in pixels of the dropdown list when the list is constrained by its
             * distance to the viewport edges (defaults to 90)
             */
            minHeight: 90,

            /**
             * @cfg {Boolean} selectOnFocus true to select any existing text in the field immediately on focus.
             * Only applies when {@link Ext.form.TriggerField#editable editable} = true (defaults to
             * false).
             */
            selectOnFocus: false,

            /**
             * @cfg {Boolean} false to prevent the user from typing text directly into the field, the field will only respond to a click on the trigger to set the value. (defaults to false).
             */
            editable: false,

            /**
             * @cfg {String} loadingText The text to display in the dropdown list while data is loading.  Only applies
             * when {@link #mode} = 'remote' (defaults to 'Loading...')
             */
            loadingText: 'Loading...',

            /**
             * @cfg {String} mode Acceptable values are 'remote' (Default) or 'local'
             */
            mode: 'remote',

            /**
             * @cfg {Number} minListWidth The minimum width of the dropdown list in pixels (defaults to 70, will
             * be ignored if {@link #listWidth} has a higher value)
             */
            minListWidth: 70,


            /**
             * @cfg {Boolean} lazyInit true to not initialize the list for this combo until the field is focused
             * (defaults to true)
             */
            lazyInit: true,


            /**
             * @cfg {Boolean} submitValue False to clear the name attribute on the field so that it is not submitted during a form post.
             * If a hiddenName is specified, setting this to true will cause both the hidden field and the element to be submitted.
             * Defaults to undefined.
             */
            submitValue: undefined,


            // private
            initComponent: function () {
             
                this.addEvents(
                    'expand',
                    'collapse',
                    'change'
                );

                //auto-configure store from local array data
                if (this.store) {
                    this.store = Ext.StoreMgr.lookup(this.store);
                    if (this.store.autoCreated) {
                        this.displayField = this.valueField = 'field1';
                        if (!this.store.expandData) {
                            this.displayField = 'field2';
                        }
                        this.mode = 'local';
                    }
                }

                if (!this.tpl) {
                    this.tpl = new Ext.XTemplate('{' + this.displayField + '}');
                }

                this.selectedIndex = -1;
                Ext.ux.form.CheckboxCombo.superclass.initComponent.call(this);
            },

            // private
            onRender: function (ct, position) {
                if (this.hiddenName && !Ext.isDefined(this.submitValue)) {
                    this.submitValue = false;
                }
                Ext.ux.form.CheckboxCombo.superclass.onRender.call(this, ct, position);
                if (this.hiddenName) {
                    this.hiddenField = this.el.insertSibling({ tag: 'input', type: 'hidden', name: this.hiddenName, id: (this.hiddenId || this.hiddenName) }, 'before', true);
                }
                if (Ext.isGecko) {
                    this.el.dom.setAttribute('autocomplete', 'off');
                }
                if (!this.lazyInit) {
                    this.initList();
                } else {
                    this.on('focus', this.initList, this, { single: true });
                }
            },

            // private
            initValue: function () {
                Ext.ux.form.CheckboxCombo.superclass.initValue.call(this);
                if (this.hiddenField) {
                    this.hiddenField.value = Ext.value(Ext.isDefined(this.hiddenValue) ? this.hiddenValue : this.value, '');
                }
            },

            // private
            initList: function () {
                if (!this.list) {
                    var cls = 'x-checkboxcombo-list',
                        listParent = Ext.getDom(this.getListParent() || Ext.getBody()),
                        zindex = parseInt(Ext.fly(listParent).getStyle('z-index'), 10);

                    if (this.ownerCt && !zindex) {
                        this.findParentBy(function (ct) {
                            zindex = parseInt(ct.getPositionEl().getStyle('z-index'), 10);
                            return !!zindex;
                        });
                    }

                    this.list = new Ext.Layer({
                        parentEl: listParent,
                        shadow: this.shadow,
                        cls: [cls, this.listClass].join(' '),
                        constrain: false,
                        zindex: (zindex || 12000) + 5
                    });

                    var lw = this.listWidth || Math.max(this.triggerWrap.getWidth(), this.minListWidth);
                    this.list.setWidth(lw);
                    this.list.swallowEvent('mousewheel');
                    this.assetHeight = 0;
                    if (this.syncFont !== false) {
                        this.list.setStyle('font-size', this.el.getStyle('font-size'));
                    }

                    this.innerList = this.list.createChild({ cls: cls + '-inner' });
                    this.innerList.setWidth(lw - this.list.getFrameWidth('lr'));
                    this.mon(this.innerList, 'mouseover', this.onListOver, this, { delegate: '.x-form-item' });
                    this.mon(this.innerList, 'mousemove', this.onListMove, this, { delegate: '.x-form-item' });
                    this.mon(this.innerList, 'click', this.onListClick, this, { delegate: '.x-form-item' });

                    /*this.cbgroup = new Ext.form.CheckboxGroup({
                        renderTo: this.innerList,
                        columns: 1,
                        border: false,
                        items: [{}]
                    });*/

                    this.bindStore(this.store, true);
                    this.restrictHeight();
                }
            },

            getListParent: function () {
                return document.body;
            },


            /**
             * Returns the store associated with this combo.
             * @return {Ext.data.Store} The store
             */
            getStore: function () {
                return this.store;
            },

            // private
            bindStore: function (store, initial) {
                if (this.store && !initial) {
                    if (this.store !== store && this.store.autoDestroy) {
                        this.store.destroy();
                    } else {
                        this.store.un('beforeload', this.onBeforeLoad, this);
                        this.store.un('load', this.onLoad, this);
                        this.store.un('exception', this.collapse, this);
                    }
                    if (!store) {
                        this.store = null;
                    }
                }
                if (store) {
                    if (!initial) {
                        this.lastQuery = null;
                    }

                    this.store = Ext.StoreMgr.lookup(store);
                    this.store.on({
                        scope: this,
                        beforeload: this.onBeforeLoad,
                        load: this.onLoad,
                        exception: this.collapse
                    });

                    this.removeCheckboxes();
                    this.addCheckboxes();
                }
            },

            // private
            initEvents: function () {
                Ext.ux.form.CheckboxCombo.superclass.initEvents.call(this);

                this.keyNav = new Ext.KeyNav(this.el, {
                    'up': function (e) {
                        this.inKeyMode = true;
                        this.selectPrev();
                    },
                    'down': function (e) {
                        if (!this.isExpanded()) {
                            this.onTriggerClick();
                        } else {
                            this.inKeyMode = true;
                            this.selectNext();
                        }
                    },
                    'enter': function (e) {
                        this.onListEnter();
                    },
                    'esc': function (e) {
                        this.collapse();
                    },
                    'tab': function (e) {
                        this.collapse();
                        return true;
                    },
                    scope: this,
                    doRelay: function (e, h, hname) {
                        if (hname == 'down' || this.scope.isExpanded()) {
                            // this MUST be called before ComboBox#fireKey()
                            var relay = Ext.KeyNav.prototype.doRelay.apply(this, arguments);
                            if (!Ext.isIE && Ext.EventManager.useKeydown) {
                                // call Combo#fireKey() for browsers which use keydown event (except IE)
                                this.scope.fireKey(e);
                            }
                            return relay;
                        }
                        return true;
                    },

                    forceKeyDown: true,
                    defaultEventAction: 'stopEvent'
                });
                if (!this.enableKeyEvents) {
                    this.mon(this.el, 'keyup', this.onKeyUp, this);
                }
            },

            // private
            onDestroy: function () {
                this.bindStore(null);
                Ext.destroy(
                    this.resizer,
                    this.cbgroup,
                    this.list
                );
                Ext.destroyMembers(this, 'hiddenField');
                Ext.ux.form.CheckboxCombo.superclass.onDestroy.call(this);
            },

            // private
            fireKey: function (e) {
                if (!this.isExpanded()) {
                    Ext.ux.form.CheckboxCombo.superclass.fireKey.call(this, e);
                }
            },

            // private
            onResize: function (w, h) {
                Ext.ux.form.CheckboxCombo.superclass.onResize.apply(this, arguments);
                if (this.isVisible() && this.list) {
                    this.doResize(w);
                } else {
                    this.bufferSize = w;
                }
            },

            doResize: function (w) {
                if (!Ext.isDefined(this.listWidth)) {
                    var lw = Math.max(w, this.minListWidth);
                    this.list.setWidth(lw);
                    this.innerList.setWidth(lw - this.list.getFrameWidth('lr'));
                }
            },

            // private
            onEnable: function () {
                Ext.ux.form.CheckboxCombo.superclass.onEnable.apply(this, arguments);
                if (this.hiddenField) {
                    this.hiddenField.disabled = false;
                }
            },

            // private
            onDisable: function () {
                Ext.ux.form.CheckboxCombo.superclass.onDisable.apply(this, arguments);
                if (this.hiddenField) {
                    this.hiddenField.disabled = true;
                }
            },

            // private
            onBeforeLoad: function () {
                if (!this.hasFocus) {
                    return;
                }

                // Setup a temp var so we can recheck on load
                this.checkboxValues = this.cbgroup.getValue();

                this.removeCheckboxes();
            },

            // private
            onLoad: function () {
                if (!this.hasFocus) {
                    return;
                }

                // If there were old checkbox values, make sure they are still checked
                if (this.checkboxValues) {
                    Ext.each(this.checkboxValues, function (v) {
                        if (this.valueField) {
                            var r = this.findRecord(this.valueField, v.inputValue);
                            if (r) {
                                r.checked = true;
                            }
                        }
                    }, this);
                }

                if (this.store.getCount() > 0 || this.listEmptyText) {
                    this.addCheckboxes();
                    this.expand();
                    this.restrictHeight();
                } else {
                    this.collapse();
                }
            },

            // inherit docs
            getName: function () {
                var hf = this.hiddenField;
                return hf && hf.name ? hf.name : this.hiddenName || Ext.ux.form.CheckboxCombo.superclass.getName.call(this);
            },

            // private
            assertValue: function () {
                var checkboxValues = this.cbgroup.getValue();
                if (checkboxValues) {
                    var vals = [];
                    Ext.each(checkboxValues, function (cb) {
                        vals.push(cb.inputValue);
                    });
                    this.setValue(vals);
                } else {
                    this.clearValue();
                }
            },

            /**
             * Sets the specified value into the field.  If the value finds a match, the corresponding record text
             * will be displayed in the field.  If the value does not match the data value of an existing item,
             * and the valueNotFoundText config option is defined, it will be displayed as the default field text.
             * Otherwise the field will be blank (although the value will still be set).
             * @param {String} value The value to match
             * @return {Ext.form.Field} this
             */
            setValue: function (vals) {
                vals = vals || [];

                if (typeof vals === 'string') {
                    vals = vals.split(',');
                }

                var text = [];

                // First set everything to false
                Ext.each(this.store.data.items, function (rec) {
                    rec.checked = false;
                }, this);

                // Now only check the values that were explicitly set
                Ext.each(vals, function (v) {
                    if (this.valueField) {
                        var r = this.findRecord(this.valueField, v);
                        if (r) {
                            text.push(r.data[this.displayField]);
                            r.checked = true;
                        }
                    }
                }, this);

                if (typeof vals === 'array' || typeof vals === 'object') {
                    vals = vals.join(',');
                }

                // Make sure the cbgroup gets updated
                if (this.cbgroup) {
                    this.cbgroup.setValue(Ext.pluck(this.store.data.items, 'checked'));
                }

                if (this.hiddenField) {
                    this.hiddenField.value = Ext.value(vals, '');
                }

                this.lastSelectionText = text.join(', ');
                Ext.ux.form.CheckboxCombo.superclass.setValue.call(this, text.join(', '));
                this.value = vals;
                return this;
            },

            /**
             * Returns the currently selected field value or empty string if no value is set.
             * @return {String} value The selected value
             */
            getValue: function () {
                if (this.valueField) {
                    return Ext.isDefined(this.value) ? this.value : '';
                } else {
                    return Ext.ux.form.CheckboxCombo.superclass.getValue.call(this);
                }
            },

            /**
             * Clears any text/value currently set in the field
             */
            clearValue: function () {
                if (this.hiddenField) {
                    this.hiddenField.value = '';
                }
                this.setRawValue('');
                this.lastSelectionText = '';
                this.applyEmptyText();
                this.value = '';
            },

            // private
            findRecord: function (prop, value) {
                var record;
                if (this.store.getCount() > 0) {
                    record = this.store.getAt(this.store.findExact(prop, value));
                    return (record ? record : false);
                }
            },

            // private
            onListMove: function (e, t) {
                this.inKeyMode = false;
            },

            // private
            onListOver: function (e, t) {
                var target = e.getTarget('div.x-form-item');
                if (target) {
                    target = Ext.get(target);
                    target.radioClass('x-checkboxcombo-item-over');
                }
            },

            // private
            onListClick: function (e, t) {
                if (Ext.get(e.getTarget()).dom.tagName == 'INPUT' || Ext.get(e.getTarget()).dom.tagName == 'LABEL') {
                    return;
                }

                var target = e.getTarget('div.x-form-item');
                if (target) {
                    target = Ext.get(target);
                    var cb = target.child('input');
                    cb = Ext.getCmp(cb.id);
                    cb.setValue(cb.getValue() ? false : true);

                    // Fire an event for this check event
                }
            },

            // private
            onListEnter: function (e, t) {
                var target = Ext.DomQuery.selectNode('.x-checkboxcombo-item-over', this.list.dom);
                if (target) {
                    target = Ext.get(target);
                    var cb = target.child('input');
                    cb = Ext.getCmp(cb.id);
                    cb.setValue(cb.getValue() ? false : true);
                }
            },

            // private
            restrictHeight: function () {
                this.innerList.dom.style.height = '';
                var inner = this.innerList.dom,
                    pad = this.list.getFrameWidth('tb') + this.assetHeight,
                    h = Math.max(inner.clientHeight, inner.offsetHeight, inner.scrollHeight),
                    ha = this.getPosition()[1] - Ext.getBody().getScroll().top,
                    hb = document.body.clientHeight - ha - this.getSize().height,
                    space = Math.max(ha, hb, this.minHeight || 0) - this.list.shadowOffset - pad - 5;

                h = Math.min(h, space, this.maxHeight);

                this.innerList.setHeight(h);
                this.list.beginUpdate();
                this.list.setHeight(h + pad);
                this.list.alignTo.apply(this.list, [this.el].concat(this.listAlign));
                this.list.endUpdate();
            },


            /**
             * Returns true if the dropdown list is expanded, else false.
             */
            isExpanded: function () {
                return this.list && this.list.isVisible();
            },

            // private
            selectNext: function () {
                var ct = this.store.getCount();
                if (ct > 0) {
                    var el = Ext.DomQuery.selectNode('.x-checkboxcombo-item-over', this.list.dom);
                    if (!el) {
                        this.innerList.child('.x-form-item').radioClass('x-checkboxcombo-item-over');
                    } else {
                        Ext.get(el).next().radioClass('x-checkboxcombo-item-over');
                    }
                }
            },

            // private
            selectPrev: function () {
                var ct = this.store.getCount();
                if (ct > 0) {
                    var el = Ext.DomQuery.selectNode('.x-checkboxcombo-item-over', this.list.dom);
                    if (!el) {
                        this.innerList.child('.x-form-item').radioClass('x-checkboxcombo-item-over');
                    } else {
                        Ext.get(el).prev().radioClass('x-checkboxcombo-item-over');
                    }
                }
            },

            // private
            validateBlur: function () {
                return !this.list || !this.list.isVisible();
            },

            // private
            beforeBlur: function () {
                this.assertValue();
            },

            // private
            postBlur: function () {
                Ext.ux.form.CheckboxCombo.superclass.postBlur.call(this);
                this.collapse();
                this.inKeyMode = false;
            },

            /**
             * Hides the dropdown list if it is currently expanded. Fires the {@link #collapse} event on completion.
             */
            collapse: function () {
                if (!this.isExpanded()) {
                    return;
                }
                this.list.hide();
                Ext.getDoc().un('mousewheel', this.collapseIf, this);
                Ext.getDoc().un('mousedown', this.collapseIf, this);
                this.beforeBlur();
                this.fireEvent('collapse', this);
            },

            // private
            collapseIf: function (e) {
                if (!e.within(this.wrap) && !e.within(this.list)) {
                    this.collapse();
                }
            },

            /**
             * Expands the dropdown list if it is currently hidden. Fires the {@link #expand} event on completion.
             */
            expand: function () {
                if (this.isExpanded() || !this.hasFocus) {
                    return;
                }
                if (this.bufferSize) {
                    this.doResize(this.bufferSize);
                    delete this.bufferSize;
                }
                this.list.alignTo.apply(this.list, [this.el].concat(this.listAlign));
                this.list.show();
                if (Ext.isGecko2) {
                    this.innerList.setOverflow('auto'); // necessary for FF 2.0/Mac
                }
                this.mon(Ext.getDoc(), {
                    scope: this,
                    mousewheel: this.collapseIf,
                    mousedown: this.collapseIf
                });
                this.fireEvent('expand', this);
            },

            removeCheckboxes: function () {
                if (this.cbgroup) {
                    this.cbgroup.destroy();
                }
            },

            addCheckboxes: function () {
                var checkboxes = [];

                // Add new checkboxes from store
                Ext.each(this.store.data.items, function (rec) {
                    checkboxes.push({ name: rec.id, boxLabel: this.tpl.apply(rec.data), inputValue: rec.data[this.valueField], checked: (rec.checked ? rec.checked : false) });
                }, this);

                this.cbgroup = new Ext.form.CheckboxGroup({
                    renderTo: this.innerList,
                    columns: 1,
                    autoHeight: true,
                    border: false,
                    items: checkboxes
                });

                this.cbgroup.mon(this.cbgroup, 'change', function (cbg, arr) {
                    this.fireEvent('change', this, arr);
                }, this, { buffer: 50 });
            },

            /**
             * @method onTriggerClick
             * @hide
             */
            // private
            // Implements the default empty TriggerField.onTriggerClick function
            onTriggerClick: function () {
                if (this.readOnly || this.disabled) {
                    return;
                }
                if (this.isExpanded()) {
                    this.collapse();
                    this.el.focus();
                } else {
                    this.onFocus({});
                    if (this.triggerAction == 'all') {
                        this.store.reload();
                    }
                    this.expand();
                    this.el.focus();
                }
            },

            // A renderer for displaying the values in a grid
            gridRenderer: function (value) {
                if (typeof value == 'string') {
                    value = value.split(',');
                }

                var text = [];

                Ext.each(value, function (v) {
                    if (this.valueField) {
                        var r = this.findRecord(this.valueField, v);
                        if (r) {
                            text.push(r.data[this.displayField]);
                        }
                    }
                }, this);

                return text.join(', ');
            }
        });
        

        var cmb = Ext.create(Ext.ux.form.CheckboxCombo, { renderTo: document.body, store: 'fieldStore', lazyInit: true, displayField: 'field1', valueField: 'field2' });


    }
    checkBoxExample();

>>>>>>> 67f0bd3a70d61e90494ab6a6574078d728e5ec3c
});