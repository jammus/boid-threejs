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

        describe('A boid too far from the origin', function() {
            var origin,
                position,
                velocity,
                boid,
                maxRange;

            beforeEach(function() {
                origin = new THREE.Vector3(0, 0, 0);
                position = new THREE.Vector3(100, 100, 100);
                velocity = new THREE.Vector3(1, 1, 1);
                maxRange = 50;
                boid = new Boid(
                    position,
                    velocity,
                    maxRange
                );
            });

            it('will move back to within the max range', function() {
                var distance;
                for (var i = 0; i < 10000; i++) {
                    boid.update();
                    distance = boid.position().length();
                    if (distance < maxRange) {
                        break;
                    }
                }
                expect(distance).toBeLessThan(maxRange);
            });

            it('will not exceed maximum velocity +/-(1, 1, 1)', function() {
                var newVelocity;
                for (var i = 0; i < 100; i++) {
                    boid.update();

                    newVelocity = boid.velocity();

                    expect(Math.abs(newVelocity.x)).not.toBeGreaterThan(1);
                    expect(Math.abs(newVelocity.y)).not.toBeGreaterThan(1);
                    expect(Math.abs(newVelocity.z)).not.toBeGreaterThan(1);
                }
            });

        });

        describe('One boids a distance from another', function() {
            it('will move towards it', function() {
                var boid_one = new Boid(
                    new THREE.Vector3(3, 3, 3),
                    new THREE.Vector3(1, 1, 1)
                );
                var boid_two = new Boid(
                    new THREE.Vector3(-3, -3, -3),
                    new THREE.Vector3(0, 0, 0), 
                    50,
                    [boid_one]
                );
                var distance;
                for (var i = 0; i < 100000; i++) {
                    boid_two.update();
                    distance = boid_one.position().distanceTo(boid_two.position());
                    if (distance <= 0.2) {
                        break;
                    }
                }
                expect(distance).toBeLessThan(0.2);
            });
        });

        describe('One boid aware of two others', function() {
            it('will move to the middle point between the two boids', function() {
                var boid_one = new Boid(
                    new THREE.Vector3(5, 0, 0),
                    new THREE.Vector3(0, 0, 0)
                );
                var boid_two = new Boid(
                    new THREE.Vector3(-5, 0, 0),
                    new THREE.Vector3(0, 0, 0)
                );
                var boid_three = new Boid(
                    new THREE.Vector3(0, -10, -10),
                    new THREE.Vector3(0, -1, -1),
                    undefined,
                    [boid_one, boid_two]
                );
                var midPoint = new THREE.Vector3(0, 0, 0);

                var distance;
                for (var i = 0; i < 1000; i++) {
                    boid_three.update();

                    distance = boid_three.position().distanceTo(midPoint);
                    if (distance <= 0.002) {
                        break;
                    }
                }
                expect(distance).toBeLessThan(0.002);
            });
        });

        describe('A boid on a collision course', function() {
            it('will match the velocity of the other', function() {
                var boid_one = new Boid(
                    new THREE.Vector3(1, 0, 0),
                    new THREE.Vector3(-1, 0, 0)
                );
                var boid_two = new Boid(
                    new THREE.Vector3(-1, 0, 0),
                    new THREE.Vector3(1, 0, 0),
                    undefined,
                    [boid_one]
                );
                var velocity;
                for (var i = 0; i < 1000; i++) {
                    boid_two.update();
                }
                console.log(boid_two.velocity());
                expect(boid_one.velocity()).toEqual(boid_two.velocity());
            });
        });

    });
});
