define(['jquery', 'three', 'boid', 'behaviours/boid'], function($, THREE, Boid, boidBehaviour) {
    Boid.prototype.MAX_VELOCTIY = new THREE.Vector3(1.5, 2, 1.5);

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

    var population = [],
        populationSize = 150;

    var particles = new THREE.Geometry();
    particles.dynamic = true;

    var boid, q;
    for (var i = 0; i < populationSize; i++) {
        q = Math.random() * 2 * Math.PI;
        boid = new Boid(
            new THREE.Vector3(Math.random() * Math.cos(q) * 200, Math.random() * 200 - 100, Math.random() * Math.sin(q) * 200),
            new THREE.Vector3(
                Math.random(),
                -Math.random(),
                Math.random()
            ),
            boidBehaviour,
            population
        );
        population.push(boid);
        particles.vertices.push(boid.position());
    }

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
        for (var i = 0; i < populationSize; i++) {
            population[i].update();
        }
        particles.verticesNeedUpdate = true;
    }

    function frame(time) {
        animate(time);
        renderer.render(scene, camera);
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

});
