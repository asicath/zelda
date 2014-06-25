var ItemDropper = function(entity) {



    entity.dropItem = function(room, itemClass) {
        var table = ItemDropper.dropGroups[itemClass];

        if (Math.random() > table.chance) return;


        var type = table.items[Math.floor(Math.random() * table.items.length)];
        var item = type();
        item.position.x = entity.position.x;
        item.position.y = entity.position.y;
        room.addEntity(item);

    };

};


ItemDropper.dropGroups = {
    a:{
        chance: 1/2,
        items:[
            Rupee,
            Rupee,
            RupeeBlue,
            Rupee,
            Heart,
            Rupee,
            Rupee,
            Rupee,
            Rupee,
            Heart
        ]
    },
    b:{
        chance: 13/20,
        items:[
            RupeeBlue,
            Rupee,
            Bomb,
            Rupee,
            RupeeBlue,
            Rupee,
            Heart,
            StopTimer,
            Bomb,
            Rupee
        ]
    },
    c:{
        chance: 4/5,
        items:[
            Heart,
            Rupee,
            Fairy,
            Rupee,
            Rupee,
            Heart,
            Rupee,
            StopTimer,
            Rupee,
            Heart
        ]
    }
};

/*

 var chance = 1/3;

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
*/