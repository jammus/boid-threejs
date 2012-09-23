define(['three'], function(THREE) {

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
                var targetPopulation = population.getNearestNeighbours(position, 5);
                var result = behaviour.calculate(that, targetPopulation);
                if (result && result.acceleration) {
                    accelerate(result.acceleration);
                }
            }
            move();
        };

        function move() {
            max(velocity, that.MAX_VELOCITY);
            position.addSelf(velocity);
        }

        function accelerate(acceleration) {
            max(acceleration, that.MAX_ACCELERATION);
            velocity.addSelf(acceleration);
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


    Boid.prototype.MAX_VELOCITY = new THREE.Vector3(1, 1, 1);
    Boid.prototype.MAX_ACCELERATION = new THREE.Vector3(0.05, 0.02, 0.05);


    return Boid;

});
