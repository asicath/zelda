
var Palettes = {

    Default: {
        name:'Default',
        colors: [
            [0x40, 0x40, 0x40, 0xff], // White, Ground
            [0x00, 0x00, 0x00, 0xff], // Black, shadows
            [0x80, 0x80, 0x80, 0xff], // Green, Trees & Rocks
            [0xbf, 0xbf, 0xbf, 0xff]  // Blue, usually water or highlights
        ]
    },

    OutsideGreen: {
        name:'OutsideGreen',
        colors: [
            [0xf7, 0xd8, 0xa5, 0xff], // White, Ground
            [0x00, 0x00, 0x00, 0xff], // Black, shadows
            [0x0d, 0x93, 0x00, 0xff], // Green, Trees & Rocks
            [0x42, 0x40, 0xff, 0xff]  // Blue, usually water or highlights
        ]
    },

    OutsideBrown: {
        name:'OutsideBrown',
        colors: [
            [0xf7, 0xd8, 0xa5, 0xff], // White, Ground
            [0x00, 0x00, 0x00, 0xff], // Black, shadows
            [0x99, 0x4e, 0x00, 0xff], // Brown, Trees & Rocks
            [0x42, 0x40, 0xff, 0xff]  // Blue, usually water or highlights
        ]
    },

    OutsideGrey: {
        name:'OutsideGrey',
        colors: [
            [0x7a, 0x7a, 0x7a, 0xff], // Brown, for trees, bushes
            [0x00, 0x00, 0x00, 0xff], // Blue, usually water or highlights
            [0xff, 0xff, 0xff, 0xff], // Ground Color
            [0x00, 0x1a, 0xff, 0xff]  // Black, shadows
        ]
    },

    Nihil: {
        name:'Nihil',
        colors: [
            [0x00, 0x00, 0x00, 0x00], // Brown, for trees, bushes
            [0xa0, 0xa0, 0xa0, 0xff], // Blue, usually water or highlights
            [0x80, 0x80, 0x80, 0xff], // Ground Color
            [0xff, 0xff, 0xff, 0xff]  // Black, shadows
        ]
    },

    AllBlack: {
        name:'AllBlack',
        colors: [
            [0x00, 0x00, 0x00, 0xff], // Brown, for trees, bushes
            [0x00, 0x00, 0x00, 0xff], // Blue, usually water or highlights
            [0x00, 0x00, 0x00, 0xff], // Ground Color
            [0x00, 0x00, 0x00, 0xff]  // Black, shadows
        ]
    },

    LinkGreen: {
        name:'LinkGreen',
        colors: [
            [0x00, 0x00, 0x00, 0x00],
            [0xb8, 0xf8, 0x18, 0xff], // h29
            [0xff, 0xa0, 0x44, 0xff],
            [0xe4, 0x5c, 0x10, 0xff]
        ]
    },

    Aquamentus: {
        name:'Aquamentus',
        colors: [
            [0x00, 0x00, 0x00, 0x00],
            [0xb8, 0xf8, 0x18, 0xff], // h29
            [0x0d, 0x93, 0x00, 0xff],
            [0xff, 0xff, 0xff, 0xff]
        ]
    },

    MonsterRed: {
        name: 'MonsterRed',
        colors: [
            [0x00, 0x00, 0x00, 0x00],
            [0xb5, 0x31, 0x20, 0xff], // Bright
            [0xea, 0x9e, 0x22, 0xff], // Highlight
            [0xff, 0xff, 0xff, 0xff]  // White
        ]
    },

    MonsterBlue: {
        name: 'MonsterBlue',
        colors: [
            [0x00, 0x00, 0x00, 0x00],
            [0x14, 0x12, 0xa7, 0xff], // Bright
            [0x92, 0x90, 0xff, 0xff], // Highlight
            [0xff, 0xff, 0xff, 0xff]  // White
        ]
    },

    MonsterBlack: {
        name: 'MonsterBlack',
        colors: [
            [0x00, 0x00, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0xff], // Bright
            [0x00, 0x7c, 0x8d, 0xff], // Highlight
            [0xb5, 0x31, 0x20, 0xff]  // White
        ]
    },


    DeathStarRedBlue: {
        name: 'DSRedBlue',
        colors: [
            [0x00, 0x00, 0x00, 0x00],
            [0xb5, 0x31, 0x20, 0xff],   // outer d82800
            [0x00, 0x7c, 0x8d, 0xff],   // inner 008088
            [0x00, 0x00, 0x00, 0x00]    // not used
        ]
    },
    DeathStarWhiteGold: {
        name: 'DSWhiteGold',
        colors: [
            [0x00, 0x00, 0x00, 0x00],
            [0xfc, 0xfc, 0xfc, 0xff],   // outer fcfcfc
            [0xfc, 0x98, 0x38, 0xff],   // inner fc9838
            [0x00, 0x00, 0x00, 0x00]    // not used
        ]
    },
    DeathStarWhiteBlue: {
        name: 'DSWhiteBlue',
        colors: [
            [0x00, 0x00, 0x00, 0x00],
            [0xfc, 0xfc, 0xfc, 0xff], // outer fcfcfc
            [0x5c, 0x94, 0xfc, 0xff],  // inner 5c94fc
            [0x00, 0x00, 0x00, 0x00]
        ]
    },
    DeathStarRedGold: {
        name: 'DSRedGold',
        colors: [
            [0x00, 0x00, 0x00, 0x00],
            [0xc8, 0x4c, 0x0c, 0xff], // outer c84c0c
            [0xfc, 0x98, 0x38, 0xff],  // inner fc9838
            [0x00, 0x00, 0x00, 0x00]
        ]
    },


    Text: {
        name: 'text',
        colors: [
            [0x00, 0x00, 0x00, 0xff],
            [0xfc, 0xfc, 0xfc, 0xff],
            [0x00, 0x00, 0x00, 0x00],
            [0x00, 0x00, 0x00, 0x00]
        ]
    }






};