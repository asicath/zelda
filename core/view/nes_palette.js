
/*
The NES could select 4 palettes each containing one of these colors to be applied to the background.
(however, color 0 of each palette has to be the same, so technically, 13 different colors are available at a time)

A background palette is applied to a 16x16 pixel area,
however through a special video mode of the MMC5 mapper it is possible for every 8x8 pixel tile to have its individual palette.

As for sprites, 4 different palettes can be used at a time (with color 0 being transparent in each)
and every 8x8 or 8x16 pixels can have their own palette, allowing for a total of 12 different colors to use for sprites at any given time.
*/

// http://en.wikipedia.org/wiki/List_of_video_game_console_palettes#Famicom.2FNES
var NESPalette = {

    h00: [124,124,124],
    h01: [0,0,252],
    h02: [0,0,188],
    h03: [68,40,188],
    h04: [148,0,132],
    h05: [168,0,32],
    h06: [168,16,0],
    h07: [136,20,0],
    h08: [80,48,0],
    h09: [0,120,0],
    h0A: [0,104,0],
    h0B: [0,88,0],
    h0C: [0,64,88],
    h0D: [0,0,0],
    h0E: [0,0,0],
    h0F: [0,0,0],

    h10: [188,188,188],
    h11: [0,120,248],
    h12: [0,88,248],
    h13: [104,68,252],
    h14: [216,0,204],
    h15: [228,0,88],
    h16: [248,56,0],
    h17: [228,92,16],
    h18: [172,124,0],
    h19: [0,184,0],
    h1A: [0,168,0],
    h1B: [0,168,68],
    h1C: [0,136,136],
    h1D: [0,0,0],
    h1E: [0,0,0],
    h1F: [0,0,0],

    h20: [248,248,248],
    h21: [60,188,252],
    h22: [104,136,252],
    h23: [152,120,248],
    h24: [248,120,248],
    h25: [248,88,152],
    h26: [248,120,88],
    h27: [252,160,68],
    h28: [248,184,0],
    h29: [184,248,24],
    h2A: [88,216,84],
    h2B: [88,248,152],
    h2C: [0,232,216],
    h2D: [120,120,120],
    h2E: [0,0,0],
    h2F: [0,0,0],

    h30: [252,252,252],
    h31: [164,228,252],
    h32: [184,184,248],
    h33: [216,184,248],
    h34: [248,184,248],
    h35: [248,164,192],
    h36: [240,208,176],
    h37: [252,224,168],
    h38: [248,216,120],
    h39: [216,248,120],
    h3A: [184,248,184],
    h3B: [184,248,216],
    h3C: [0,252,252],
    h3D: [216,216,216],
    h3E: [0,0,0],
    h3F: [0,0,0]
};