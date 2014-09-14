
/*
The NES could select 4 palettes each containing one of these colors to be applied to the background.
(however, color 0 of each palette has to be the same, so technically, 13 different colors are available at a time)

A background palette is applied to a 16x16 pixel area,
however through a special video mode of the MMC5 mapper it is possible for every 8x8 pixel tile to have its individual palette.

As for sprites, 4 different palettes can be used at a time (with color 0 being transparent in each)
and every 8x8 or 8x16 pixels can have their own palette, allowing for a total of 12 different colors to use for sprites at any given time.
*/

// http://en.wikipedia.org/wiki/List_of_video_game_console_palettes#Famicom.2FNES

define(function() {
    return {

        /*
         747474
         24188c
         0000a8
         44009c
         8c0074

         a80010
         a40000
         7c0800
         402c00
         004400

         005000
         003c14
         183c5c
         000000
         */

        h00: [0x74, 0x74, 0x74],
        h01: [0x24, 0x18, 0x8c],
        h02: [0x00, 0x00, 0xa8],
        h03: [0x44, 0x00, 0x9c],
        h04: [0x8c, 0x00, 0x74],
        h05: [0xa8, 0x00, 0x10],
        h06: [0xa4, 0x00, 0x00],
        h07: [0x7c, 0x08, 0x00],
        h08: [0x40, 0x2c, 0x00],
        h09: [0x00, 0x44, 0x00],
        h0A: [0x00, 0x50, 0x00],
        h0B: [0x00, 0x3c, 0x14],
        h0C: [0x18, 0x3c, 0x5c],
        h0D: [0x00, 0x00, 0x00],
        h0E: [0, 0, 0],
        h0F: [0, 0, 0],

        /*
         bcbcbc
         0070ec
         2038ec
         8000f0
         bc00bc

         e40058
         d82800
         c84c0c
         887000
         009400

         00a800
         009038
         008088
         080808
         */

        h10: [0xbc, 0xbc, 0xbc],
        h11: [0x00, 0x70, 0xec],
        h12: [0x20, 0x38, 0xec],
        h13: [0x80, 0x00, 0xf0],
        h14: [0xbc, 0x00, 0xbc],
        h15: [0xe4, 0x00, 0x58],
        h16: [0xd8, 0x28, 0x00],
        h17: [0xc8, 0x4c, 0x0c],
        h18: [0x88, 0x70, 0x00],
        h19: [0x00, 0x94, 0x00],
        h1A: [0x00, 0xa8, 0x00],
        h1B: [0x00, 0x90, 0x38],
        h1C: [0x00, 0x80, 0x88],
        h1D: [0x08, 0x08, 0x08],
        h1E: [0, 0, 0],
        h1F: [0, 0, 0],

        /*
         fcfcfc
         3cbcfc
         5c94fc
         cc88fc
         f478fc

         fc74b4
         fc7460
         fc9838
         f0bc3c
         80d010

         4cdc48
         58f898
         00e8d8
         787878
         */

        h20: [0xfc, 0xfc, 0xfc],
        h21: [0x3c, 0xbc, 0xfc],
        h22: [0x5c, 0x94, 0xfc],
        h23: [0xcc, 0x88, 0xfc],
        h24: [0xf4, 0x78, 0xfc],
        h25: [0xfc, 0x74, 0xb4],
        h26: [0xfc, 0x74, 0x60],
        h27: [0xfc, 0x98, 0x38],
        h28: [0xf0, 0xbc, 0x3c],
        h29: [0x80, 0xd0, 0x10],
        h2A: [0x4c, 0xdc, 0x48],
        h2B: [0x58, 0xf8, 0x98],
        h2C: [0x00, 0xe8, 0xd8],
        h2D: [0x78, 0x78, 0x78],
        h2E: [0, 0, 0],
        h2F: [0, 0, 0],


        /*
         fcfcfc
         a8e4fc
         c4d4fc
         d4c8fc
         fcc4fc

         fcc4d8
         fcbcb0
         fcd8a8
         fce4a0
         e0fca0

         a8f0bc
         b0fccc
         9cfcf0
         c4c4c4
         */

        h30: [0xfc, 0xfc, 0xfc],
        h31: [0xa8, 0xe4, 0xfc],
        h32: [0xc4, 0xd4, 0xfc],
        h33: [0xd4, 0xc8, 0xfc],
        h34: [0xfc, 0xc4, 0xfc],
        h35: [0xfc, 0xc4, 0xd8],
        h36: [0xfc, 0xbc, 0xb0],
        h37: [0xfc, 0xd8, 0xa8],
        h38: [0xfc, 0xe4, 0xa0],
        h39: [0xe0, 0xfc, 0xa0],
        h3A: [0xa8, 0xf0, 0xbc],
        h3B: [0xb0, 0xfc, 0xcc],
        h3C: [0x9c, 0xfc, 0xf0],
        h3D: [0xc4, 0xc4, 0xc4],
        h3E: [0, 0, 0],
        h3F: [0, 0, 0]
    };
});