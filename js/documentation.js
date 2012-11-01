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

        // Load markdown text
        $('#documentation').load('document.md', $.proxy(this._processMarkdown, this));

        // Open all links within Documentation in a new window
        $('#documentation').on('click', 'a', $.proxy(this._targetBlank, this));
    };

    Core.prototype._targetBlank = function(evt) {
        evt.preventDefault();

        var url = $(evt.currentTarget).attr('href');

        global.open(url);
    };

    Core.prototype._processMarkdown = function() {
        var md = $('#documentation').text(),
            converter = new Showdown.converter(),
            html = converter.makeHtml(md);

        $('#documentation').html(html);

        $('h2').each(function(i, obj){
            var $set = $(),
                next = obj.nextSibling;

            $(obj).wrapInner('<span class="double-underline" />');

            $set.push(obj);

            while (next) {
                if (!$(next).is('h2')) {
                    $set.push(next);
                    next = next.nextSibling;
                } else break;
            }

            var id = $(obj).attr('id');

            $(obj).attr('id', '');
            $set.wrapAll('<div class="main-container container-fluid" id="'+id+'" />');
        });

        $('h2').wrap('<header />');
        $('p').first().attr('class', 'lead');
        $('h1').attr('id', '').prependTo('#introduction header');

        var highlight_text = $('h1 code').text();
        $('h1').find('code').replaceWith('<span class="highlight">'+highlight_text+'</span>');
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
