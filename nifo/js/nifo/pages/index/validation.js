 var sendEmailRequest = 0;
$(document).ready(function () {
    // ====================================================== //

    var jVal = {
        'fullName': function () {

            var ele = $('#fullname');
            var pos = ele.offset();

            var patt = /^[a-zA-Zа-яА-Я\.\s]{3,}$/i;

            if (!patt.test(ele.val())) {
                jVal.errors = true;

                $('#fullname').addClass('red');
                $('#fullname').parent().addClass('invalid');

            } else {
                $('#fullname').removeClass('red');
                $('#fullname').parent().removeClass('invalid');
            }
        },

        'phone': function () {


            var ele = $('#phone');
            var pos = ele.offset();



            var patt = /^[0-9-()]{3,}$/i;

            if (ele.val() != '') {
                if (!patt.test(ele.val())) {
                    jVal.errors = true;

                    $('#phone').addClass('red');
                    $('#phone').parent().addClass('invalid');
                } else {
                    $('#phone').removeClass('red');
                    $('#phone').parent().removeClass('invalid');
                }
            }
        },
        'email': function () {


            var ele = $('#email');
            var pos = ele.offset();



            var patt = /^[a-zA-Z0-9._-]{3,}@[a-zA-Z0-9.-]{3,}\.[a-zA-Z]{2,4}$/i;

            if (!patt.test(ele.val())) {
                jVal.errors = true;

                $('#email').addClass('red');
                $('#email').parent().addClass('invalid');
            } else {
                $('#email').removeClass('red');
                $('#email').parent().removeClass('invalid');
            }
        },

        'about': function () {




            var ele = $('#about');
            var pos = ele.offset();

            if (ele.val().length < 5) {
                jVal.errors = true;

                ele.addClass('red');
                ele.parent().addClass('invalid');
            } else {

                ele.removeClass('red');
                ele.parent().removeClass('invalid');
            }
        },

        'sendIt': function () {
            if (!jVal.errors) {
                //$('#send_form').submit();
                if(sendEmailRequest != 1){
                        SendFeedback();
                    }
            }
        }
    };

    // ====================================================== //

    $('#send').click(function () {
        var obj = $.browser.webkit ? $('body') : $('html');
        obj.animate({ scrollTop: $('#send_form').offset().top }, 750, function () {
            jVal.errors = false;
            jVal.fullName();
            jVal.phone();
            jVal.email();
            jVal.about();
            jVal.sendIt();
        });
        return false;
    });
    $(document).keyup(function (e) {
        if (e.keyCode == 13 && e.target.id != "about"){
            var obj = $.browser.webkit ? $('body') : $('html');
            obj.animate({ scrollTop: $('#send_form').offset().top }, 750, function () {
                jVal.errors = false;
                jVal.fullName();
                jVal.phone();
                jVal.email();
                jVal.about();
                jVal.sendIt();
            });
            return false;
        }
    });
    $(document).keyup(function (e) {

    });

    $('#fullname').change(jVal.fullName);
    $('#phone').change(jVal.phone);
    $('#email').change(jVal.email);
    $('#about').change(jVal.about);

    // ====================================================== //
});


// ===== feedback ==== //
var category; //who are you?

function SetCategory(linkBtn) {
    category = $(linkBtn).text();
}

var Feedback = function () {
    this.Name = '';
    this.Category = '';
    this.Email = '';
    this.Phone = '';
    this.Message = '';
}

function SendFeedback() {
    sendEmailRequest = 1;
    $('#send').hide();
    $('.loader-feedback').show();

    var feedback = new Feedback();
    feedback.Category = category;
    feedback.Name = $('#fullname').val();
    feedback.Email = $('#email').val();
    feedback.Phone = $('.phone').val();
    feedback.Message = $('#about').val();

    $.ajax({
        url: 'services/email.php',
        type: "POST",
        dataType: 'json',
        crossDomain: true,
        timeout: 10000,
        data: feedback,
        success: function (data) {
            //alert('success: ' + data);
            console.log(data);
        },
        error: function (xhr, status) {
            //alert('error: ' + xhr.responseText);
        },
        complete: function (jqXHR, textStatus) {
            $('#mb_content_wrapper').fadeOut('slow', function () {
                //clear feedback form
                $('#send').show();
                $('.loader-feedback').hide();
                $('#fullname').val('');
                $('#email').val('');
                $('.phone').val('');
                $('#about').val('');

                //show confirm
                $('#notification').fadeIn('slow'); 
                sendEmailRequest = 0;
            });
        }
    });
}

function ClosePopup(btn) {
    $('div.overlay').fadeOut('slow');
    $(btn).parents('.notification-popup:first').fadeOut('slow');
}