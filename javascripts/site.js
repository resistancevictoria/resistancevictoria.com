---
interpolate: true
---

// viewport checker
(function($){
  $.fn.viewportChecker = function(useroptions){
    // Define options and extend with user
    var options = {
      classWhenVisible: 'visible',
      classWhenNotVisible : 'invisible',
      offset: 100,
      repeat: false,
      invertBottomOffset: true,
      callbackFunction: function(elem, action){},
      scrollHorizontal: false
    };
    $.extend(options, useroptions);

    // Cache the given element and height of the browser
    var $elem = this,
    windowSize = {height: $(window).height(), width: $(window).width()},
      scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');

    /*
     * Main method that checks the elements and adds or removes the class(es)
     */
    this.checkElements = function() {
      var viewportStart, viewportEnd;

      // Set some vars to check with
      if(!options.scrollHorizontal) {
        viewportStart = $(scrollElem).scrollTop();
        viewportEnd = (viewportStart + windowSize.height);
      } else {
        viewportStart = $(scrollElem).scrollLeft();
        viewportEnd = (viewportStart + windowSize.width);
      }

      // Loop through all given dom elements
      $elem.each(function() {
        var $obj = $(this), objOptions = {}, attrOptions = {};

        //	Get any individual attribution data
        if ($obj.data('vp-add-class'))
          attrOptions.classWhenVisible = $obj.data('vp-add-class');
        if ($obj.data('vp-remove-class'))
          attrOptions.classWhenNotVisible = $obj.data('vp-remove-class');
        if ($obj.data('vp-offset'))
          attrOptions.offset = $obj.data('vp-offset');
        if ($obj.data('vp-repeat'))
          attrOptions.repeat = $obj.data('vp-repeat');
        if ($obj.data('vp-scrollHorizontal'))
          attrOptions.scrollHorizontal = $obj.data('vp-scrollHorizontal');
        if ($obj.data('vp-invertBottomOffset'))
          attrOptions.invertBottomOffset = $obj.data('vp-invertBottomOffset');

        // Extend objOptions with data attributes and default options
        $.extend(objOptions, options);
        $.extend(objOptions, attrOptions);

        // If class already exists; quit
        if ($obj.hasClass(objOptions.classWhenVisible) && !objOptions.repeat) {
          return;
        }

        // define the start/end positions of the element and include the offset
        // which makes is appear earlier or later
        var elemStart = (!objOptions.scrollHorizontal) ?
          Math.round( $obj.offset().top ) + objOptions.offset :
          Math.round( $obj.offset().left ) + objOptions.offset,
          elemEnd   = (!objOptions.scrollHorizontal) ?
            elemStart + $obj.height() :
            elemStart + $obj.width();

        if (objOptions.invertBottomOffset) elemEnd -= (objOptions.offset * 2);

        // Add class when in viewport
        if ((elemStart < viewportEnd) && (elemEnd > viewportStart)) {
          // trigger once
          if (!$obj.hasClass(objOptions.classWhenVisible)) {
            $obj.removeClass(objOptions.classWhenNotVisible);
            $obj.addClass(objOptions.classWhenVisible);

            // Do the callback function. Callback will send the jQuery object as parameter
            objOptions.callbackFunction($obj, "add");
          }

          // Remove class when not in viewport
        } else {
          // trigger once
          if (!$obj.hasClass(objOptions.classWhenNotVisible)) {
            $obj.removeClass(objOptions.classWhenVisible);
            $obj.addClass(objOptions.classWhenNotVisible);

            // Do the callback function.
            objOptions.callbackFunction($obj, "remove");
          }
        }
      });
    };

    // Run checkelements on load and scroll
    $(window).bind("load scroll touchmove MSPointerMove", this.checkElements);

    // On resize change the height var
    $(window).resize(function(e) {
      windowSize = {height: $(window).height(), width: $(window).width()},
      $elem.checkElements();
    });

    // trigger inital check if elements already visible
    this.checkElements();

    // Default jquery plugin behaviour
    return this;
  };
})(jQuery);

// fittext
(function($){
  $.fn.fitText = function( kompressor, options ) {
    // Setup options
    var compressor = kompressor || 1,
    settings = $.extend({
      'minFontSize' : Number.NEGATIVE_INFINITY,
      'maxFontSize' : Number.POSITIVE_INFINITY
    }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);
    });
  };
})( jQuery );

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
