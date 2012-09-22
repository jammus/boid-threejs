define(['three', 'boid', 'behaviours/originrange'], function(THREE, Boid, OriginRangeBehaviour) {

    describe('OriginRangeBehaviour', function() {

        describe('Default behaviour', function() {
            var behaviour;

            beforeEach(function() {
                behaviour = new OriginRangeBehaviour(10);
            });

            describe('When within max distance from origin', function() {

                it('will have no effect', function() {
                    var boid = new Boid(
                        new THREE.Vector3(1, 1, 1)
                    );
                    var result = behaviour.calculate(boid);
                    expect(result.acceleration).toEqual(new THREE.Vector3(0, 0, 0));
                });

            });

            describe('When outside of max distance from origin', function() {

                it('will accelerate towards the origin', function() {
                    var boid = new Boid(
                        new THREE.Vector3(10, 5, 10)
                    );

                    var expectedAcceleration = new THREE.Vector3(-10, -5, -10).normalize();

                    var result = behaviour.calculate(boid);
                    expect(result.acceleration).toEqual(expectedAcceleration);
                });

            });

        });

        describe('Optional dampening', function() {
            it('will be applied to the acceleration', function() {
                var dampening = new THREE.Vector3(0.1, 10, 2);
                var behaviour = new OriginRangeBehaviour(10, dampening);
                var boid = new Boid(
                    new THREE.Vector3(10, 5, 10)
                );

                var expectedAcceleration = new THREE.Vector3(-10, -5, -10).normalize().multiplySelf(dampening);

                var result = behaviour.calculate(boid);
                expect(result.acceleration).toEqual(expectedAcceleration);
            });
        });

    });

});
