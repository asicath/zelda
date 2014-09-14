
var ImageOptions = function(key) {
    var my = {
        key: key,
        colorSwaps: []
    };

    my.addColorSwap = function(target, replaceWith) {
        my.colorSwaps.push({
            target: Color.fromNESPalette(target),
            replaceWith: Color.fromNESPalette(replaceWith)
        });
        return my;
    };

    return my;
};

ImageOptions.RedToBlue = ImageOptions('blue').addColorSwap("16", "02").addColorSwap("27", "22");
