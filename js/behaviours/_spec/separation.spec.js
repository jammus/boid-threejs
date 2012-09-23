define(['three', 'boid', 'behaviours/separation'], function(THREE, Boid, SeparationBehaviour) {
    describe('SeparationBehaviour', function() {
        var behaviour, boid;

        beforeEach(function() {
            behaviour = new SeparationBehaviour(5);
            boid = new Boid(
                new THREE.Vector3(0, 0, 0)
            );
        });

        describe('Two boids further apart than min distance', function() {
            it('will have no effect', function() {
                var other_boid = new Boid(
                    new THREE.Vector3(-10, -10, -10)
                );
                var result = behaviour.calculate(boid, [ other_boid ]);
                expect(result.acceleration).toEqual(new THREE.Vector3(0, 0, 0));
            });
        });

        describe('Two boid closer than min distance', function() {
            it('will move apart', function() {
                var other_boid = new Boid(
                    new THREE.Vector3(1, 0, 0)
                );
                var result = behaviour.calculate(boid, [ other_boid ]);

                expect(result.acceleration).toEqual(
                    new THREE.Vector3(-1, 0, 0).normalize()
                );
            });

            it('will move apart faster when closer', function() {
                var other_boid = new Boid(
                    new THREE.Vector3(0.5, 0.5, 0.5)
                );
                var result = behaviour.calculate(boid, [ other_boid ]);
                expect(result.acceleration).toEqual(
                   new THREE.Vector3(-.5, -.5, -.5)
                            .normalize()
                            .multiplyScalar(boid.position().distanceTo(other_boid.position()))
                );
            });
        });

        describe('A larger population', function() {
            it('will move away from all by using the mean', function() {
                var other_boids = [
                    new Boid(
                        new THREE.Vector3(0.5, 0.5, 0.5)
                    ),
                    new Boid(
                        new THREE.Vector3(2.5, 0.5, -0.5)
                    ),
                    new Boid(
                        new THREE.Vector3(-0.5, -0.9, 0.5)
                    )
                ];
                var result = behaviour.calculate(boid, other_boids);
                expect(result.acceleration).toEqual(
                    new THREE.Vector3(
                        -0.8333333333333334,
                        -0.033333333333333326,
                        -0.16666666666666666
                    )
                );
            });
        });
    });

});
