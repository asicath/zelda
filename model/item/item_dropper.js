var ItemDropper = function(entity) {

    var chance = 1/3;

    entity.dropItem = function(room, itemClass) {

        if (Math.random() > chance) return;

        var table = ItemDropper.DropTables[itemClass];
        var type = table[Math.floor(Math.random() * table.length)];
        var item = type();
        item.rect.x = entity.rect.x;
        item.rect.y = entity.rect.y;
        room.addEntity(item);

    };

};

ItemDropper.DropTables = [
    [
        Rupee,
        Heart,
        Rupee,
        Fairy,
        Rupee,
        Heart,
        Heart,
        Rupee,
        Rupee,
        Heart
    ],
    [
        Bomb,
        Rupee,
        StopTimer,
        Rupee,
        Heart,
        Bomb,
        Rupee,
        Bomb,
        Heart,
        Heart
    ],
    [
        Rupee,
        Heart,
        Rupee,
        RupeeBlue,
        Heart,
        StopTimer,
        Rupee,
        Rupee,
        Rupee,
        RupeeBlue
    ],
    [
        Heart,
        Fairy,
        Rupee,
        Heart,
        Fairy,
        Heart,
        Heart,
        Heart,
        Rupee,
        Heart
    ]



];