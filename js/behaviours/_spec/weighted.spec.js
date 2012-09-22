define(['three', 'behaviours/weighted'], function(THREE, WeightedBehaviour) {
    var MockBehaviour = function(acceleration) {
        this.calculate = function() { return { acceleration: acceleration }; }
    };

    describe('WeightedBehaviour', function() {
        var mockBehaviour1,
            mockBehaviour2,
            mockBehaviour3;

        beforeEach(function() {
            mockBehaviour1 = new MockBehaviour(new THREE.Vector3(1, 2, 2));
            mockBehaviour2 = new MockBehaviour(new THREE.Vector3(4, 4, -3));
            mockBehaviour3 = new MockBehaviour(new THREE.Vector3(0, 9, 0));
        });

        it('passes the parameters to each behaviour', function() {
            var weighted = new WeightedBehaviour(
                [ mockBehaviour1, mockBehaviour2, mockBehaviour3 ]
            );
            spyOn(mockBehaviour1, 'calculate');
            spyOn(mockBehaviour2, 'calculate');
            spyOn(mockBehaviour3, 'calculate');
            weighted.calculate(1, 2);
            expect(mockBehaviour1.calculate).toHaveBeenCalledWith(1, 2);
            expect(mockBehaviour1.calculate).toHaveBeenCalledWith(1, 2);
            expect(mockBehaviour1.calculate).toHaveBeenCalledWith(1, 2);
        });

        it('returns the sum of the results', function() {
            var weighted = new WeightedBehaviour(
                [ mockBehaviour1, mockBehaviour2, mockBehaviour3 ]
            );
            var result = weighted.calculate();
            expect(result.acceleration).toEqual(
                new THREE.Vector3(5, 15, -1)
            );
        });

        it('returns weighted sum when supplied', function() {
            var weighted = new WeightedBehaviour(
                [ mockBehaviour1, mockBehaviour2, mockBehaviour3 ],
                [ 2.5, 0.5 ]
            );
            var result = weighted.calculate();
            expect(result.acceleration).toEqual(
                new THREE.Vector3(4.5, 16, 3.5)
            );
        });
    });
});
