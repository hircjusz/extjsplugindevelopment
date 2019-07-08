/*!
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.onReady(function () {

    Ext.define('Ext.ux.grid.VarHeaders', {
        extend: 'Ext.util.Observable',
        alias: 'plugin.varheaders',
        init: function(cmp) {
            

        }


    });


    Ext.define("Examples.plugin.GridSearch", {
        extend: 'Ext.util.Observable',
        alias: 'plugin.gridsearch',

        config: {

            iconCls: 'icon-zoom',
            checkIndexes: "all",
            mode: 'local',
            minChars: 1,
            width: 100,
            searchText: 'Search',
            selectAllText: 'Select all',
            position: 'bottom',
            paramNames: {
                fields: 'fields'
                , query: 'query'
            },
            menucontext:[
            {
                text: 'AddRecord',
                handler: function() {}
            }]

        },

        init: function (cmp) {

            this.grid = cmp.view.up('gridpanel');

            if (this.grid.rendered) {
                this.onRender();
            } else {
                this.grid.on('render', this.onRender, this);
            }
        },
        onRender: function () {
            var tb = this.getToolbar();
            this.menu = new Ext.menu.Menu();


            this.field = Ext.create("Ext.form.field.Trigger", {
                width: this.width,
                selectOnFocus: undefined === this.selectOnFocus ?
                true : this.selectOnFocus,
                triggerCls: 'x-form-clear-trigger',
                minLength: this.minLength
            });
            this.field.on('render', function () {

                if (this.minChars) {
                    this.field.el.on({
                        scope: this,
                        buffer: 300,
                        keyup: this.onKeyUp
                    });
                }

                var map = new Ext.KeyMap(this.field.el, [{
                    key: Ext.EventObject.ENTER,
                    scope: this,
                    fn: this.onTriggerSearch
                }, {
                    key: Ext.EventObject.ESC,
                    scope: this,
                    fn: this.onTriggerClear
                }]);
                map.stopEvent = true;
            }, this, {
                single: true
            });

            tb.add('->', {
                text: this.searchText,
                menu: this.menu,
                iconCls: this.iconCls
            }, this.field);

            this.initMenu();
            //gridpanel context menu
            if (this.menucontext) {

                if(!(this.menucontext instanceof Ext.menu.Menu)) {
                    this.menucontext = this.buildMenuContext(this.menucontext);
                }
                this.grid.on({
                    scope: this,
                    itemcontexmenu:this.onItemContextMenu
                });

            }

        },
        buildMenuContext: function (menuCfg) {
            if (Ext.isArray(menuCfg)) {
                menuCfg= {
                    items:menuCfg
                }
            }
            return  Ext.create('Ext.menu.Menu',menuCfg);
        },
        onItemContextMenu: function(grid,model,row,index,evt) {
            evt.stopEvent();
            this.menucontext.showAt(evt.getXY());

        },
        initMenu : function() {

            var menu = this.menu;
            menu.removeAll();

            menu.add(new Ext.menu.CheckItem({
                text: this.selectAllText,
                checked: !(this.checkIndexes instanceof Array),
                hideOnClick: false,
                handler: function(item) {
                    var checked = item.checked;
                    menu.items.each(function(i) {
                        if (item !== i && i.setChecked && !i.disabled) {
                            i.setChecked(checked);
                        }
                    });
                }
            }), '-');

            var cm = this.grid.headerCt.items.items;

            var group = undefined;
            Ext.each(cm, function (item) {
                var config = item.initialConfig;
                var disable = false;

                if (config.header && config.dataIndex) {
                    Ext.each(this.disableIndexes, function (item) {
                        disable = disable ? disable :
                                  item === config.dataIndex;
                    });
                    if (!disable) {
                        menu.add(new Ext.menu.CheckItem({
                            text: config.header,
                            hideOnClick: false,
                            group: group,
                            checked: 'all' === this.checkIndexes,
                            dataIndex: config.dataIndex
                        }));
                    }
                }
            }, this);

            if (this.checkIndexes instanceof Array) {
                Ext.each(this.checkIndexes, function (di) {
                    var item = menu.items.find(function (itm) {
                        return itm.dataIndex === di;
                    });
                    if (item) {
                        item.setChecked(true, true);
                    }
                }, this);
            }
        },
        onKeyUp : function(e, t, o) {
            
            if (e.isNavKeyPress()) {
                return;
            }
            var length = this.field.getValue().toString().length;
            if (0 === length || this.minChars <= length) {
                this.onTriggerSearch();
            }
        },
        onTriggerSearch: function() {

            if (!this.field.isValid()) {
                return;
            }
            var val = this.field.getValue(),
                store = this.grid.store,
                proxy = store.getProxy();

            if ('local' === this.mode) {
                store.clearFilter();
                if (val) {
                    store.filterBy(function (r) {
                        var retval = false;
                        this.menu.items.each(function (item) {
                            if (!item.dataIndex || !item.checked || retval) {
                                return;
                            }

                            var rv = r.get(item.dataIndex), rv = rv instanceof Date ?
                                     Ext.Date.format(rv, this.getDateFormat(item)) : rv;

                            var re = new RegExp(Ext.String.escape(val), 'gi');
                            retval = re.test(rv);
                        }, this);
                        if (retval) {
                            return true;
                        }
                        return retval;
                    }, this);
                } else {
                }
            }

        },
        getDateFormat: function (menuItem) {

            var columnNames = Ext.Array.pluck(this.grid.columns, 'dataIndex'),
                columnIndex = Ext.Array.indexOf(columnNames, menuItem.dataIndex),
                format = this.grid.columns[columnIndex].format;

            return this.dateFormat || format;
        },
        onTriggerClear : function() {
            if (this.field.getValue()) {
                this.field.reset();
                this.field.focus();
                this.onTriggerSearch();
            }
        },
        getToolbar: function () {
            var me = this,
            dockedItems = this.grid.getDockedItems(),
            toolbar = null,
            hasToolbar = false;

            if (dockedItems.length > 0) {
                Ext.each(dockedItems, function(item) {
                    if (item.xtype === 'toolbar' && item.dock == me.position) {
                        hasToolbar = true;
                        toolbar = item;
                        return false;
                    }
                });
            }

            if (!hasToolbar) {
                toolbar = this.grid.addDocked({
                    xtype: 'toolbar',
                    dock: this.position
                })[0];
            }
            return toolbar;
        }


    });



});