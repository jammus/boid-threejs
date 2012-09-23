define(['three', 'behaviours/weighted', 'behaviours/originrange', 'behaviours/alignment', 'behaviours/centering', 'behaviours/separation'], function(THREE, WeightedBehaviour, OriginRangeBehaviour, AlignmentBehaviour, CenteringBehaviour, SeparationBehaviour) {

    var behaviour = new WeightedBehaviour(
        [
            new OriginRangeBehaviour(200),
            new AlignmentBehaviour(),
            new CenteringBehaviour(),
            new SeparationBehaviour(30)
        ],
        [
            9,
            .8,
            .6,
            2
        ]
    );

    return behaviour;
});
