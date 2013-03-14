require.config({

    baseUrl: 'js/',

    waitSeconds: 30,

    paths: {
        // jQuery
        'jquery'                    : '../components/jquery/jquery',
        'almond'                    : '../components/almond/almond',
        'modernizr'                 : '../components/modernizr/modernizr',
        'underscore'                : '../components/underscore/underscore',

        // Third Party Plugins
        'prettify'                  : '../components/bootstrap/docs/assets/js/google-code-prettify/prettify',
        'showdown'                  : '../components/showdown/showdown',

        'documentation'             : 'documentation'
    },

    shim: {
        underscore: {
            exports: '_'
        }
    }

});

require(['modernizr']);
require(['documentation']);

