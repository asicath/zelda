var SwitchAlt = function(actor) {
    var my = Action(actor);

    var index = 0;

    my.onActivate = function(room) {
        if (actor.altActions.length == 0) return;
        index = (index + 1) % actor.altActions.length;
        actor.setAltAction(actor.altActions[index]);
    };

    return my;
};
