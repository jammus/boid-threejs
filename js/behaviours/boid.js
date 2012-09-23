define(['three', 'behaviours/weighted', 'behaviours/originrange', 'behaviours/alignment', 'behaviours/centering', 'behaviours/separation'], function(THREE, WeightedBehaviour, OriginRangeBehaviour, AlignmentBehaviour, CenteringBehaviour, SeparationBehaviour) {

    var behaviour = new WeightedBehaviour(
        [
            new OriginRangeBehaviour(350),
            new AlignmentBehaviour(),
            new CenteringBehaviour(),
            new SeparationBehaviour(20)
        ],
        [
            40,
            20.5,
            9,
            2
        ]
    );

    return behaviour;
});
