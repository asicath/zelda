var Action = function(actor) {
    var my = {};

    my.activateIntent = false;

    my.executeAction = function(room) {
        if (my.activateIntent) {
            console.log("active");
        }
    };

    return my;
};
