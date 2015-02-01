define(['../rect', '../position', '../frame_event_haver'], function(Rect, Position, FrameEventHaver) {

    return function () {

        var my = {
            room: null
        };

        var frameEventQueues = {
            pre:[],
            find:[],
            post:[]
        };

        FrameEventHaver(my);

        my.position = new Position(0, 0);

        my.footPrints = {};
        my.footPrints.default = new Rect(my.position, 0, 0, 0, 0);

        my.icon = null;


        // called after draw, before any entities have examined intersections
        // setup for intersections, move intents, etc.
        my.executeFramePre = function() {

            // put this for here now...
            my.processEventQueue();

            executeFrameEventQueue(frameEventQueues.pre);
        };

        // allows entities to find intersections all at the same time without reacting
        my.executeFrameFind = function() {
            executeFrameEventQueue(frameEventQueues.find);
        };

        // called after all entities have found intersections
        // for reacting to the intersections (or lack thereof)
        my.executeFramePost = function() {
            executeFrameEventQueue(frameEventQueues.post);
        };

        var executeFrameEventQueue = function(queue) {
            // process the event queues
            var i;
            for (i = 0; i < queue.length; i++) {
                queue[i]();
            }
        };

        // allows items to be added to the queues
        my.addFrameItem = function(queueName, item) {
            frameEventQueues[queueName].push(item);
        };



        my.onAddToRoom = function() {};

        my.getFootPrint = function (type) {
            if (!type || !my.footPrints[type]) {
                return my.footPrints.default;
            }
            return my.footPrints[type];
        };

        my.drawEntity = function (ctx) {
            // todo allow for multiple icons per entity
            if (!my.icon) return;
            my.icon.drawIcon(ctx);
        };


        var freezeCount = 0;
        my.freeze = function () {
            freezeCount++;
        };
        my.unfreeze = function () {
            freezeCount--;
        };
        my.isFrozen = function () {
            return freezeCount > 0;
        };



        my.intersects = function (entity) {
            var theirs = entity.getFootPrint();
            var mine = my.getFootPrint();

            // check for intersection
            return mine.intersects(theirs);
        };




        return my;
    };

});
