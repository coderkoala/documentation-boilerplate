(function() {

    var global = this;

    var $ = global.$;

    var Documentation = global.Documentation = { };

    var Core = Documentation.core = function(options) {
        var defaults = {
        };

        this.config = $.extend(true, defaults, options || { });

        this._init();
    };

    Core.prototype._init = function() {

        // Bring in content in a table - requires handlebars and helps manage content for mobile
        // this._fillContent('table');
        // this._fillContent('mobile');

        // Open all links within Documentation in a new window
        $('#documentation').on('click', 'a', $.proxy(this._targetBlank, this));
    };

    Core.prototype._targetBlank = function(evt) {
        evt.preventDefault();

        var url = $(evt.currentTarget).attr('href');

        global.open(url);
    };

    Core.prototype._fillContent = function(type) {
        // Source should be in <script> in html
        var source = $('#content-'+type).html(),
            template = Handlebars.compile(source),
            research_results = template(copy);

        if (type === 'table') {
            $('#[semantic-id]-table').find('tbody').append(research_results);
        } else {
            $('#[semantic-id]-list').append(research_results);
        }
    };

}).call(this);
