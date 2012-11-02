requirejs.config({
    shim: {
        'documentation': {
            deps: [
                '../lib/jquery-1.8.2.min',
                '../lib/bootstrap.min',
                '../lib/prettify/prettify',
                '../lib/handlebars-1.0.rc.1',
                '../lib/showdown',
                'view'
            ],
            exports: 'Documentation'
        }
    }
});

require([
    'documentation',
    '../lib/jquery-1.8.2.min',
    '../lib/prettify/prettify',
    '../lib/bootstrap.min',
    '../lib/handlebars-1.0.rc.1',
    '../lib/showdown',
    'view'
], function() {

    var global  = this; // in context to the browser `this` is `window`

    var $       = global.$;

    $(function() {
        var documentation = new Documentation.core(); 
    });

});
