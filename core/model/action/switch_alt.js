define(['./action', 'core/model/directives'], function(Action, Directives) {

    return function (actor) {
        var my = Action(actor);

        var index = 0;

        my.onActivate = function () {
            if (actor.altActions.length == 0) return;
            index = (index + 1) % actor.altActions.length;
            actor.setAltAction(actor.altActions[index]);

            Directives.nextMessage(7);
        };

        return my;
    };

});