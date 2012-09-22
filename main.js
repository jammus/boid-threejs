requirejs.config({
    paths: {
        jquery: 'lib/jquery/jquery-require',
        threejs: 'lib/three/three-require',
        text: 'lib/require/text'
    }
});

requirejs(["lib/jquery/jquery.min.js", "lib/three/three.min.js"], function() {
    jQuery('[data-require]').each(function(index, element) {
        requirejs([$(element).data('require')], function() {
        });
    });
});
