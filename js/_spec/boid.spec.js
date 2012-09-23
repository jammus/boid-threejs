define(['three', 'boid', 'population'], function(THREE, Boid, Population) {
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
                boids,
                behaviour,
                population,
                originalSettings,
                origin;

            beforeEach(function() {
                behaviour = {
                    calculate: function() {
                        return { acceleration: new THREE.Vector3(0.003, 0.005, 0.001) };
                    }
                };
                originalSettings = {
                    acceleration: Boid.prototype.MAX_ACCELERATION.clone(),
                    velocity: Boid.prototype.MAX_VELOCITY.clone()
                };
                origin = new THREE.Vector3(0, 0, 0);
                boids = [
                    new Boid(origin, new THREE.Vector3(0, 0.5, 0.1)),
                    new Boid(origin, new THREE.Vector3(10, 5, 0)),
                    new Boid(origin, new THREE.Vector3(-1, -0.5, 1)),
                    new Boid(origin, new THREE.Vector3(3, 0, 1)),
                    new Boid(origin, new THREE.Vector3(7, 9, 4.2)),
                    new Boid(origin, new THREE.Vector3(-4, 5, -2.1))
                ];
                population = new Population(boids);
                boid = new Boid(
                    new THREE.Vector3(0, 0, 0),
                    new THREE.Vector3(0, 0, 0),
                    behaviour,
                    population
                );
            });

            afterEach(function() {
                Boid.prototype.MAX_VELOCITY = originalSettings.velocity;
                Boid.prototype.MAX_ACCELERATION = originalSettings.acceleration;
            });
                
            it('will pass itself and the five closest boids to the behaviour', function() {
                var nearestBoids = [
                    boids[0],
                    boids[1],
                    boids[2],
                    boids[3],
                    boids[4]
                ];
                spyOn(behaviour, 'calculate');
                spyOn(population, 'getNearestNeighbours').andCallFake(function(position, limit) {
                    return nearestBoids;
                });
                boid.update();
                expect(population.getNearestNeighbours).toHaveBeenCalledWith(boid.position(), 5);
                expect(behaviour.calculate).toHaveBeenCalledWith(boid, nearestBoids);
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

            it('can have maximum acceleration configure', function() {
                behaviour.calculate = function() {
                    return { acceleration: new THREE.Vector3(1, -1, 0.3) };
                };
                Boid.prototype.MAX_ACCELERATION = new THREE.Vector3(0.5, 0.9, 0.4);
                boid.update();
                expect(boid.velocity()).toEqual(new THREE.Vector3(0.5, -0.9, 0.3));
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

            it('can have maximum velocity configured', function() {
                behaviour.calculate = function() {
                    return { acceleration: new THREE.Vector3(5, -10, 0.5) };
                };
                Boid.prototype.MAX_VELOCITY = new THREE.Vector3(3, 3, 3);
                for (var i = 0; i < 1000; i++) {
                    boid.update();
                }
                expect(boid.velocity()).toEqual(new THREE.Vector3(3, -3, 3));
            });
        });
    });
});
