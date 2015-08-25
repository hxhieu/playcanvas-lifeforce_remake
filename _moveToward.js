'use strict';

pc.script.attribute('nextPos', 'vector', [0, 0, 0]);
pc.script.attribute('agility', 'number', 10, {
    min: 10,
    max: 100,
    step: 1
});
// pc.script.attribute('forward', 'enumeration', 0, {
//     enumerations:
//     [
//         {
//             name: "up",
//             value: 0
//         },
//         {
//             name: "down",
//             value: 1
//         }
//     ]
// });
pc.script.attribute('rollDegree', 'number', 45, {
    min: 0,
    max: 90,
    step: 1
});

pc.script.create('moveToward', function (app) {
    // Creates a new MoveToward instance
    var MoveToward = function (entity) {
        this.entity = entity;
        this.pos = new pc.Vec3();

        this.getMoveDir = function () {
            return this.nextPos.clone().sub(this.pos);
        };

        this.updatePosition = function (dir, dt) {

            var mag = dir.length();

            //Delta distance per update
            var maxDistanceDelta = dt * this.agility;

            //Reached
            if (mag <= maxDistanceDelta || mag === 0) return;

            //Move toward
            this.pos = this.pos.add(dir.scale(1 / mag).scale(maxDistanceDelta));
            this.entity.setPosition(this.pos);
        };

        this.updateRoll = function (dir, dt) {
            if (dir.x < 0) {
                this.entity.setEulerAngles(0, 0, this.rollDegree);
            } else if (dir.x > 0) {
                this.entity.setEulerAngles(0, 0, -this.rollDegree);
            } else {
                this.entity.setEulerAngles(0, 0, 0);
            }
        };
    };

    MoveToward.prototype = {
        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            var dir = this.getMoveDir();
            this.updatePosition(dir, dt);
            this.updateRoll(dir, dt);
        }
    };

    return MoveToward;
});