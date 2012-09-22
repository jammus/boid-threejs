define([], function() {

    var ORIGIN = new THREE.Vector3(0, 0, 0),
        MAX_VELOCITY = new THREE.Vector3(1, 1, 1),
        TURNING_MODIFIER = new THREE.Vector3(1, 1, 1);

    var Boid = function(position, velocity, range, population) {
        var that = this;

        population = population || [];

        that.position = function() {
            return position;
        };

        that.velocity = function() {
            return velocity;
        };

        that.update = function() {
            var acceleration = new THREE.Vector3(0, 0, 0);
            var midPoint = calcMidPoint();
            acceleration.addSelf(accelerateTowards(midPoint));

            var matchingVelocity = calcPopulationVelocity();
            acceleration.addSelf(matchingVelocity);

            var distanceFromOrigin = position.length();
            if (distanceFromOrigin > range) {
                acceleration.addSelf(accelerateTowards(ORIGIN));
            }
            applyAcceleration(acceleration);
            position.addSelf(velocity);
        };

        function calcMidPoint() {
            var midPoint = new THREE.Vector3(0, 0, 0);
            for (var i = 0; i < population.length; i++) {
                midPoint.addSelf(population[i].position());
            }
            midPoint.divideScalar(population.length);
            return midPoint;
        }

        function calcPopulationVelocity() {
            var populationVelocity = new THREE.Vector3(0, 0, 0);
            for (var i = 0; i < population.length; i++) {
                populationVelocity.addSelf(population[i].velocity());
            }
            populationVelocity.divideScalar(population.length);
            return populationVelocity.normalize();
        }

        function accelerateTowards(targetPosition) {
            var targetDirection = targetPosition.clone().subSelf(position);
            var acceleration = targetDirection.clone();
            acceleration.normalize();
            acceleration.multiplySelf(TURNING_MODIFIER);
            return acceleration;
        }

        function applyAcceleration(acceleration) {
            velocity.addSelf(acceleration);
            velocity.x = Math.max(velocity.x, -MAX_VELOCITY.x);
            velocity.y = Math.max(velocity.y, -MAX_VELOCITY.y);
            velocity.z = Math.max(velocity.z, -MAX_VELOCITY.z);
            velocity.x = Math.min(velocity.x, MAX_VELOCITY.x);
            velocity.y = Math.min(velocity.y, MAX_VELOCITY.y);
            velocity.z = Math.min(velocity.z, MAX_VELOCITY.z);
        }
    };


    return Boid;

});
