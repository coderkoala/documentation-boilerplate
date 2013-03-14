define(
    [
        'jquery',
        'underscore',
        'showdown',
        'prettify'
    ],
    function(
        $,
        _,
        __showdown__,
        __prettify__
    ) {

        var Documentation = function(options) {
            var defaults = {
                // Path to the markdown document relative to the index file
                md_src: 'document.md',
                el: {
                    documentation: '#documentation',
                    loading: '#loading'
                },
                copy: {
                    warning_file_protocol: '<strong>Warning:</strong> the markdown file cannot be loaded through the `file:` protocol. This file should be served through a webserver.'
                }
            };

            this.config = $.extend(true, defaults, options || { });

            this._init();
        };

        Documentation.prototype._init = function() {
            this._registerInstanceVariables();

            var parser = document.createElement('a');
            parser.href = window.location;

            // Load markdown text
            if (window.location.protocol !== 'file:') {
                if (parser.search.indexOf('?src') === -1 ) {
                    this.$documentation.load(this.config.md_src, $.proxy(this._processMarkdown, this));
                } else {
                    var src = parser.search.replace('?src=','').replace('.md', '');
                    this.$documentation.load(src+'.md', $.proxy(this._processMarkdown, this));
                }
            } else {
                this.$loading.html(this.config.copy.warning_file_protocol);
            }

            // Open all links within Documentation in a new window
            this.$documentation.on('click', 'a', $.proxy(this.targetBlank, this));
        };

        Documentation.prototype._registerInstanceVariables = function() {
            var config = this.config

            this.$documentation = $(config.el.documentation);
            this.$loading = $(config.el.loading);
        };

        Documentation.prototype._processMarkdown = function(data) {
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
                $set.wrapAll('<div class="container-fluid" id="'+id+'" />');
            });

            $('h2').wrap('<header />');
            $('p').first().attr('class', 'lead');
            $('h1').attr('id', '').prependTo('header:first');


            $('pre').addClass('prettyprint linenums');
            window.prettyPrint && prettyPrint();

            this._processTables();
            this._cleanUpMarkdown();
        };

        Documentation.prototype._cleanUpMarkdown = function() {
            this.$documentation.find('> p, > ul, > ol, > blockquote, > h3, > h4, > h5, > h6').each(function(i, obj) {
                $(obj).wrap('<div class="container-fluid" />');
            });
        };

        Documentation.prototype._processTables = function() {
            $('table').each(function(table_id, obj) {
                var $obj = $(obj),
                    $th = $obj.find('thead').find('th'),
                    $tr = $obj.find('tbody').find('tr'),
                    labels = [],
                    entries = [],
                    entry = {};

                var next = obj.nextSibling;

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

        Documentation.prototype.targetBlank = function(evt) {
            var url = $(evt.currentTarget).attr('href');
            var urlParser = document.createElement('a'),
                parser = document.createElement('a');

            urlParser.href = url;
            parser.href = window.location;

            if (urlParser.hostname != parser.hostname) {
                evt.preventDefault();
                window.open(url);
            }
        };

        $(function() {
            var documentation = new Documentation();
        });
    }
);
