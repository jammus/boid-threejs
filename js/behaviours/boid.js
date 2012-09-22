define(['three', 'behaviours/weighted', 'behaviours/originrange', 'behaviours/alignment', 'behaviours/centering'], function(THREE, WeightedBehaviour, OriginRangeBehaviour, AlignmentBehaviour, CenteringBehaviour) {

    var behaviour = new WeightedBehaviour(
        [
            new OriginRangeBehaviour(200),
            new AlignmentBehaviour(),
            new CenteringBehaviour()
        ],
        [
            .9,
            .6,
            .05
        ]
    );

    return behaviour;
});
