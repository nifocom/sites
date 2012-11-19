$(function () {
    var $menu = $('#mb_menu li'),

				$menuItems = $menu.children('a'),
				$mbWrapper = $('#mb_content_wrapper'),
				$mbClose = $mbWrapper.children('.mb_close'),
				$mbContentItems = $mbWrapper.children('.mb_content'),
				$mbPattern = $('#mb_pattern'),
				$first_contact = $('.first_contact'),
                $notification = $('#notification'),
                $notificationClose = $notification.find('.closer'),

    Menu = (function () {

        var init = function () {

            initPattern();
            initEventsHandler();
        },


        //Инициализация плагина jScollPane
        /*
        Рисуем 16 прямоугольников в определённой области экрана.
        Случайным образом вычисляются координаты и угол поворота для каждого из них
        */
					initPattern = function () {
					    for (var i = 0; i < 7; ++i) {
					        //Случайные вычисления координат
					        var o = 0,
							t = Math.floor(Math.random() * 196) + 5, // от 5 до 200
							l = Math.floor(Math.random() * 696) + 5, // от 5 до 700
							a = Math.floor(Math.random() * 101) - 50; // от -50 до 50

					        $el = $('<div>').css({
					            opacity: o,
					            top: t + 'px',
					            left: l + 'px'
					        });

					        if (!$.browser.msie)
					            $el.transform({ 'rotate': a + 'deg' });

					        $el.appendTo($mbPattern);
					    }
					},
     
					disperse = function () {
					    $mbPattern.children().each(function (i) {
					      
					        var o = 0,
							t = Math.floor(Math.random() * 196) + 5, // от 5 до 200
							l = Math.floor(Math.random() * 696) + 5, // от 5 до 700
							a = Math.floor(Math.random() * 101) - 50; // от -50 до 50
					        $el = $(this),
							param = {
							    width: '50px',
							    height: '50px',
							    opacity: o,
							    top: t + 'px',
							    left: l + 'px'
							};

					        if (!$.browser.msie)
					            param.rotate = a + 'deg';

					        $el.animate(param, 1000, 'easeOutExpo');
					    });
					},
					initEventsHandler = function () {
					    $notificationClose.bind('click', function (e) {
					        $notification.fadeOut(500);
					        $(".overlay").animate({ opacity: 0 }, 500).fadeOut(500);
					    });

					    /*
					    Нажатие на ссылку 
					    */
					    $menuItems.bind('click', function (e) {
					        var $this = $(this),
							pos = $this.index(),
							speed = $this.data('speed'),
							easing = $this.data('easing');
					        //если пункт еще не выводится на экран
					        if (!$menu.data('open')) {
					            //Если выполняется анимация, то прекращаем действие
					            if ($menu.data('moving')) return false;
					            $menu.data('moving', true);
					            $.when(openItem(pos, speed, easing)).done(function () {
					                $menu.data({
					                    open: true,
					                    moving: false
					                });
					                showContentItem(pos);
					                $mbPattern.children().fadeOut(420);
					            });
					        }
					        else
					            showContentItem(pos);
					        return false;
					    });

					    /*
					    
					    */
					    $mbClose.bind('click', function (e) {
					        $('.formError').fadeOut(100);
					        $(".overlay").animate({ opacity: 0 }, 500).fadeOut(500); ; // check prepend() examples


					        $menu.data('open', false);
					        /*
					        
					        */
					        $mbPattern.children().fadeIn(420, function () {
					            $mbContentItems.fadeOut(200);
					            $mbWrapper.fadeOut(400);
					            $('div').removeClass('invalid');
					            $('.focus').removeClass('red');
					            $('#fullname').val('');
					            $('.phone').val(''); $('#email').val(''); $('#about').val('');
					        }
);

					        disperse();
					        return false;
					    });



					},
        /*
					
					
        
        */
					showContentItem = function (pos) {
					    $mbContentItems.fadeOut(400);
					    $mbWrapper.fadeIn(400);
					    $mbContentItems.eq(pos).show();
					},
        /*
       
        */
					openItem = function (pos, speed, easing) {
					    return $.Deferred(
						function (dfd) {
						    $mbPattern.children().each(function (i) {
						        var $el = $(this),
								param = {
								    width: '100px',
								    height: '100px',
								    top: 55 + 100 * Math.floor(i / 7),
								    left: 610 + 100 * (i % 7),
								    opacity: 0
								};

						        if (!$.browser.msie)
						            param.rotate = '0deg';

						        $el.animate(param, speed, easing, dfd.resolve);
						    });
						}
					).promise();
					};

        return {
            init: init
        };

    })();

    /*
 
    */
    Menu.init();
});
				$(function() {
				$('.focus').focus(function() {
                    $('label.highlighted').removeClass('highlighted');
                    $(this).prev().addClass('highlighted'); 
					$(this).removeClass('red');
                });
				 $(".focus").blur(function () {
					$('label.highlighted').removeClass('highlighted');
					$(this).removeClass('red');
				});
			
				$('.first_contact_inner a').click(function() {
						$('.first_contact').fadeOut(500);
						
				});
				
				 /* $(document).click(function(e){
						if ($(e.target).parents().filter('#mb_content_wrapper:visible').length != 1) {
							$('#mb_content_wrapper').fadeOut(500);
							
				
						}
					});
				*/
				$(document).keyup(function(e){
					if (e.keyCode == 27){
						$("#mb_content_wrapper").fadeOut(500);
						$(".first_contact").fadeOut(500);
						$("#notification").fadeOut(500);
                        $(".overlay").animate({opacity: 0}, 500 ).fadeOut(500);

					}
				});
				
				$('.open').click(function() {
						 $('.first_contact').animate({opacity:1}, 750 ).fadeIn(600);

						 $(".overlay").prependTo("body"); // check prepend() examples
					     $(".overlay").addClass("over"); // check prepend() examples
					     $(".overlay").animate({opacity:0.4}, 500 ).fadeIn(500); // check prepend() examples
						 $('#phone').removeClass('red');
                                        $('#phone').parent().removeClass('invalid');
                                        $('#fullname').removeClass('red');
                                        $('#fullname').parent().removeClass('invalid');
                                        $('#email').removeClass('red');
                                        $('#email').parent().removeClass('invalid');
                                        $('#about').removeClass('red');
                                        $('#about').parent().removeClass('invalid');
                                        $(".loader").hide();

                 /*   $('.first_contact_inner').blurjs({
                        source: 'body',
                        radius: 7,
                        overlay: 'rgba(255,255,255,0.4)'
                    });
                    */
				});

				$('.closer').click(function() {
					$(".overlay").animate({opacity: 0}, 500 ).fadeOut(500);


				});




});