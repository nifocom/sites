var hoverElem;

var indexController = (function () {

    indexController = function () {
        this.loader = new PxLoader();
        this.frameAnimator = new FrameAnimator();

        this.init();
    }

    indexController.prototype.init = function (param) {
        if (param == undefined) {
            param = "index"
        }

        var nifoLogoInitializer = function () {
            var obj = {
                group:"nifoLogo",
                elementId:"animated-element1",
                objBaseName:"img/index/logo/n",
                numFrames:30,
                fps:25,
                type:'forward',
                isOneZero:true
            };
            initAnimationObj(obj);

            var obj = {
                group:"nifoLogo",
                objBaseName:"img/index/logo/i",
                numFrames:30,
                fps:25,
                elementId:"animated-element2",
                type:'forward',
                isOneZero:true
            };
            initAnimationObj(obj);

            var obj = {
                group:"nifoLogo",
                objBaseName:"img/index/logo/f",
                numFrames:30,
                fps:25,
                elementId:"animated-element3",
                type:'forward',
                isOneZero:true
            };
            initAnimationObj(obj);

            var obj = {
                group:"nifoLogo",
                objBaseName:"img/index/logo/o",
                numFrames:30,
                fps:25,
                elementId:"animated-element4",
                type:'forward',
                isOneZero:true
            };
            initAnimationObj(obj);
        }
        var contactReasonInitializer = function () {
            var obj = {
                group:"contactReason",
                elementId:"contactReason_employment",
                objBaseName:"img/index/contactReason/employment/Employment",
                numFrames:80,
                fps:60,
                type:'forward',
                isOneZero:false
            };
            initAnimationObj(obj);

            var obj = {
                group:"contactReason",
                objBaseName:"img/index/contactReason/investment/Investment",
                numFrames:150,
                fps:80,
                elementId:"contactReason_investment",
                type:'forward',
                isOneZero:false

            };
            initAnimationObj(obj);

            var obj = {
                group:"contactReason",
                objBaseName:"img/index/contactReason/partnership/Partnership",
                numFrames:122,
                fps:80,
                elementId:"contactReason_partnership",
                type:'forward',
                isOneZero:false
            };
            initAnimationObj(obj);
        }

        var countdownInit = function () {
            $('#counter').countdown({
                image:'img/index/countdown/digits.png',
                startTime:window.daysBeforeDate("July 26, 2012")
            });
        }

        var draggableInit = function (){
            $( "#mb_content_wrapper" ).draggable({scroll: false, cursor: "move"});
            $( "#first_contact" ).draggable({scroll: false, cursor: "move"});
        }

        switch (param) {
            case 'index':
            {
                // countdown init
                countdownInit();

                // Map init
                map = new Map("small_map");
                map.showMap();

                // Location init
                locationInstance = new Location();
                locationInstance.init();

                // draggable elements init
                draggableInit();

                // add images for background loading
                this.loader.addImage("img/index/countdown/digits.png");

                var addAnimObjImagesList = function (seqName, numImgs, isOneZero) {
                    var i = 1;
                    for (i = 1; i < numImgs; i++) {
                        this.loader.addImage(this.frameAnimator.getImgName(i, seqName, isOneZero));
                    }
                }
                /*this.addAnimObjImagesList("img/logo/n",30,true);
                             this.addAnimObjImagesList("img/logo/i",30,true);
                            this.addAnimObjImagesList("img/logo/f",30,true);
                            this.addAnimObjImagesList("img/logo/o",30,true);*/

                // callback that will be run once images are ready
                this.loader.addCompletionListener(function () {
                        nifoLogoInitializer();
                        contactReasonInitializer();
                        indexController.frameAnimator.doGroupAnimation('nifoLogo');
                    }
                );
                this.loader.start();
                break;
            }
            case 'index_contact':
            {
                //this.addAnimObjImagesList("img/contactReason/partnership/Partnership",122,false);
                //this.addAnimObjImagesList("img/contactReason/investment/Investment",150,false);
                //this.addAnimObjImagesList("img/contactReason/employment/Employment",80,false);
            }
            default:
            {
            }
        }
        ;

    }

    return indexController;
})();

$(document).ready( function(){
    indexController = new indexController();
});