 var sendEmailRequest = 0;
$(document).ready(function () {

    function checkErr(el,pattern)
    {
        var pos = el.offset();
        pattern = eval(pattern)
        if (!pattern.test(el.val())) {
            regVal.errors = true;

            el.addClass('red');
            el.parent().addClass('invalid');
            return false

        } else {
            el.removeClass('red');
            el.parent().removeClass('invalid');
            return true
        }
    }

    var regVal = {
        errors: false,
        firstName: function () {
            return checkErr($('.reg-firstName'),'/^[a-zA-Zа-яА-Я\.\s]{3,}$/i')
        },
        lastName: function () {
            return checkErr($('.reg-lastName'),'/^[a-zA-Zа-яА-Я\.\s]{3,}$/i')
        },
        email: function () {
            return checkErr($('.req-email'),'/^[a-zA-Z0-9._-]{3,}@[a-zA-Z0-9.-]{3,}\.[a-zA-Z]{2,4}$/i')
        }
    }

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

        'message': function () {

            var ele = $('#message');
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
            jVal.message();
            jVal.sendIt();
        });
        return false;
    });

    $('.reg-submit').click(function () {
        var obj = $.browser.webkit ? $('body') : $('html');
        obj.animate({ scrollTop: $('#save_form').offset().top }, 750, function () {
            if(regVal.firstName() && regVal.lastName() && regVal.email())
            {
                $('#save_form').addClass('_disabled');
                $('#save_form').find('input').attr('disabled','disabled');
                $('.progress').fadeIn(300);
                $('.progress_value').animate({'width': '100%'},1250);
                SendReg()
            }
        });

        return false;
    });

    $(document).keyup(function (e) {
        if (e.keyCode == 13 && e.target.id != "message"){
            var obj = $.browser.webkit ? $('body') : $('html');
            obj.animate({ scrollTop: $('#send_form').offset().top }, 750, function () {
                jVal.errors = false;
                jVal.fullName();
                jVal.phone();
                jVal.email();
                jVal.message();
                jVal.sendIt();
            });
            return false;
        }
    });
    $(document).keyup(function (e) {

    });

    $('.reg-firstName').change(regVal.firstName);
    $('.reg-lastName').change(regVal.lastName);
    $('.req-email').change(regVal.email);

    $('#fullname').change(jVal.fullName);
    $('#phone').change(jVal.phone);
    $('#email').change(jVal.email);
    $('#message').change(jVal.message);

    // ====================================================== //
});
function getRegData()
{
    var obj = {
        rid:'-1:-1',
            firstName: $('.reg-firstName').val(),
        lastName: $('.reg-lastName').val(),
        email: $('.req-email').val()
    }
    return JSON.stringify(obj)
}
 // ===== registration  ==== //
 function SendReg() {
     sendReqRequest = 1;
     $('.reg-submit').hide();
     $.ajax({
             url: 'http://localhost/mail/member/PreRegister',
             type: "POST",
             dataType: 'json',
             crossDomain: true,
             contentType: 'application/json',
             timeout: 10000,
             data: getRegData(),
             success: function (data) {

                 console.log(data);
             },
             error: function (xhr, status) {
                 $('#save_form').removeClass('_disabled');
                 $('#save_form').find('input').attr('disabled','enabled');
             },
             complete: function (jqXHR, textStatus) {
                 $('.good_submit').fadeIn('slow');
                 sendReqRequest = 0;
                 /*$('#mb_content_wrapper').fadeOut('slow', function () {
                     //show confirm

                 });*/
             }
         }
     );
     sendReqRequest = 0;
     $('.reg-submit').show()
     $('.reg-firstName').val('')
     $('.reg-lastName').val('')
     $('.req-email').val('')
 }

// ===== feedback ==== //
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
    //$('.loader-feedback').show();

    var feedback = new Feedback();
    feedback.Category = "Question";
    feedback.Name = $('#fullname').val();
    feedback.Email = $('#email').val();
    feedback.Phone = $('#phone').val();
    feedback.Message = $('#message').val();

    $.ajax({
        url: 'http://nifo.com/services/email.php',
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


                //show confirm
                $('#notification').fadeIn('slow');
                sendEmailRequest = 0;
            });
        }

    }
    );
    sendEmailRequest = 0;
    $('#send').show();
    //$('.loader-feedback').hide();
    $('#fullname').val('');
    $('#email').val('');
    $('#phone').val('');
    $('#message').val('');
}

 function ClosePopup(btn) {
     $('div.overlay').fadeOut('slow');
     $(btn).parents('.notification-popup:first').fadeOut('slow');
 }