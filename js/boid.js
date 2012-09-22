define(['three'], function(THREE) {

    var MAX_VELOCITY = new THREE.Vector3(1, 1, 1),
        MAX_ACCELERATION = new THREE.Vector3(0.05, 0.02, 0.05);

    var Boid = function(position, velocity, behaviour, population) {
        var that = this;

        population = population || [];

        that.position = function() {
            return position;
        };

        that.velocity = function() {
            return velocity;
        };

        that.update = function() {
            if (behaviour) {
                var result = behaviour.calculate(that, population);
                if (result && result.acceleration) {
                    applyAcceleration(result.acceleration);
                }
            }
            position.addSelf(velocity);
        };

        function applyAcceleration(acceleration) {
            max(acceleration, MAX_ACCELERATION);
            velocity.addSelf(acceleration);
            max(velocity, MAX_VELOCITY);
        }

        function max(v1, v2) {
            v1.x = Math.max(v1.x, -v2.x);
            v1.y = Math.max(v1.y, -v2.y);
            v1.z = Math.max(v1.z, -v2.z);
            v1.x = Math.min(v1.x, v2.x);
            v1.y = Math.min(v1.y, v2.y);
            v1.z = Math.min(v1.z, v2.z);
        }
    };


    return Boid;

});
