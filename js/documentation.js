(function() {

    var global = this;

    var $ = global.$;

    var Documentation = global.Documentation = { };

    var Core = Documentation.core = function(options) {
        var defaults = {
            el: {
                documentation: '#documentation',
                loading: '#loading'
            },
            copy: {
                warning_file_protocol: 'Warning: document.md cannot be loaded through the `file:` protocol. Browse the file with a webserver'
            }
        };

        this.config = $.extend(true, defaults, options || { });

        this._init();
    };

    Core.prototype._init = function() {
        this._registerInstanceVariables();

        // Load markdown text
        if (global.location.protocol !== 'file:') {
            this.$documentation.load('document.md', $.proxy(this._processMarkdown, this));
        } else {
            this.$loading.text(this.config.copy.warning_file_protocol);
        }

        // Open all links within Documentation in a new window
        this.$documentation.on('click', 'a', $.proxy(this.targetBlank, this));
    };

    Core.prototype._registerInstanceVariables = function() {
        var config = this.config

        this.$documentation = $(config.el.documentation);
        this.$loading = $(config.el.loading);
    };

    Core.prototype._processMarkdown = function(data) {
        var converter = new Showdown.converter(),
            html = converter.makeHtml(data);

        this.$documentation.html(html);

        $('h2').each(function(i, obj){
            var $set = $(),
                next = obj.nextSibling;

            $(obj).wrapInner('<span class="double-underline" />');

            $set.push(obj);

            while (next) {
                if (!$(next).is('h2') && !$(next).is('table')) {
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
        $('h1').attr('id', '').prependTo('header:first');

        $('table').addClass('table table-bordered table-striped').wrap('<div class="large-container container-fluid" />');

        $('pre').addClass('prettyprint linenums');
        global.prettyPrint && prettyPrint();

        // Generate meta HTML as footer
        this.fillContent({
            template_source: '#tmpl-footer',
            append_to: this.config.el.documentation,
            context: copy // `copy` can be found in view.js
        });

        this._processTables();
    };

    Core.prototype._processTables = function() {
        $('table').each(function(i, obj) {
            var $obj = $(obj),
                $th = $obj.find('thead').find('th'),
                $tr = $obj.find('tbody').find('tr'),
                labels = [],
                entries = [];

            $th.each(function(i, obj) {
                labels[i] = $(obj).text();
            });

            $tr.each(function(row, obj) {
                var entry = [];
                entries[row] = {};

                $(obj).find('td').each(function(i, obj) {
                    entry[i] = $(obj).text();
                });

                $.each(labels, function(i, val) {
                    console.log(val);
                });
            });
        });
    };

    Core.prototype.targetBlank = function(evt) {
        evt.preventDefault();

        var url = $(evt.currentTarget).attr('href');

        global.open(url);
    };

    Core.prototype.fillContent = function(settings) {
        // Source should be in <script> in html
        var template_source = $(settings.template_source).html(),
            template = Handlebars.compile(template_source),
            html = template(settings.context);

        $(settings.append_to).append(html);
    };

}).call(this);
