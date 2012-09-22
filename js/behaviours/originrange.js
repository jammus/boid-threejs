define(['three'], function(THREE) {

    var ORIGIN = new THREE.Vector3(0, 0, 0);

    var OriginRangeBehaviour = function(maxRange, dampening) {
        var that = this;

        that.calculate = function(boid) {
            var acceleration = ORIGIN.clone();
            if (boid.position().distanceTo(ORIGIN) > maxRange) {
                acceleration.subSelf(boid.position());
                acceleration.normalize();
            }
            if (dampening) {
                acceleration.multiplySelf(dampening);
            }
            return {
                acceleration: acceleration
            };
        };
    };

    return OriginRangeBehaviour;

});
