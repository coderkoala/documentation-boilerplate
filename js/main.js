requirejs.config({
    shim: {
        'documentation': {
            deps: [
                '../lib/jquery/jquery-1.8.2.min',
                '../lib/bootstrap/js/bootstrap.min',
                '../lib/prettify/js/prettify',
                '../lib/handlebars/handlebars-1.0.rc.1',
                '../lib/showdown/showdown',
                'view'
            ],
            exports: 'Documentation'
        },
        '../lib/bootstrap.min': {
            deps: [
                '../lib/jquery/jquery-1.8.2.min'
            ]
        }
    }
});

require([
    'documentation',
    '../lib/jquery/jquery-1.8.2.min',
    '../lib/prettify/js/prettify',
    '../lib/bootstrap/js/bootstrap.min',
    '../lib/handlebars/handlebars-1.0.rc.1',
    '../lib/showdown/showdown',
    'view'
], function() {

    var global  = this; // in context to the browser `this` is `window`

    var $       = global.$;

    $(function() {
        var documentation = new Documentation.core();
    });

});
