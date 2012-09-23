define(['three', 'underscore'], function(THREE, _) {

    var Population = function(population) {
        var that = this;
        population = population || [ ];

        that.getNearestNeighbours = function(position, limit) {
            position = position || new THREE.Vector3(0, 0, 0);
            var sorted = _(population).sortBy(function(boid) {
                return position.distanceTo(boid.position());
            });
            return _(sorted).first(limit);
        };
    };

    return Population;

});
