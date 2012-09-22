define(['three'], function(THREE) {
    var CenteringBehaviour = function(dampening) {
        var that = this;

        that.calculate = function(boid, population) {
            var acceleration = new THREE.Vector3(0, 0, 0);
            population = population || [ ];
            for (var i = 0; i < population.length; i++) {
                acceleration.addSelf(population[i].position());
            }
            acceleration.divideScalar(population.length);
            acceleration.normalize();
            if (dampening) {
                acceleration.multiplySelf(dampening);
            }
            return {
                acceleration: acceleration
            }
        };

    };
    return CenteringBehaviour;
});
