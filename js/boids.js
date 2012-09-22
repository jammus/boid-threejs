define(['jquery', 'threejs'], function($, THREE) {

    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;

    var VIEW_ANGLE = 45,
        ASPECT = WIDTH / HEIGHT,
        NEAR = 0.1,
        FAR = 10000;

    var dropping = false;

    var container = $('#container');

    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(new THREE.Color(0, 1));
    renderer.setSize(WIDTH, HEIGHT);
    var camera = new THREE.PerspectiveCamera(
        VIEW_ANGLE, ASPECT, NEAR, FAR
    );

    var scene = new THREE.Scene();

    camera.position.z = 300;
    scene.add(camera);

    container.append(renderer.domElement);

    function animate() {
    }

    function frame(time) {
        animate(time);
        renderer.render(scene, camera);
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

});
