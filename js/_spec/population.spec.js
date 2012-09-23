define(['three', 'boid', 'population'], function(THREE, Boid, Population) {

    describe('Population', function() {

        describe('A new population', function() {

            it('nearest neighbours is empty array', function() {
                var population = new Population();
                var neighbours = population.getNearestNeighbours(undefined, 3);
                expect(neighbours).toEqual([ ]);
            });

        });

        describe('A population of 5 boids', function() {
            var boids, population;

            beforeEach(function() {
                boids = [ 
                    new Boid(new THREE.Vector3(0, 0, 0)),
                    new Boid(new THREE.Vector3(-1, -1, -1)),
                    new Boid(new THREE.Vector3(1, 5, 0)),
                    new Boid(new THREE.Vector3(4, -10, 10)),
                    new Boid(new THREE.Vector3(0, -0.5, 7))
                ];
                population = new Population(boids);
            });

            it('returns five boids when 5 neighbours are requested', function() {
                var neighbours = population.getNearestNeighbours(undefined, 5);
                expect(neighbours.length).toBe(5);
            });

            it('returns all boids ordered by distance when 5 are requested', function() {
                var position = new THREE.Vector3(0, 0, 0);
                var neighbours = population.getNearestNeighbours(position, 5);
                var lastDistance = 0, distance;
                for (var i = 0; i < neighbours.length; i++) {
                    distance = position.distanceTo(neighbours[i].position());
                    expect(distance).not.toBeLessThan(lastDistance);
                    lastDistance = distance;
                }
            });

            it('limits to three nearest when only three requested', function() {
                var position = new THREE.Vector3(0, 0, 0);
                var neighbours = population.getNearestNeighbours(position, 3);
                expect(neighbours.length).toBe(3);
            });
        });

    });

});
