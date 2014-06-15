;(function ( $, window, document, undefined ) {
    var PLUGIN_NAME = 'showMarkup';
    var PROP_NAME_TAG = 'tagName';
    var CODE_SELECTOR = 'code';

    defaults = {
        initShow: true,
        buttonShow: undefined,
        buttonHide: undefined
    };

    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
        this.init();
    }

    Plugin.prototype = {
        init : function () {
            var $elementWithMarkup = $(this.element);
            initialCodeVisibility(this.options.initShow, $elementWithMarkup);
            attachShowButtonClick(this.options.buttonShow, $elementWithMarkup);
            attachHideButtonClick(this.options.buttonHide, $elementWithMarkup);
        }
    };

    function initialCodeVisibility(initShow, $element) {
        if (initShow === false) {
            return;
        }
        showMarkupForObjAndChildren($element);
    }


    function attachShowButtonClick(buttonShow, $element) {
        if (buttonShow) {
            $('body').delegate(buttonShow, 'click', function() {
                showMarkupForObjAndChildren($element);
            });
        }
    }

    function attachHideButtonClick(buttonHide, $element) {
        if (buttonHide) {
            $('body').delegate(buttonHide, 'click', function() {
                $element.find(CODE_SELECTOR).remove();
            });
        }
    }

    function showMarkupForObjAndChildren(obj) {
        obj.children().each(function(idx, child) {
            showMarkupForObjAndChildren($(child));
        });
        showMarkup(obj);
    }

    function showMarkup(obj) {
        var html = obj.html();
        var tagName = obj.prop(PROP_NAME_TAG).toLowerCase();
        if (tagName === 'button') {
            return;
        }
        obj.html('<code>&lt;' + tagName + '&gt;</code>' + html + '<code>&lt;/' + tagName + '&gt;</code>');
    }

    $.fn[PLUGIN_NAME] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + PLUGIN_NAME)) {
                $.data(this, 'plugin_' + PLUGIN_NAME,
                    new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );