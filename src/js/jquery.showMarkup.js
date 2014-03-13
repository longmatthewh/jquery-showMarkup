;(function ( $, window, document, undefined ) {
    var pluginName = 'showMarkup',
    PROP_NAME_TAG = 'tagName',
    defaults = {
        propertyName: "value"
    };

    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
        this._defaults = defaults;
        this.init();
    }

    Plugin.prototype.init = function () {
        showMarkupForObjAndChildren($(this.element));
    };

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

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                    new Plugin( this, options ));
            }
        });
    }

})( jQuery, window, document );
