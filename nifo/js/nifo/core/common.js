document.cancelFullScreen = document.webkitCancelFullScreen || document.mozCancelFullScreen;

window.requestAnimFrame = function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function( /* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };

}();

window.pad = function(number, length) {
        var str = '' + number;
        while (str.length < length) {
            str = '0' + str;
        }
        return str;
    }
 
 window.normalizeNumber = function(number) 
        {
            if (number >= 0 && number < 10)
                {
                    number = number.toString();
                    number = '0'+number;
                    
                    return number;
                }
            else {
                    return number;
            }
        }
        

function formatTime(time, hours) {
    if (hours) {
        var h = Math.floor(time / 3600);
        time = time - h * 3600;

        var m = Math.floor(time / 60);
        var s = Math.floor(time % 60);

        return lead0(h,2)  + ":" + lead0(m,2) + ":" + lead0(s,2);
    } else {
        var m = Math.floor(time / 60);
        var s = Math.floor(time % 60);

        return lead0(m,2) + ":" + lead0(s,2);
    }
}

function lead0(num, n) {
    var nz = "" + num;
    while (nz.length < n) {
        nz = "0" + nz;
    }
    return nz;
};

