define(['three', 'boid', 'behaviours/alignment'], function(THREE, Boid, AlignmentBehaviour) {

    describe('AlignmentBehaviour', function() {

        describe('Default behaviour', function() {
            
            describe('An empty population', function() {
                
                it('will have no effect', function() {
                    var behaviour = new AlignmentBehaviour();
                    var boid = new Boid(
                        new THREE.Vector3(1, 1, 1),
                        new THREE.Vector3(2, 2, 2)
                    );
                    var result = behaviour.calculate(boid);
                    expect(result.acceleration).toEqual(new THREE.Vector3(0, 0, 0));
                });

            });

            describe('A single item population', function() {

                it('will move to matching velocity with other boid', function() {
                    var behaviour = new AlignmentBehaviour();
                    var boid = new Boid(
                        new THREE.Vector3(0, 0, 0),
                        new THREE.Vector3(1, 1, 1)
                    );
                    var other_boid = new Boid(
                        new THREE.Vector3(0, 0, 0),
                        new THREE.Vector3(2, 2, 2)
                    );
                    var result = behaviour.calculate(boid, [other_boid]);
                    expect(result.acceleration).toEqual(
                        new THREE.Vector3(2, 2, 2)
                    );
                });
            });

            describe('A multiple item population', function() {

                it('will move to match average velocity of other boids', function() {
                    var behaviour = new AlignmentBehaviour();
                    var boid = new Boid(
                        new THREE.Vector3(0, 0, 0),
                        new THREE.Vector3(1, 1, 1)
                    );
                    var other_boids = [
                        new Boid(
                            new THREE.Vector3(0, 0, 0),
                            new THREE.Vector3(1, 2, 2)
                        ),
                        new Boid(
                            new THREE.Vector3(0, 0, 0),
                            new THREE.Vector3(5, 5, 5)
                        ),
                        new Boid(
                            new THREE.Vector3(0, 0, 0),
                            new THREE.Vector3(0, -2, 12)
                        )
                    ];
                    var result = behaviour.calculate(boid, other_boids);
                    expect(result.acceleration).toEqual(
                        new THREE.Vector3(2, (5/3), (19/3))
                    );
                });
            });
        });

    });

});
