;
(function() {

  'use strict';

  var isMobile = {
    Android: function() {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };

  var fullHeight = function() {

    $('.js-fullheight').each(function() {
      let elem = $(this)
      let remove = elem.data().remove;
      let once = elem.data().once;
      if (!remove) {
        remove = 0;
      }
      if (!once) {
        elem.css('height', Math.max(0, $(window).height() - remove));
      }
    });

    $(window).resize(function() {
      $('.js-fullheight').each(function() {
        let elem = $(this)
        let remove = elem.data().remove;
        let once = elem.data().once;
        if (!remove)
          remove = 0;
        if (!once) {
          elem.css('height', Math.max(0, $(window).height() - remove));
        } else {
          elem.css('margin-bottom', Math.max(0, $(window).height() - remove - elem.height()));
        }
      });
    });
  };

  var counter = function() {
    $('.js-counter').countTo({
      formatter: function(value, options) {
        return value.toFixed(options.decimals);
      },
    });
  };


  var counterWayPoint = function() {
    if ($('#colorlib-counter').length > 0) {
      $('#colorlib-counter').waypoint(function(direction) {

        if (direction === 'down' && !$(this.element).hasClass('animated')) {
          setTimeout(counter, 400);
          $(this.element).addClass('animated');
        }
      }, {
        offset: '90%'
      });
    }
  };

  // Animations
  var contentWayPoint = function() {
    var i = 0;
    $('.animate-box').waypoint(function(direction) {

      if (direction === 'down' && !$(this.element).hasClass('animated')) {

        i++;

        $(this.element).addClass('item-animate');
        setTimeout(function() {

          $('body .animate-box.item-animate').each(function(k) {
            var el = $(this);
            setTimeout(function() {
              var effect = el.data('animate-effect');
              if (effect === 'fadeIn') {
                el.addClass('fadeIn animated');
              } else if (effect === 'fadeInLeft') {
                el.addClass('fadeInLeft animated');
              } else if (effect === 'fadeInRight') {
                el.addClass('fadeInRight animated');
              } else {
                el.addClass('fadeInUp animated');
              }

              el.removeClass('item-animate');
            }, k * 200, 'easeInOutExpo');
          });

        }, 100);

      }

    }, {
      offset: '85%'
    });
  };


  var burgerMenu = function() {

    $('.js-colorlib-nav-toggle').on('click', function(event) {
      event.preventDefault();
      var $this = $(this);

      if ($('body').hasClass('offcanvas')) {
        $this.removeClass('active');
        $('body').removeClass('offcanvas');
      } else {
        $this.addClass('active');
        $('body').addClass('offcanvas');
      }
    });



  };

  // Click outside of offcanvass
  var mobileMenuOutsideClick = function() {

    $(document).click(function(e) {
      var container = $("#colorlib-aside, .js-colorlib-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {

        if ($('body').hasClass('offcanvas')) {

          $('body').removeClass('offcanvas');
          $('.js-colorlib-nav-toggle').removeClass('active');

        }

      }
    });

    $(window).scroll(function() {
      if ($('body').hasClass('offcanvas')) {

        $('body').removeClass('offcanvas');
        $('.js-colorlib-nav-toggle').removeClass('active');

      }
    });

  };

  var clickMenu = function() {

    $('#navbar a:not([class="external"])').click(function(event) {
      var section = $(this).data('nav-section'),
        navbar = $('#navbar');

      if ($('[data-section="' + section + '"]').length) {
        $('html, body').animate({
          scrollTop: $('[data-section="' + section + '"]').offset().top - 55
        }, 500);
      }

      if (navbar.is(':visible')) {
        navbar.removeClass('in');
        navbar.attr('aria-expanded', 'false');
        $('.js-colorlib-nav-toggle').removeClass('active');
      }

      event.preventDefault();
      return false;
    });


  };

  // Reflect scrolling in navigation
  var navActive = function(section) {

    var $el = $('#navbar > ul');
    $el.find('li').removeClass('active');
    $el.each(function() {
      $(this).find('a[data-nav-section="' + section + '"]').closest('li').addClass('active');
    });

  };

  var navigationSection = function() {

    var $section = $('section[data-section]');

    $section.waypoint(function(direction) {

      if (direction === 'down') {
        navActive($(this.element).data('section'));
      }
    }, {
      offset: '150px'
    });

    $section.waypoint(function(direction) {
      if (direction === 'up') {
        navActive($(this.element).data('section'));
      }
    }, {
      offset: function() {
        return -$(this.element).height() + 155;
      }
    });

  };

  var sliderMain = function() {

    $('#colorlib-hero .flexslider').flexslider({
      animation: "fade",
      slideshowSpeed: 5000,
      directionNav: true,
      start: function() {
        setTimeout(function() {
          $('.slider-text').removeClass('animated fadeInUp');
          $('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
        }, 500);
      },
      before: function() {
        setTimeout(function() {
          $('.slider-text').removeClass('animated fadeInUp');
          $('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
        }, 500);
      }

    });

  };

  // Document on load.
  $(function() {
    fullHeight();
    counter();
    counterWayPoint();
    contentWayPoint();
    burgerMenu();

    clickMenu();
    // navActive();
    navigationSection();
    // windowScroll();
    mobileMenuOutsideClick();
    sliderMain();

    $(function(){
      $('.selectpickerx').selectpicker();
      var selectElement = $('.selectpickerx')[0];
      selectElement.addEventListener('change', function() {
          changeLang(selectElement.value);
      });
      var userLang = (navigator.language || navigator.userLanguage).split('-')[0];
      selectElement.value = userLang;
      selectElement.dispatchEvent(new Event('change'));
    });
  });
}());

function changeLang(lang) {
  loadTranslations(lang, function(translations) {
    document.querySelectorAll('[data-key]').forEach(el => {
      const key = el.getAttribute('data-key');
      el.innerHTML = translations[key];
      if (key == "download-button") {
        el.href = translations["resume-url"];
      }
    });
    document.documentElement.setAttribute('lang', lang);
  });
}

function loadTranslations(lang, callback) {
  fetch('i18n/' + lang + '.json')
      .then(response => {
          if (!response.ok) {
              throw new Error('Erreur de chargement des traductions');
          }
          return response.json();
      })
      .then(callback)
      .catch(error => console.error('Erreur :', error));
}


function getPopup(id, imgurl = null) {

  Swal.fire({
    html: document.getElementById("infos-" + id).innerHTML,
    imageUrl: imgurl,
    imageHeight: 300,
    imageAlt: 'Logo',
    width: '90%',
    showCloseButton: true,
    showConfirmButton: false,
    background: '#23272A'
  });

  $('.js-fullheight').each(function() {
    let elem = $(this)
    let remove = elem.data().remove;
    let once = elem.data().once;
    if (!remove) {
      remove = 0;
    }
    if (once) {
      elem.css('margin-bottom', Math.max(0, $(window).height() - remove - 35 - elem.height()));
    }
  });

  $('.swal2-popup .info-table').attr('id', 'table-' + id)

  $('#table-' + id).DataTable();

  $('.swal2-popup').focus();

};

$('.docsbots').on('click', function(e) {
  Swal.fire({
  width: 600,
  html: "<div class='botimgs'><figure class='btn hover animation'><a href='https://watorabot.github.io'><img class='botwatora' src='./images/watora.png'/><figcaption class='figcapwatora'> Watora </figcaption></a></figure><figure class='btn hover animation'><a href='https://meetcord.github.io'><img class='botmeet' src='./images/meetcord.png'/><figcaption class='figcapmeet'> meetcord </figcaption></a></figure></div>",
  imageWidth: 500,
  imageAlt: 'My bots',
  background: '#202225',
  showCloseButton: true,
  showCancelButton: false,
  showConfirmButton: false,
  })
});