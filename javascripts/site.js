$(document).ready(function() {
  // cache the window object
  $window = $(window);

  $('section[data-type="background"]').each(function(){
    // declare the variable to affect the defined data-type
    var $scroll = $(this);

    $(window).scroll(function() {
      // HTML5 proves useful for helping with creating JS functions!
      // also, negative value because we're scrolling upwards
      var yPos = -($window.scrollTop() / $scroll.data('speed'));

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
});

$(window).on('resize load', function() {
    $('body').css({"padding-top": $(".navbar").height() + 40 + "px"});
});
