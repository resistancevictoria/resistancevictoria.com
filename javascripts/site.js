---
interpolate: true
---
$(document).ready(function() {
  // cache the window object
  $window = $(window);

  $('.pancol_1').addClass("animated fadeOutLeft").viewportChecker({
    classWhenVisible: 'fadeInLeft',
    classWhenNotVisible: 'fadeOutLeft',
    repeat: true,
    offset: 100
  });

  $('.pancol_2').addClass("animated fadeOut").viewportChecker({
    classWhenVisible: 'fadeIn',
    classWhenNotVisible: 'fadeOut',
    repeat: true,
    offset: 200
  });

  $('.pancol_3').addClass("animated fadeOutRight").viewportChecker({
    classWhenVisible: 'fadeInRight',
    classWhenNotVisible: 'fadeOutRight',
    repeat: true,
    offset: 100
  });

  $('section[data-type="background"]').each(function(){
    // declare the variable to affect the defined data-type
    var $scroll = $(this);

    $(window).scroll(function() {
      // HTML5 proves useful for helping with creating JS functions!
      // also, negative value because we're scrolling upwards
      var yPos = 0 - ($window.scrollTop() / $scroll.data('speed'));

			if (yPos < -600) yPos = -600;

      // background position
      var coords = '50% '+ yPos + 'px';

      // move the background
      $scroll.css({ backgroundPosition: coords });
    }); // end window scroll
  });  // end section function

  $("a").click(function() {
    link_host = this.href.split("/")[2];
    document_host = document.location.href.split("/")[2];

    if (link_host != document_host) {
      window.open(this.href);
      return false;
    }
  });

	$("#motcontainer").fitText();
  setInterval(showMotto, #{site.mottoDelay});
});

$(window).on('resize load', function() {
    $('body').css({"padding-top": $(".navbar").height() + 40 + "px"});
});

var mottos = #{site.mottos};
var motto = 0;

function showMotto() {
	motto = motto + 1;
  $('#mottopre').removeClass('animated fadeInDown');
  $('#mottopre').addClass('animated fadeOutDown');
  $('#mottopre').one(
    'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
    function() {
      $('#mottopre').html(mottos[motto%mottos.length][0]);
      $('#mottopre').removeClass('animated fadeOutDown');
      $('#mottopre').addClass('animated fadeInDown');
    }
  );

  $('#mottopost').removeClass('animated fadeInUp');
  $('#mottopost').addClass('animated fadeOutUp');
  $('#mottopost').one(
    'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
    function() {
      $('#mottopost').html(mottos[motto%mottos.length][1]);
      $('#mottopost').removeClass('animated fadeOutUp');
      $('#mottopost').addClass('animated fadeInUp');
    }
  );
}
