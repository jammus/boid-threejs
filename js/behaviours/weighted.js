define(['three'], function(THREE) {

    var WeightedBehaviour = function(behaviours, weights) {
        var that = this;
        weights = weights || [ ];

        that.calculate = function(boid, population) {
            var acceleration = new THREE.Vector3(0, 0, 0);
            var result;
            for (var i = 0; i < behaviours.length; i++) {
                result = behaviours[i].calculate(boid, population);
                if (result && result.acceleration) {
                    if (weights[i]) {
                        result.acceleration.multiplyScalar(weights[i]);
                    }
                    acceleration.addSelf(result.acceleration);
                }
            }
            return {
                acceleration: acceleration
            };
        };
    };

    return WeightedBehaviour;

});
