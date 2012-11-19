playList = {
    currentItem:0,
    init: function(playlistId)
    {   this.items = new Array();
        this.items[0] = {"videoUrl":"http://69.64.88.71/video/battleship-1080p.ogg",
                         "poster":"http://69.64.88.71/video/battleship.jpg",
                         "resolution":[ 1080],
                         "name":"Battleship",
                         "genre":" Action | Sci-Fi | Thriller",
                         "producer":"Peter Berg",
                         "currentTime":1,
                         "autostart":1};
        this.items[1] = {"videoUrl":"http://69.64.88.71/video/bourne\ legacy-1080p.ogg",
                          "poster":"http://69.64.88.71/video/bourne\ legacy.jpg",
                          "resolution":[ 1080],
                          "name":"The Bourne Legacy",
                          "genre":"Action | Adventure | Thriller ",
                          "producer":"Tony Gilroy",
                          "currentTime":3,
                          "autostart":1};
      this.items[2] = {"videoUrl":"http://69.64.88.71/video/prometheus-1080p.ogg",
                         "poster":"http://69.64.88.71/video/prometheus.jpg",
                         "resolution":[ 1080],
                         "name":"Prometheus",
                         "genre":"Action | Horror | Sci-Fi ",
                         "producer":"Ridley Scott",
                         "currentTime":1,
                         "autostart":1};
        this.items[3] = {"videoUrl":"http://69.64.88.71/video/the\ dark\ knight\ rises-1080p.ogg",
                          "poster":"http://69.64.88.71/video/the\ dark\ knight\ rises.jpg",
                          "resolution":[ 1080],
                          "name":"The Dark Knight Rises",
                          "genre":"Action | Crime | Drama ",
                          "producer":"Christopher Nolan",
                          "currentTime":3,
                          "autostart":1};
      this.items[4] = {"videoUrl":"http://69.64.88.71/video/total\ recall-1080p.ogg",
                         "poster":"http://69.64.88.71/video/total\ recall.jpg",
                         "resolution":[ 1080],
                         "name":"Total Recall",
                         "genre":"Action | Adventure | Sci-Fi ",
                         "producer":"Len Wiseman",
                         "currentTime":1,
                         "autostart":1};
                      
    },
    makePlaylist:function (videosObj) {
        var playlistLi = "";
        $.each(videosObj, function (videoId, videoObj) {
            playlistLi += "<li><span class='playlistVideo' videoId='" + videoId + "'>" + videoObj.name + "</span></li>";
        });
        this.playList.html(playlistLi);
    },
    getPrev: function()
    {
      var nextItem = this.currentItem-1;
        if(this.items[nextItem] != undefined){
            if(player.shuffleStatus == 1){
                var rand = this.items.length - 1;
                var randItem = Math.floor((Math.random()*rand)+1);
                var result = this.items[randItem];
            }
            else
                var result = this.items[nextItem];
            if(this.items[(nextItem-1)] == undefined && player.repeatStatus != 1){
                player.disablePrevButton();
            }
            this.currentItem = nextItem;
            player.enableNextButton();
            return result;
        }
        else if(player.repeatStatus == 1)
        {
            if(player.shuffleStatus == 1){
                var rand = this.items.length - 1;
                var randItem = Math.floor((Math.random()*rand)+1);
                var result = this.items[randItem];
            }
            else
                var result = this.items[(this.items.length - 1)];
            this.currentItem = (this.items.length - 1);
            player.enableNextButton();
            return result;
        }
        else
            return false;
    },
    getNext: function()
    {
        var nextItem = this.currentItem+1;
        if(this.items[nextItem] != undefined){
            if(player.shuffleStatus == 1){
                var rand = this.items.length - 1;
                var randItem = Math.floor((Math.random()*rand)+1);
                var result = this.items[randItem];
            }
            else
                var result = this.items[nextItem];
            if(this.items[(nextItem+1)] == undefined && player.repeatStatus != 1){
                player.disableNextButton();
            }
            player.enablePrevButton();
            this.currentItem = nextItem;
            return result;
        }
        else if(player.repeatStatus == 1)
        {
            if(player.shuffleStatus == 1){
                var rand = this.items.length - 1;
                var randItem = Math.floor((Math.random()*rand)+1);
                var result = this.items[randItem];
            }
            else
                var result = this.items[0];
            this.currentItem = 0;
            player.enablePrevButton();
            return result;
        }
        else
            return false;
    },
    getCurrentItem: function(){
        return this.items[this.currentItem];
    },
    cycleMode: function(onOff)
    {
        if (onOff = undefined)
        {
            return this.cycleMode;
        }
        this.cycleMode = onOff;
    },
    checkNextPrevItem: function(){
        var nextItem = this.currentItem-1;
        if(this.items[nextItem] == undefined){
            player.disablePrevButton();
        }
        nextItem = this.currentItem+1;
        if(this.items[nextItem] == undefined){
            player.disableNextButton();
        }
    }
}
