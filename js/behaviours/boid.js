define(['three', 'behaviours/weighted', 'behaviours/originrange', 'behaviours/alignment', 'behaviours/centering', 'behaviours/separation'], function(THREE, WeightedBehaviour, OriginRangeBehaviour, AlignmentBehaviour, CenteringBehaviour, SeparationBehaviour) {

    var behaviour = new WeightedBehaviour(
        [
            new OriginRangeBehaviour(200),
            new AlignmentBehaviour(),
            new CenteringBehaviour(),
            new SeparationBehaviour(120)
        ],
        [
            16,
            .5,
            .5,
            15
        ]
    );

    return behaviour;
});
