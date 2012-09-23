define(['three'], function(THREE) {

    var SeparationBehaviour = function(minimumDistance) {
        var that = this;

        that.calculate = function(boid, population) {
            population = population || [ ];

            var acceleration = new THREE.Vector3(0, 0, 0),
                distance;

            for (var i = 0; i < population.length; i++) {
                distance = boid.position().distanceTo(population[i].position()); 
                if (distance >= minimumDistance) {
                    continue;
                }
                var velocity = boid.position().clone();
                velocity.subSelf(population[i].position());
                velocity.normalize();
                velocity.divideScalar(distance);
                acceleration.addSelf(velocity);
            }
            acceleration.divideScalar(population.length);

            return {
                acceleration: acceleration
            }
        };
    };

    return SeparationBehaviour;

});
