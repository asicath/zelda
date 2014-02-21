var Sword = function() {
    var my = Entity();

    my.sprites = Sprites.sword;
    my.palette = Palettes.MonsterBlue;

    // will get updated by player
    my.rect = new Rect(0, 0, 0, 0);

    return my;
};