define(['three', 'boid', 'behaviours/centering'], function(THREE, Boid, CenteringBehaviour) {

    describe('CenteringBehaviour', function() {

        describe('Default behaviour', function() {
            var behaviour, boid;

            beforeEach(function() {
                behaviour = new CenteringBehaviour();
                boid = new Boid(
                    new THREE.Vector3(0, 0, 0)
                );
            });

            describe('An empty population', function() {
                it('will produce no effect', function() {
                    var result = behaviour.calculate(boid);
                    expect(result.acceleration).toEqual(new THREE.Vector3(0, 0, 0));
                });
            });

            describe('An single member population', function() {
                it('will accelerate towards the other boid', function() {
                    var other_boid = new Boid(
                        new THREE.Vector3(3, 3, 3)
                    );

                    var expectedAcceleration = new THREE.Vector3(3, 3, 3).normalize();
                    var result = behaviour.calculate(boid, [other_boid]);
                    expect(result.acceleration).toEqual(expectedAcceleration);
                });
            });

            describe('A multi member population', function() {
                it('will accelerate towards the mid point of the population', function() {
                    var other_boids = [
                        new Boid(
                            new THREE.Vector3(3, 0, 0)
                        ),
                        new Boid(
                            new THREE.Vector3(3, 0, 3)
                        ),
                        new Boid(
                            new THREE.Vector3(0, 3, 6)
                        )
                    ];

                    var expectedAcceleration = new THREE.Vector3(2, 1, 3).normalize();
                    var result = behaviour.calculate(boid, other_boids);
                    expect(result.acceleration).toEqual(expectedAcceleration);
                });
            });

        });

        describe('Behaviour with optional dampening supplied', function() {
            it('will apply to multiply acceleration by dampening', function() {
                var dampening = new THREE.Vector3(0.5, 0.1, 0.3);
                var behaviour = new CenteringBehaviour(dampening);
                var boid = new Boid(
                    new THREE.Vector3(0, 0, 0)
                );
                var other_boid = new Boid(
                    new THREE.Vector3(3, 3, 3)
                );
                var expectedAcceleration = new THREE.Vector3(3, 3, 3).normalize().multiplySelf(dampening);
                var result = behaviour.calculate(boid, [other_boid]);
                expect(result.acceleration).toEqual(expectedAcceleration);
            });
        });

    });

});
