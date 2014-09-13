define(['./action'], function(Action) {

    return function (actor) {
        var my = Action(actor);

        var index = 0;

        my.onActivate = function () {
            if (actor.altActions.length == 0) return;
            index = (index + 1) % actor.altActions.length;
            actor.setAltAction(actor.altActions[index]);

            if (Directives) Directives.nextMessage(7);
        };

        return my;
    };

});