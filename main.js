requirejs.config({
    baseUrl: 'js/',
    urlArgs: 'bust=' + (new Date).getTime(),
    paths: {
        jquery: '../lib/jquery/jquery-require',
        three: '../lib/three/three-require',
        text: '../lib/require/text',
        underscore: '../lib/underscore/underscore-require'
    }
});

requirejs(["lib/jquery/jquery.min.js", "lib/three/three.min.js", "lib/underscore/underscore-min.js"], function() {
    jQuery('[data-require]').each(function(index, element) {
        requirejs([$(element).data('require')], function() {
        });
    });
});
