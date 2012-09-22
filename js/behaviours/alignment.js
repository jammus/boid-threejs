define(['three'], function(THREE) {
    
    var AlignmentBehaviour = function() {
        var that = this;
        that.calculate = function(boid, population) {
            population = population || [ ];
            var acceleration = new THREE.Vector3(0, 0, 0);
            for (var i = 0; i < population.length; i++) {
                acceleration.addSelf(population[i].velocity());
            }
            acceleration.divideScalar(population.length);
            return {
                acceleration: acceleration
            }
        };
    };
    
    return AlignmentBehaviour;

});
