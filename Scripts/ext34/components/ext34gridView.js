/*!
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.onReady(function() {

        //Ext.define('LogEntry', {
        //    extend: 'Ext.data.Model',
        //    fields: [
        //       { name: 'text' }

        //    ]
        //});

        /*var store = Ext.create('Ext.data.Store', {
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
    */
        var htmlLayout = function() {
            Ext.ns('Ext.ux.layout');
            Ext.ux.layout.HtmlLayout = Ext.extend(Ext.layout.ContainerLayout, {
                renderItem: function(c, position, target) {
                    if (c.renderTarget) {
                        target = Ext.DomQuery.selectNode(c.renderTarget, Ext.getDom(target));
                    } else if (c.applyTarget) {
                        var el = Ext.DomQuery.selectNode(c.applyTarget, Ext.getDom(target));;
                        if (!c.rendered) {
                            c.el = el;
                        }
                        target = el.parentNode;
                    }
                    Ext.ux.layout.HtmlLayout.superclass.renderItem.call(this, c, undefined, target);
                }
            });
            Ext.Container.LAYOUTS['ux.html'] = Ext.ux.layout.HtmlLayout;

            var panel = new Ext.Panel({
                title: 'HtmlLayout test',
                autoHeight: true,
                layout: 'ux.html',
                html: '<table>' +
                    '<tr>' +
                    '<td>Please enter your name </td><td></td><td> and password </td><td><input type="password" /></td><td>.</td></tr></table>',
                defaultType: 'textfield',
                items: [
                    {
                        xtype: 'datefield',
                        name: 'username',
                        renderTarget: 'td:nth(2)'
                    }, {
                        xtype: 'textfield',
                        name: 'password',
                        applyTarget: 'input[type=password]'
                    }
                ]
            }).render(Ext.getBody());

        };

        var panelEditor = function() {

            Ext.ns('Ext.ux.grid');
            Ext.ux.grid.EditableGrid = Ext.extend(Object, {
                init: function (grid)
                {
                    grid.on('afterrender', function viewReady() {

                        Ext.apply(grid.getView(), {
                            editors: [],
                            editorPadding: 2,
                            renderUI: function() {
                                this.constructor.prototype.renderUI.call(this);
                                this.grid.el.addClass('x-grid-editing');
                            },
                            updateAllColumnWidths: function() {
                                this.constructor.prototype.updateAllColumnWidths.call(this);
                                var editors = this.editors,
                                    rows = editors.length,
                                    cols = this.cm.getColumnCount(),
                                    col,
                                    row,
                                    ed,
                                    w = [];
                                for (col = 0; col < cols; col++) {
                                    w[col] = this.cm.getColumnWidth(col) - this.editorPadding;
                                }
                                for (row = 0; row < rows; row++) {
                                    for (col = 0; col < cols; col++) {
                                        ed = editors[row][col];
                                        if (ed) {
                                            ed.setWidth(w[col]);
                                        }
                                    }
                                }
                            },
                            updateColumnWidth: function(col, width) {
                                this.constructor.prototype.updateColumnWidth.call(this, col, width);
                                var editors = this.editors,
                                    rows = editors.length,
                                    row,
                                    ed,
                                    w = this.cm.getColumnWidth(col) - this.editorPadding;
                                for (row = 0; row < rows; row++) {
                                    ed = editors[row][col];
                                    if (ed) {
                                        ed.setWidth(w);
                                    }
                                }
                            },
                            afterRender: function() {
                                this.constructor.prototype.afterRender.call(this);
                                this.destroyAllEditors();
                                this.renderEditors(0, this.ds.getCount() - 1);
                            },
                            insertRows: function(dm, firstRow, lastRow, isUpdate) {
                                this.constructor.prototype.insertRows.call(this, dm, firstRow, lastRow, isUpdate);
                                var last = dm.getCount() - 1;
                                if (!isUpdate && firstRow === 0 && lastRow >= last) {
                                    return;
                                }
                                this.renderEditors(firstRow, lastRow);
                            },
                            deleteRows: function(dm, firstRow, lastRow) {
                                if (dm.getRowCount() >= 1) {
                                    this.destroyEditors(firstRow, lastRow);
                                }
                                this.constructor.prototype.deleteRows.call(this, dm, firstRow, lastRow);
                            },
                            refreshRow: function(record) {
                                var ds = this.ds, index;
                                if (typeof record == 'number') {
                                    index = record;
                                    record = ds.getAt(index);
                                    if (!record) {
                                        return;
                                    }
                                } else {
                                    index = ds.indexOf(record);
                                    if (index < 0) {
                                        return;
                                    }
                                }
                                this.destroyEditors(index, index);
                                this.constructor.prototype.refreshRow.call(this, record);
                                this.renderEditors(index, index);
                            },
                            refresh: function(headersToo) {
                                this.destroyAllEditors();
                                this.constructor.prototype.refresh.call(this, headersToo);
                                this.renderEditors(0, this.ds.getCount() - 1);
                            },
                            destroy: function() {
                                this.destroyAllEditors();
                                this.constructor.prototype.destroy.call(this);
                            },
                            focusCell: function(row, col, hscroll) {
                                this.syncFocusEl(this.ensureVisible(row, col, hscroll));
                                var ed = this.editors[row][col], focusEl = ed ? ed : this.focusEl;
                                if (Ext.isGecko) {
                                    focusEl.focus();
                                } else {
                                    focusEl.focus.defer(1, this.focusEl);
                                }
                            },
                            renderEditors: function(startRow, endRow) {
                                var args = [startRow, 0],
                                    cols = this.cm.getColumnCount(),
                                    col,
                                    row,
                                    ed,
                                    w = [],
                                    rec,
                                    r,
                                    di,
                                    cell;
                                for (col = 0; col < cols; col++) {
                                    w[col] = this.cm.getColumnWidth(col) - this.editorPadding;
                                }
                                for (row = startRow; row <= endRow; row++) {
                                    r = [];
                                    rec = this.ds.getAt(row);
                                    for (col = 0; col < cols; col++) {
                                        ed = this.cm.isCellEditable(col, row) ? this.cm.getCellEditor(col, row) : null;
                                        if (ed) {
                                            cell = this.getCell(row, col).firstChild;
                                            cell.parentNode.removeAttribute('tabindex');
                                            cell.innerHTML = '';
                                            di = this.cm.getDataIndex(col);
                                            ed = ed.field.cloneConfig({
                                                value: rec.get(di),
                                                width: w[col],
                                                renderTo: cell,
                                                ctCls: 'x-small-editor x-grid-editor ux-editable-grid'
                                            });
                                            ed.on('blur', this.onEditorBlur, {
                                                store: this.ds,
                                                row: row,
                                                dataIndex: di
                                            });
                                        }
                                        r.push(ed);
                                    }
                                    args.push(r);
                                }
                                this.editors.splice.apply(this.editors, args);
                            },
                            destroyEditors: function(startRow, endRow) {
                                var removed = this.editors.splice(startRow, endRow - startRow + 1);
                                Ext.destroy(removed);
                            },
                            destroyAllEditors: function() {
                                Ext.destroy(this.editors);
                                this.editors = [];
                            },
                            onEditorBlur: function(field) {
                                this.store.getAt(this.row).data[this.dataIndex] = field.getValue();
                            }
                        });

                        var view = grid.getView();
                        view.destroyAllEditors();
                        view.renderEditors(0, view.ds.getCount() - 1);

                    });
                }
            });
        Ext.preg('editable-grid', Ext.ux.grid.EditableGrid);

       var panel= new Ext.grid.GridPanel({
            title: 'EditableGrid plugin test',
            width: 250,
            height: 150,
            store: [[1, 'One'], [2, 'Two'], [3, 'Three'], [4, 'Four'], [5, 'Five']],
            viewConfig: {
                forceFit: true
            },
            columns: [{
                header: 'Value',
                dataIndex: 'field1',
                editor: {
                    xtype: 'numberfield',
                    minValue: 0,
                    maxValue: 100
                }
            }, {
                header: 'Text',
                dataIndex: 'field2',
                editor: {
                    xtype: 'textfield',
                    allowBlank: false
                }
            }],
                plugins: [{
            ptype: 'editable-grid'
           }],
           
            renderTo: Ext.getBody()
        });

    };

        var standardNotationComboBox = function() {
            /*globals ActiveXObject, DOMParser, XMLSerializer*/
            Ext.ns('Ext.extensions.form.standardnotation');

            // TODO: maxlength
            // TODO: fire autosize after value change
            // Comdbo zapisów standardowych
            Ext.extensions.form.standardnotation.StandardNotation = Ext.extend(Ext.form.ComboBox, {
                editable: false,
                defaultAutoCreate: { tag: "div", tabindex: '0' },
                displayField: 'template',
                multiple: false,
                triggerAction: 'all',
                trigger2Class: 'x-window-trigger',
                trigger3Class: 'x-question-trigger',
                templateIndex: 'template',
                fieldsDefinitionIndex: 'fields',
                initTrigger: function () {
                    this.trigger.remove();

                    this.trigger = this.wrap.createChild(this.triggerConfig || { tag: "img", src: Ext.BLANK_IMAGE_URL, alt: "", cls: "x-form-trigger " + this.triggerClass }, this.el);
                    Ext.extensions.form.standardnotation.StandardNotation.superclass.initTrigger.call(this);

                    this.trigger2 = this.wrap.createChild({ tag: "img", src: Ext.BLANK_IMAGE_URL, alt: "", cls: "x-form-trigger x-form-trigger2 " + this.trigger2Class }, this.el);
                    this.mon(this.trigger2, 'click', this.onTrigger2Click, this, { preventDefault: true });
                    this.trigger2.addClassOnOver('x-form-trigger-over');
                    this.trigger2.addClassOnClick('x-form-trigger-click');

                    this.trigger3 = this.wrap.createChild({ tag: "img", src: Ext.BLANK_IMAGE_URL, alt: "", cls: "x-form-trigger x-form-trigger3 " + this.trigger3Class }, this.el);
                    this.mon(this.trigger3, 'click', this.onTrigger3Click, this, { preventDefault: true });
                    this.trigger3.addClassOnOver('x-form-trigger-over');
                    this.trigger3.addClassOnClick('x-form-trigger-click');

                    this.trigger[this.store.autoStore ? 'addClass' : 'removeClass']('x-hide-display');
                    this.trigger2[this.records.length ? 'removeClass' : 'addClass']('x-hide-display');
                    this.trigger3[this.records.length ? 'removeClass' : 'addClass']('x-hide-display');
                },
            });
            Ext.reg('sncombo', Ext.extensions.form.standardnotation.StandardNotation);

            Ext.create(Ext.extensions.form.standardnotation.StandardNotation, { renderTo: document.body });
        };

    standardNotationComboBox();

});