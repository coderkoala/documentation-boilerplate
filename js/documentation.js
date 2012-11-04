(function() {

    var global = this;

    var $ = global.$;

    var Documentation = global.Documentation = { };

    var Core = Documentation.core = function(options) {
        var defaults = {
            // Path to the markdown document relative to the index file
            md_src: 'document.md',
            el: {
                documentation: '#documentation',
                loading: '#loading'
            },
            templates: {
                footer: '#tmpl-footer'
            },
            copy: {
                warning_file_protocol: '<strong>Warning:</strong> the markdown file cannot be loaded through the `file:` protocol. This file should be served through a webserver.'
            }
        };

        this.config = $.extend(true, defaults, options || { });

        this._init();
    };

    Core.prototype._init = function() {
        this._registerInstanceVariables();

        // Load markdown text
        if (global.location.protocol !== 'file:') {
            this.$documentation.load(this.config.md_src, $.proxy(this._processMarkdown, this));
        } else {
            this.$loading.html(this.config.copy.warning_file_protocol);
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


        $('pre').addClass('prettyprint linenums');
        global.prettyPrint && prettyPrint();

        // Generate meta HTML as footer
        this.fillContent({
            template_source: this.config.templates.footer,
            append_to: this.config.el.documentation,
            context: copy // `copy` can be found in view.js
        });

        this._processTables();
        this._cleanUpMarkdown();
    };

    Core.prototype._cleanUpMarkdown = function() {
        this.$documentation.find('> p, > ul, > ol, > blockquote, > h3, > h4, > h5, > h6').each(function(i, obj) {
            $(obj).wrap('<div class="main-container container-fluid" />');
        });
    };

    Core.prototype._processTables = function() {
        $('table').each(function(table_id, obj) {
            var $obj = $(obj),
                $th = $obj.find('thead').find('th'),
                $tr = $obj.find('tbody').find('tr'),
                labels = [],
                entries = [],
                entry = {};

            var next = obj.nextSibling;

            console.log($(obj.nextSibling));
            if ($(obj.nextSibling).is('p')) {
                $(obj.nextSibling).wrap('<div class="main-container container-fluid />');
            }

            $obj.addClass('table table-bordered table-striped table-id-'+table_id)
                .wrap('<div class="large-container container-fluid" />');

            if (!$obj.hasClass('all-devices')) {
                $(obj).addClass('hidden-phone');
                $th.each(function(i, obj) {
                    labels[i] = $(obj).text();
                });

                $tr.each(function(row, obj) {
                    $(obj).find('td').each(function(i, obj) {
                        var value = $(obj).html();
                        entry['"'+labels[i]+'"'] = value;
                    });

                    entries.push(entry);

                    // Need to empty the entry for the next value
                    entry = {};
                });

                var ul = '<ul class="list-from-table visible-phone list-id-'+table_id+'" />';
                $obj.after(ul);

                $.each(entries, function(entry_id, entry) {
                    var li = '<li><dl class="entry-id-'+entry_id+'"></dl></li>',
                        dt, dd;

                    $('.list-id-'+table_id).append(li);

                    $.each(labels, function(i, label) {
                        dt = '<dt>'+label+'</dt>';
                        dd = '<dd>'+entry['"'+label+'"']+'</dd>';

                        $('.entry-id-'+entry_id).append(dt + dd);
                    });
                });
            }
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
