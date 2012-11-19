var Player = (function () {
    Player = function () {
        this.video = $("#myvideo")
        this.playpause = $(".t_play")
        this.repeat = $(".t_repeat")
        this.shuffle = $(".t_shuffle")
        this.total = $("#total")
        this.buffered = $("#buffered")
        this.progress = $(".vp_timeline")
        this.volume = $('.vp_volume,.bar')
        this.duration = $('#duration,.timer')
        this.currentTime = $('#currenttime,.time')
        this.hasHours = false
        this.fullscreenButton = $(".p_full")
        this.closescreenButton = $(".p_close")
        this.soundOnOff = $(".vp_soundOnOff")
        this.soundMax = $(".vp_volumeMax")
        this.videosObj = []
        this.currentVideo = 0
        this.resolutions = $("#resolutions")
        this.changeQualityClass = "changeQuality"
        this.playList = $("#playList")
        this.nextVideoObj = $('.vp_next')
        this.previousVideoObj = $('.vp_previous')
        this.changeProgressManual = 0
        this.infoBar = $('#about_video')
        this.smallVideoObj = $(".smallVideo")
        this.repeatStatus = 0
        this.shuffleStatus = 0
        this.smallVideoContainer = $("#smallVideoContainer")
        this.progressFullScreen = $("#progressbar")
        this.progressSmall = $("#progress")
        this.videoSupport = 0;
        this.fullscreenMode = 0;

        this.togglePlayback = function () {
            (this.video[0].paused) ? this.video[0].play() : this.video[0].pause();
        }
        this.initializeSmallVideo = function () {
            var currentVideo = playList.getCurrentItem();
            var smallVideoUrl = currentVideo.videoUrl;
            smallVideoUrl = currentVideo.videoUrl.replace("-720p.", "-360p.");
            smallVideoUrl = currentVideo.videoUrl.replace("-1080p.", "-360p.");
            this.smallVideoObj[0].src = smallVideoUrl;
        }
        togglePlayback = function () {
            (this.video[0].paused) ? this.video[0].play() : this.video[0].pause();
        }
        this.onFullScreenEnter = function () {
            var fsElement = document.querySelector(document.webkitCancelFullScreen ? "#fs" : "#fs-container");
            fsElement.onwebkitfullscreenchange = player.onFullScreenExit;
            fsElement.onmozfullscreenchange = player.onFullScreenExit;
            player.video.removeClass('halfsize');
            player.video.width(screen.width);
            $("#about_video").fadeOut(0);
            $('#top_control').fadeOut(0);
            $('.audio_player_controls').fadeOut(0);
            $('#controls').animate({ marginTop: -((screen.height / 100) * 22) }, 0);
            $('#controls').fadeIn(300);
            $('.bottom_info').fadeOut(300);
            $('.bottom_info_share').fadeOut(300);
            $("#controls").draggable({ scroll: false, cursor: "move" });
            player.fullscreenMode = 1;
        }
        this.enterFullscreenMode = function (browser) {
            console.log("enterFullscreenMode");
            player.fullscreenMode = 1;
            var fsElement = document.querySelector(document.webkitCancelFullScreen ? "#fs" : "#fs-container");
            fsElement.onwebkitfullscreenchange = player.onFullScreenEnter;
            fsElement.onmozfullscreenchange = player.onFullScreenEnter;
            if (fsElement.webkitRequestFullScreen) {
                if($.browser.safari)
                    fsElement.webkitRequestFullScreen(); 
                else
                    fsElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            } else {
                this.onFullScreenEnter();
                fsElement.mozRequestFullScreen();
                window.addEventListener("mozfullscreenchange", player.onFullScreenExit, true);
            }
            // controls.video.resizeTo(screen.availWidth,screen.availHeight)
            player.video.width(screen.availWidth);
            player.video.height(screen.availHeight); //715px
            this.progressFullScreen.append(this.smallVideoContainer[0]);
        }
        this.onFullScreenExit = function () {
            player.fullscreenMode = 0;
            if (document.mozFullScreen) {
                return false;
            }
            console.log("Exited fullscreen initiated from iframe");
            player.video.addClass('halfsize');
            player.video.width("800");
            player.video.height("420");
            $('#top_control').fadeIn(300);
            $('.audio_player_controls').fadeIn(300);
            $('#controls').fadeOut(500);
            $("#about_video").fadeIn(0);
            $("#about_video").animate({ opacity: 0 }, 0);
            $('.bottom_info').fadeIn(300);
            this.progressSmall.append(this.smallVideoContainer[0]);
        }
        this.exitFullscreen = function () {
            console.log("exitFullscreen()");
            document.cancelFullScreen();
            this.onFullScreenExit();
        }

        this.toggleControlSize = function (controlObj) {
            if ($(controlObj).hasClass('long_control')) {
                $(controlObj).removeClass('long_control').addClass('short_control');

                //make control long
                $('#controls').width($(window).width() - 20).css('left',0);
                $('#controles').width($('#controls').width());
                $('#middleSide').width($(window).width() - 426);
                $('#progressbar').width($('#controls').width() - 130);
            }
            else {
                $(controlObj).removeClass('short_control').addClass('long_control');

                //make control short
                $('#controls').width(410).css('left', 0);
                $('#controles').width($('#controls').width());
                $('#middleSide').width(4);
                $('#progressbar').width(278);
            }
        };

        this.closeVideoPlayer = function (browser) {
            console.log("Close Video Player");
            player.stopVideo();
            document.getElementById("fs-container").style.display = "none";
        }
        this.volumePosition = function (vol) {
            if (vol == undefined) {
                vol = 0.3;
            }

            if (vol == 1) {
                this.soundMax.addClass("vol_max")
            }
            else {
                this.soundMax.removeClass("vol_max")
            }

            if (vol == 0) {
                this.soundOnOff.attr("switch", 0);
                this.soundOnOff.addClass("off");
                this.volume.slider("value", 0);
                this.video[0].volume = 0;
                return;
            }
            else {
                this.soundOnOff.attr("switch", 1);
                this.soundOnOff.removeClass("off");
                this.volume.slider("value", vol * 100);
                console.log("sound level:" + vol)
                this.video[0].volume = vol;
            }
        }
        this.updateInfo = function (videoObj) {
            $('#about_video div .v_genre').text(videoObj.genre);
            $('#about_video div .v_name').text(videoObj.name);
            $('#about_video div .v_produce').text(videoObj.producer);
            $('#about_video div .v_rezo').text(videoObj.resolution[0]);
        }
        this.changeVideo = function (videoObj) {

            var curVideoData = this.getCorrectVideoUrl(videoObj.videoUrl);
            var isSupp = null;
            isSupp = this.video[0].canPlayType(curVideoData['videoType']);
            if (isSupp != "probably") {
                this.playpause.removeClass("paused");
                this.videoSupport = 0;
                return false;
            }
            this.videoSupport = 1;
            $("#buffered").removeClass('buffered_end');
            $(".buffered").removeClass('hover_buffered_end');
            $("#buffered").css("width", "0px");
            //            this.playpause.toggleClass("");
            this.video[0].poster = videoObj.poster;
            this.video[0].pause();
            this.video[0].src = curVideoData['videoUrl'];
            this.video[0].load();
            this.progress.slider("value", 0);
            this.createResolutionObj(videoObj);
            this.updateInfo(videoObj);
            this.initializeSmallVideo();
        }
        this.nextPreviousVideo = function (button) {
            if (button == "next") {
                var nextVideo = playList.getNext();
                if (nextVideo) {
                    this.changeVideo(nextVideo);
//                    console.log(nextVideo);
                    //                    player.playpause.toggleClass("paused");
                    this.video[0].play();
                }
            }
            else if (button == "previous") {
                var prevVideo = playList.getPrev();
                if (prevVideo) {
                    this.changeVideo(prevVideo);
                    //                    player.playpause.toggleClass("paused");
                    this.video[0].play();
                }
            }
//            var videoObj = this.videosObj[playList.currentItem];
//            this.updateInfo(videoObj);

        }
        this.disableNextButton = function () {
            this.nextVideoObj.addClass("inactive_next");
        }
        this.disablePrevButton = function () {
            this.previousVideoObj.addClass("inactive_prev");
        }
        this.enableNextButton = function () {
            this.nextVideoObj.removeClass("inactive_next");
        }
        this.enablePrevButton = function () {
            this.previousVideoObj.removeClass("inactive_prev");
        }
        this.stopVideo = function () {
            this.video[0].pause();
            this.video[0].currentTime = 0;
        }
        this.createResolutionObj = function (videoObj) {
            var resolutionList = '';
            $.each(videoObj.resolution, function (index, value) {
                resolutionList += '<li><a href="javascript:void(0)" class="changeQuality" value="' + value + '">' + value + 'p</a></li>';
            });
            this.resolutions.html(resolutionList);
        }
        this.changeResolution = function (resolution) {
            if (resolution == 480) {
                var currentTime = player.video[0].currentTime;

                player.video[0].pause();
                player.video[0].src = player.videosObj[(player.currentVideo + 1)].videoUrl;
                player.video[0].addEventListener('canplay', function () {
                    if (currentTime != false) {
                        player.video[0].currentTime = currentTime;
                        currentTime = false;
                    }
                    player.video[0].play();
                });
            }
        }
        this.makePlaylist = function (videosObj) {
            var playlistLi = "";
            $.each(videosObj, function (videoId, videoObj) {
                playlistLi += "<li><span class='playlistVideo' videoId='" + videoId + "'>" + videoObj.name + "</span></li>";
            });
            this.playList.html(playlistLi);
        }
        this.getBufferedInPerc = function () {
            var buf = 0;
            try {
                buf = this.video[0].buffered.end(0);
            }
            catch (ex) {

                return 0;
            }
            var res = Math.floor(buf) / Math.floor(this.video[0].duration);
            //console.log("++ getBufferedInPerc : " + res);
            return res;
        }
        this.getCorrectVideoUrl = function (url) {
            var browser = $.browser;
            var result = new Array();
            //             console.log(navigator.userAgent);
            if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
                var videoUrl = url.substr(0, url.length - 3);
                videoUrl += "mp4";
                var type = 'video/mp4; codecs="avc1.4D401E, mp4a.40.2"';
                var mobileLink = "";
                mobileLink = videoUrl.replace("-720p.", "-360p.");
                mobileLink = videoUrl.replace("-1080p.", "-360p.");
                console.log("videoUrl for iphone: " + mobileLink);
                result['videoUrl'] = mobileLink;
                result['videoType'] = type;
                return result;
            }
            if (browser.chrome || browser.mozilla) {
                var videoUrl = url.substr(0, url.length - 3);
                videoUrl += "ogg";
                var type = 'video/ogg; codecs="theora, vorbis"';
                result['videoUrl'] = videoUrl;
                result['videoType'] = type;
            }
            else if (browser.safari || browser.msie) {
                var videoUrl = url.substr(0, url.length - 3);
                videoUrl += "mp4";
                var type = 'video/mp4; codecs="avc1.4D401E, mp4a.40.2"';
                result['videoUrl'] = videoUrl;
                result['videoType'] = type;
            }

            //                var result = new Array();
            return result;
        }

    }



    Player.prototype.init = function (videosObj) {

        //# region  execute logic
        this.videosObj = videosObj;
        // this.makePlaylist(videosObj);
        this.changeVideo(videosObj[0])

        //# region actions bindings
        this.soundOnOff.click(function () {
            if (player.soundOnOff.attr("switch") == 1) {
                player.volumePosition(0);
            }
            else player.volumePosition();
        });

        this.soundMax.click(function () {
            player.volumePosition(1);
        });

        this.playpause.click(function () {
            player.togglePlayback();
        });

        this.video.click(function () {
            player.togglePlayback();
        });

        $("." + this.changeQualityClass).live("click", function () {
            player.changeResolution($(this).attr("value"));
        });

        this.nextVideoObj.live("click", function () {
            if (!$(this).hasClass("inactive_next"))
                player.nextPreviousVideo("next");
        });
        this.previousVideoObj.live("click", function () {
            if (!$(this).hasClass("inactive_prev"))
                player.nextPreviousVideo("previous");
        });

        $(".playlistVideo").live("click", function () {
            player.changeVideo(player.videosObj[$(this).attr("videoId")]);
            player.currentVideo = $(this).attr("videoId");
        });

        this.fullscreenButton.click(function () {
            var userAgent = navigator.userAgent.toLowerCase();
            player.fullscreenMode = 1;
            player.enterFullscreenMode($.browser);
        });

        this.closescreenButton.click(function () {
            var userAgent = navigator.userAgent.toLowerCase();
            var browser = $.browser;
            player.closeVideoPlayer(browser);
        });

        this.repeat.click(function () {
            if (player.repeatStatus == 0) {
                $(".t_repeat").css("background-position", "0 -15px");
                player.repeatStatus = 1;
                player.enablePrevButton();
                player.enableNextButton();
            }
            else {
                $(".t_repeat").css("background-position", "0 0px");
                player.repeatStatus = 0;
                playList.checkNextPrevItem();
            }
        });

        this.shuffle.click(function () {
            if (player.shuffleStatus == 0) {
                player.shuffleStatus = 1;
                $(".t_shuffle").css("background-position", "0 -16px");
            }
            else {
                player.shuffleStatus = 0;
                $(".t_shuffle").css("background-position", "0 0px");
            }
        });

        if (videosObj[0].autostart == 1 && this.videoSupport == 1) {
            this.video[0].addEventListener('loadedmetadata', function () {
                player.video[0].currentTime = videosObj[0].currentTime;
            });

            this.video[0].play();
        }
        this.previousVideoObj.addClass("inactive_prev");
        if (videosObj.length <= 1)
            this.nextVideoObj.addClass("inactive_next");
        var videoObj = this.videosObj[0];
        this.updateInfo(videoObj);
        var video = this.video[0];


        this.initializeSmallVideo();

        this.progress.mousemove(function (e) {

            if (player.videoSupport == 0) {
                return false;
            }
            //controls.smallVideoObj[0].currentTime
            if (e.currentTarget.hasClass == "ui-slider-handle ui-state-default ui-corner-all progress_dot ui-state-hover")
                return false;
            // $(".ajax_loader").addClass("ajax_loader_active");
            try {
                if (e.currentTarget.tagName == "A") {
                    console.log("A")
                    return
                }
                var browser = $.browser
                var X = e.originalEvent.layerX;
                var leftMove = (e.currentTarget.id == "buffered") ? 90 : 95
                if ((browser.webkit && player.fullscreenMode == 1))// || document.mozFullScreen)
                {
                    leftMove = 650;
                    X = e.offsetX;
                }
                if (document.mozFullScreen) {
                    leftMove = 650;
                }

                console.log(leftMove);
                $(".small_video").css("left", (X - leftMove));
                //        player.smallVideoObj.css("left",(X - leftMove ));
                var curTime = (player.video[0].duration * (X)) / e.currentTarget.clientWidth;

                curTime = curTime + (4 * player.video[0].duration / 353);
                player.smallVideoObj[0].currentTime = curTime;
                var curTimeInt = parseInt(curTime);
                var curTimeStr = formatTime(curTime)
                $(".t").text(curTimeStr);

            }
            catch (err) {

            }

            // $(".ajax_loader").removeClass("ajax_loader_active");


        }).mouseenter(function (e) {
            if (player.videoSupport == 0) {
                return false;
            }
            player.smallVideoObj.css("display", "block");
            $(".small_video").css("display", "block");

        }).mouseleave(function (e) {
            if (player.videoSupport == 0) {
                return false;
            }
            player.smallVideoObj.css("display", "none");
            $(".small_video").css("display", "none");
        });

        this.volume.slider({
            orientation: "horizontal",
            range: "min",
            min: 0,
            max: 100,
            value: 50,
            slide: function (event, ui) {
                //video.volume = (ui.value / 100);
                $("#amount").val(ui.value);
                //swich off mute style
                if (ui.value == 0) {
                    player.volumePosition(0);
                }
                else {
                    var value = ui.value / 100;
                    player.volumePosition(value);
                    console.log("volume position: " + value)
                    if (value == 1) {
                        player.soundMax.addClass("vol_max");
                    }
                }
            }
        });

        this.progress.slider({
            range: "min",
            value: 0,
            min: 1,
            max: 100,
            slide: function (event, ui) {
                if (player.videoSupport != 1) { return false; }
                player.changeProgressManual = 1;
                player.currentTime.text(formatTime(parseInt((ui.value) * player.video[0].duration / 100)), player.hasHours);
            },
            change: function (event, ui) {
                if (player.videoSupport != 1) { return false; }
                if (player.changeProgressManual == 1) {
                    player.video[0].currentTime = (ui.value) * player.video[0].duration / 100;
                    player.changeProgressManual = 0;
                    player.video[0].play();  /// can be remove
                }
            }
        });

        $(".audio_player_controls").hover(
        function () {
            if (player.getBufferedInPerc() > 0.97) {
                $(".buffered").addClass('hover_buffered_end');
            }
        }).mouseleave(function () {
            $(".buffered").removeClass('hover_buffered_end');

        });


        this.progress.append($("<span id='buffered' class='buffered' ></span>) "));

        $("#amount").val(player.volume.slider("value"));

        player.total.css("width", (353));

        video.addEventListener("play", function () {
            player.playpause.addClass("paused");
        });
        video.addEventListener("pause", function () {
            player.playpause.removeClass("paused");
        });

        video.addEventListener("ended", function () {
            var nextVideo = playList.getNext();
            if (nextVideo) {
                player.changeVideo(nextVideo);
                //            player.playpause.toggleClass("paused");
                player.video[0].play();
            }
        });

        video.addEventListener("canplay", function () {
            player.hasHours = (video.duration / 3600) >= 1.0;
            player.duration.text(formatTime(video.duration, player.hasHours));
            player.currentTime.text(formatTime(this.currentTime), player.hasHours);
        }, false);


        video.addEventListener("timeupdate", function () {
            player.currentTime.text(formatTime(video.currentTime, player.hasHours));
            var progress = Math.floor(video.currentTime) / Math.floor(video.duration);
            if (player.changeProgressManual == 0)
                player.progress.slider("value", (progress * 100));
        }, false);

        video.addEventListener("progress", function () {

            var bufferedInPerc = player.getBufferedInPerc();
            if (bufferedInPerc > 0.9) {
                $("#buffered").addClass('buffered_end');
                $("#buffered").attr("style", "width:353px");
                return;
            }
            //console.log("bufferedInPerc : " + bufferedInPerc);
            var w = Math.floor(bufferedInPerc * 353) + 'px';
            $("#buffered").attr("style", "width: " + w);

            $("#buffered").attr("style", "width: " + w);
        }, false);

        video.addEventListener("loadedmetadata", function (e) {
            //    var width = this.videoWidth,
            //   var height = this.videoHeight;
        }, false);

    }
    return Player;
})();