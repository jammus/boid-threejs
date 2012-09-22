define(['three', 'boid'], function(THREE, Boid) {
    describe('Boids', function() {
        describe('A new boid', function() {
            var boid,
                initialPosition,
                initialVelocity;

            beforeEach(function() {
                initialPosition = new THREE.Vector3(0, 0, 0);
                initialVelocity = new THREE.Vector3(1, 1, 1);

                boid = new Boid(initialPosition, initialVelocity);
            });

            it('has its position specified at construction', function() {
                expect(boid.position()).toEqual(initialPosition);
            });

            it('has its velocity specified at construction', function() {
                expect(boid.velocity()).toEqual(initialVelocity);
            });

            describe('after one update', function() {
                it('has its moved one unit', function() {
                    boid.update();
                    var expectedPosition = new THREE.Vector3(1, 1, 1);
                    expect(boid.position()).toEqual(expectedPosition);
                });
            });
        });

        describe('A boid with behaviour on update', function() {
            var boid,
                behaviour,
                population;

            beforeEach(function() {
                behaviour = {
                    calculate: function() {
                        return { acceleration: new THREE.Vector3(0.003, 0.005, 0.001) };
                    }
                };
                population = [
                    new Boid(null, null)
                ];
                boid = new Boid(
                    new THREE.Vector3(0, 0, 0),
                    new THREE.Vector3(0, 0, 0),
                    behaviour,
                    population
                );
            });
                
            it('will pass itself and its population to the behaviour', function() {
                spyOn(behaviour, 'calculate');
                boid.update();
                expect(behaviour.calculate).toHaveBeenCalledWith(boid, population);
            });

            it('will apply acceleration result to velocity', function() {
                boid.update();
                expect(boid.velocity()).toEqual(new THREE.Vector3(0.003, 0.005, 0.001));
            });

            it('will not exceed maximum acceleration (0.05, 0.02, 0.05)', function() {
                behaviour.calculate = function() {
                    return { acceleration: new THREE.Vector3(1, -1, 0.3) };
                };
                boid.update();
                expect(boid.velocity()).toEqual(new THREE.Vector3(0.05, -0.02, 0.05));
            });

            it('will not exceed maximum velocity (1, 1, 1)', function() {
                behaviour.calculate = function() {
                    return { acceleration: new THREE.Vector3(5, -10, 0.5) };
                };
                for (var i = 0; i < 1000; i++) {
                    boid.update();
                }
                expect(boid.velocity()).toEqual(new THREE.Vector3(1, -1, 1));
            });
        });
    });
});
