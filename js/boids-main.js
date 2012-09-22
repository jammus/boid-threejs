define(['jquery', 'threejs', 'boid'], function($, THREE, Boid) {
    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;

    var VIEW_ANGLE = 45,
        ASPECT = WIDTH / HEIGHT,
        NEAR = 0.1,
        FAR = 10000;

    var container = $('#container');

    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(new THREE.Color(0, 1));
    renderer.setSize(WIDTH, HEIGHT);
    var camera = new THREE.PerspectiveCamera(
        VIEW_ANGLE, ASPECT, NEAR, FAR
    );

    var scene = new THREE.Scene();

    camera.position.z = 500;
    scene.add(camera);

    container.append(renderer.domElement);

    Boid.MAX_VELOCITY = new THREE.Vector3(2, 2, 2);
    var boid = new Boid(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(1, .3, 1),
        200
    );
    var boid_two = new Boid(
        new THREE.Vector3(-5, -5, -5),
        new THREE.Vector3(-1, .3, -1),
        200,
        10,
        boid
    );

    var particles = new THREE.Geometry();
    particles.dynamic = true;
    particles.vertices.push(boid.position());
    particles.vertices.push(boid_two.position());

    var boidMaterial = new THREE.ParticleBasicMaterial({
        color: 0xFFFFAA,
        size: 30,
        map: new THREE.ImageUtils.loadTexture("images/particle.png"),
        blending: THREE.AdditiveBlending,
        transparent: true
    });

    var particleSystem = new THREE.ParticleSystem(particles, boidMaterial);
    particleSystem.sortParticles = true;

    scene.add(particleSystem);

    function animate() {
        boid.update();
        boid_two.update();
        particles.verticesNeedUpdate = true;
    }

    function frame(time) {
        animate(time);
        renderer.render(scene, camera);
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

});
