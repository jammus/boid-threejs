define(['three'], function(THREE) {

    var MAX_VELOCITY = new THREE.Vector3(1, 1, 1);

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
