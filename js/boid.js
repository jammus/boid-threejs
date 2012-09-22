define([], function() {

    var ORIGIN = new THREE.Vector3(0, 0, 0),
        MAX_VELOCITY = new THREE.Vector3(1, 1, 1),
        TURNING_MODIFIER = new THREE.Vector3(1, 1, 1);

    var Boid = function(position, velocity, range, other_boids) {
        var that = this;

        other_boids = other_boids || [];

        that.position = function() {
            return position;
        };

        that.velocity = function() {
            return velocity;
        };

        that.update = function() {
            if (other_boids.length) {
                var midPoint = new THREE.Vector3(0, 0, 0);
                for (var i = 0; i < other_boids.length; i++) {
                    midPoint.addSelf(other_boids[i].position());
                }
                midPoint.divideScalar(other_boids.length);
                turnTowards(midPoint);
            }
            var distanceFromOrigin = position.length();
            if (distanceFromOrigin > range) {
                turnTowards(ORIGIN);
            }
            position.addSelf(velocity);
        };

        function turnTowards(targetPosition) {
            var targetDirection = targetPosition.clone().subSelf(position);
            var acceleration = targetDirection.clone();
            acceleration.normalize();
            acceleration.multiplySelf(TURNING_MODIFIER);
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
