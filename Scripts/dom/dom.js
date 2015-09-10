/*!
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.onReady(function () {
    sm =  {};

    Ext.define('Manipulator', {
        added: [],

        constructor:function(config) {
            this.el = Ext.get(config.elTarget);
        },

        insertWhatsNew: function () {

            var newClassSystemConfig = {
                tag: 'li',
                html: 'New Class System'
            };
            var whatsNewListEl = this.el;

            var newClassSystemEl = Ext.core.DomHelper.append(whatsNewListEl, newClassSystemConfig);
            this.added.push(newClassSystemEl);
        }

    });

    sm.Manipulator = new Ext.create(Manipulator, {
        elTarget: 'whats-new'
    });

    sm.Manipulator.insertWhatsNew();

    var el = Ext.create('Ext.form.field.Base', {
        renderTo: Ext.getBody()
    });


    var manipulate = function () {
        //pierwsza funkcja z tutoriala
        var insertWhatsNew = function () {
            var newClassSystemConfig = {
                tag: 'li',
                html: 'New Class System'
            };
            var whatsNewListEl = Ext.get('whats-new');

            var newClassSystemEl = Ext.core.DomHelper.append(whatsNewListEl, newClassSystemConfig);
        };

        var insertBewforeWhatsNew = function () {

            var whatsNewListEl = Ext.get('whats-new');

            Ext.core.DomHelper.insertBefore(whatsNewListEl.first(), {
                tag: 'li',
                html: 'Infinite Scrolling'
            });

        };

        var templateWhatsNew = function () {

            var itemTpl = Ext.core.DomHelper.createTemplate({
                tag: 'li',
                html: '{newfeature}'
            });
            itemTpl.append('whats-new', { newfeature: 'Row Editor' });

        };
        var attachEvent = function() {
            var whatsNewEl = Ext.get('whats-new');

            whatsNewEl.on('click', function (e, target, options) {
                alert(target.innerHTML);
            }, this, {
                delegate: 'li'
            });

        };
        var eventTarget = function () {

            var whatsNewEl = Ext.get('whats-new');
            whatsNewEl.on('click', function (e, target, options) {
                var t = e.getTarget("li", this);
                if (!t) {
                    return;
                }
                alert(target.innerHTML);
            }, this);

        };
        var toolbarEvent = function () {
            var toolbarEl = Ext.get('toolbar');
            toolbarEl.on('click', function (e, target, options) {
                if (e.getTarget('a.add')) {
                  //  addItem();
                } else if (e.getTarget('a.edit')) {
                    //editItem();
                } else if (e.getTarget('a.delete')) {
                    //deleteItem();
                }
            }, this, {
                delegate: 'a'
            });

        };


        return {
            insertWhatsNew: insertWhatsNew,
            beforeWhatsNew: insertBewforeWhatsNew,
            templateWhatsNew: templateWhatsNew,
            attachEvent: attachEvent,
            eventTarget: eventTarget,
            toolbarEvent: toolbarEvent

        };
    }();

    //manipulate.insertWhatsNew();
    //manipulate.beforeWhatsNew();
    //manipulate.templateWhatsNew();
    //manipulate.toolbarEvent();


});