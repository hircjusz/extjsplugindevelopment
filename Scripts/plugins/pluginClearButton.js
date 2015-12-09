/*!
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.onReady(function () {

    Ext.define('ns.plugin.ClearButton', {
        alias: 'plugin.clearbutton',
        /**
       * @cfg {Boolean} Hide the clear button when the field is empty (default: true).
       */
        hideClearButtonWhenEmpty: true,

        /**
         * @cfg {Boolean} Hide the clear button until the mouse is over the field (default: true).
         */
        hideClearButtonWhenMouseOut: true,

        /**
         * @cfg {Boolean} When the clear buttons is hidden/shown, this will animate the button to its new state (using opacity) (default: true).
         */
        animateClearButton: true,

        /**
         * @cfg {Boolean} Empty the text field when ESC is pressed while the text field is focused.
         */
        clearOnEscape: true,

        /**
         * @cfg {String} CSS class used for the button div.
         * Also used as a prefix for other classes (suffixes: '-mouse-over-input', '-mouse-over-button', '-mouse-down', '-on', '-off')
         */
        clearButtonCls: 'ext-ux-clearbutton',

        /**
         * The text field (or text area, combo box, date field) that we are attached to
         */
        textField: null,

        /**
         * Will be set to true if animateClearButton is true and the browser supports CSS 3 transitions
         * @private
         */
        animateWithCss3: false,

        constructor: function (cfg) {
            Ext.apply(this, cfg);

            this.callParent(arguments);
        },
        init: function (textField) {
            this.textField = textField;
            if (!textField.rendered) {
                textField.on('afterrender', this.handleAfterRender, this);
            }
            else {
                // probably an existing input element transformed to extjs field
                this.handleAfterRender();
            }
        },
        handleAfterRender: function () {

            this.TextArea = this.textField.inputEl.dom.type.toLowerCase() == 'textarea';
            this.createClearButtonEl();
            this.addListeners();
            this.repositionClearButton();
        },

        createClearButtonEl: function () {

            this.createClearButtonEl = this.textField.bodyEl.createChild({
                tag: 'div',
                cls: this.clearButtonCls
            });
            this.createClearButtonEl.setStyle('visibility', 'hidden');
        },
        addListeners: function() {
            
            // listeners on clear button (DOM/El level)
            var clearButtonEl = this.createClearButtonEl;

            clearButtonEl.on('click', this.handleMouseClickOnClearButton, this);
            clearButtonEl.on('mouseover', this.handleMouseOverClearButton, this);


        },
        
        handleMouseOverClearButton: function (event, htmlElement, object) {
            event.stopEvent();
            if (this.textField.bodyEl.contains(event.getRelatedTarget())) {
                // has been handled in handleMouseOutOfInputField() to prevent double update
                return;
            }
            this.createClearButtonEl.addCls(this.clearButtonCls + '-mouse-over-button');
            this.createClearButtonEl.setVisible(true);
            //this.updateClearButtonVisibility();
        },
        /**
         * Tada - the real action: If user left clicked on the clear button, then empty the field
         */
        handleMouseClickOnClearButton: function (event, htmlElement, object) {
            if (!this.isLeftButton(event)) {
                return;
            }
            this.textField.setValue('');
            this.textField.focus();
        },
        
        isLeftButton: function(event) {
            return event.button === 0;
        },
        repositionClearButton: function () {
            var clearButtonEl = this.createClearButtonEl;
            if (!clearButtonEl) {
                return;
            }
            var clearButtonPosition = this.calculateClearButtonPosition(this.textField);
            clearButtonEl.dom.style.right = clearButtonPosition.right + 'px';
            clearButtonEl.dom.style.top = clearButtonPosition.top + 'px';
        },
        calculateClearButtonPosition: function (textField) {
            var positions = textField.inputEl.getBox(true, true);
            var top = positions.y;
            var right = positions.x;
            //if (this.fieldHasScrollBar()) {
            //    right += Ext.getScrollBarWidth();
            //}
            //if (this.textField.triggerWrap) {
            //    right += this.textField.getTriggerWidth();
            //}
            return {
                right: right,
                top: top
            };
        }


    });

});