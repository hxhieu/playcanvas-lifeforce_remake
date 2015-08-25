pc.script.create('PlayerController', function (app) {

    'use strict';

    // Creates a new PlayerController instance
    var PlayerController = function (entity) {
        this.entity = entity;
        //this.pos = new pc.Vec3();
        //this.nextPos = new pc.Vec3();

        // Disabling the app menu stops the browser displaying a menu when
        // you right-click the page
        app.mouse.disableContextMenu();

        // Use the on() method to attach event handlers.
        // The mouse object supports events on move, button down and
        // up, and scroll wheel.
        app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);

        //app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
    };

    PlayerController.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.mainCamera = app.root.findByName("Camera").camera;
            this.cameraHeight = this.mainCamera.entity.getPosition().y;
        },

        onMouseMove: function (event) {
            //On mouse move, cast mouse pos to world pos and cache it for lerp
            this.mainCamera.screenToWorld(event.x, event.y, this.cameraHeight, this.entity.script.moveToward.nextPos);
        }
    };

    return PlayerController;
});