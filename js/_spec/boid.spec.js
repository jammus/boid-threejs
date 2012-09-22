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
    });
});
