$(document).ready(function () {
  // Text Slider
  const items = $(".text-slider li");
  if (items.length) {
    const textArray = items.map(function () {
      return $(this).text().trim();
    }).get();
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 150;
    const deletingSpeed = 80;
    const delayBetweenWords = 1500;

    function typeEffect() {
      const $typeEl = $("#typewriter");
      if (!$typeEl.length) return;

      const currentText = textArray[textIndex];
      $typeEl.text(
        isDeleting
          ? currentText.substring(0, charIndex--)
          : currentText.substring(0, charIndex++)
      );

      if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => (isDeleting = true), delayBetweenWords);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
      }

      setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
    }

    typeEffect();
  }

  // LightBox
  var currentIndex = 0;
  var images = [];

  // sab tabs ke andar jitne bhi images hain, sabko select karo
  $(document).on("click", ".tab-pane img", function () {
    images = $(this).closest(".tab-pane").find("img"); // us tab ke images lo
    currentIndex = images.index(this);

    $("#custom-lightbox .lb-img").attr("src", $(this).attr("src"));
    $("#custom-lightbox").fadeIn();
  });

  // close button
  $(".lb-close").click(function () {
    $("#custom-lightbox").fadeOut();
  });

  // prev button
  $(".lb-prev").click(function () {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    $("#custom-lightbox .lb-img").attr("src", $(images[currentIndex]).attr("src"));
  });

  // next button
  $(".lb-next").click(function () {
    currentIndex = (currentIndex + 1) % images.length;
    $("#custom-lightbox .lb-img").attr("src", $(images[currentIndex]).attr("src"));
  });

  // background click par close
  $("#custom-lightbox").click(function (e) {
    if (e.target === this) {
      $(this).fadeOut();
    }
  });


  // Read More Button
  $('.testimonial-card').each(function () {
    var $card = $(this);
    var $desc = $card.find('.description');
    var $btn = $card.find('.read-more-btn');

    $btn.on('click', function () {
      $desc.toggleClass('expanded');
      $btn.text($desc.hasClass('expanded') ? 'Show Less' : 'Read More');
    });
  });


  // Testimonial Slider
  $('.testimonial-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    infinite: true,
    speed: 400,
    prevArrow: '<button class="slick-prev custom-arrow"><span>&larr;</span></button>',
    nextArrow: '<button class="slick-next custom-arrow"><span>&rarr;</span></button>',

    responsive: [
      {
        breakpoint: 992, // Tablet
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 576, // Mobile
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

});
