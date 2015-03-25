/*!
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.onReady(function () {


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
            }

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

        },
        onKeyUp : function(e, t, o) {
            

        },
        onTriggerSearch: function() {
            

        },
        onTriggerClear : function() {
            

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