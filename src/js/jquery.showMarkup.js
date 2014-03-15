;(function ( $, window, document, undefined ) {
    var PLUGIN_NAME = 'showMarkup';
    var PROP_NAME_TAG = 'tagName',

    defaults = {
        initShow: true,
        buttonShow: undefined,
        buttonHide: undefined
    };

    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
        this._defaults = defaults;
        this.init();
    }

    Plugin.prototype.init = function () {
        initialCodeVisibility(this.options.initShow, $(this.element));
        attachShowButtonClick(this.options.buttonShow, $(this.element));
        attachHideButtonClick(this.options.buttonHide, $(this.element));
    };

    function initialCodeVisibility(initShow, element) {
        if (initShow === false) {
            return;
        }
        showMarkupForObjAndChildren(element);
    }


    function attachShowButtonClick(buttonShow, element) {
        if (buttonShow) {
            $(buttonShow).click(function() {
                showMarkupForObjAndChildren(element);
            });
        }
    }

    function attachHideButtonClick(buttonHide, element) {
        if (buttonHide) {
            $(buttonHide).click(function() {
                element.find('code').remove();
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
        obj.html('<code>&lt;' + tagName + '&gt;</code>' + html + '<code>&lt;/' + tagName + '&gt;</code>');
    }

    $.fn[PLUGIN_NAME] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + PLUGIN_NAME)) {
                $.data(this, 'plugin_' + PLUGIN_NAME,
                    new Plugin( this, options ));
            }
        });
    }

})( jQuery, window, document );
