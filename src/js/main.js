jQuery(function ($) {
  $(document).ready(function () {
  //nav
    $(".header .nav ul li").clone().appendTo(".header .holder-content").wrapAll('<ul class="nav-mob"></ul>');
    $(".btn-mob").click(function (e) {
      e.preventDefault();
      e.stopPropagation();
      $(this).toggleClass("active");
      $(".header .nav-mob").slideToggle();
    });
    $('.header .nav-mob').click(function(e){
      e.stopPropagation();
    });
    $("body").click(function () {
      $(".btn-mob").removeClass('active');
      $(".header .nav-mob").slideUp();
    });

    //scroll
    $(window).scroll(function () {
      var height = $(window).scrollTop();
      if (height > 50) {
        $(".header").addClass("header-fixed");
      } else {
        $(".header").removeClass("header-fixed");
      }
    });
    $('.brn-scroll[href^="#"]').click(function () {
      var anchor = $(this).attr("href");
      $("html, body").animate({ scrollTop: $(anchor).offset().top }, 600);
    });

    //select
    $( ".select" ).selectmenu();
    //datepicker
    $( ".datepicker" ).datepicker({
      dateFormat: 'mm/dd'
    });
    //validate form
    $('.validate').submit(function(e) {
      var err = false,
      current=$(this);
        current.find('input[type=email]').each(function() {
          var patternMail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
          if(!patternMail.test($(this).val()) || $(this).val()==''){
            err = true;
            $(this).addClass('error');
            
          } else {
            $(this).removeClass('error');       
          }
        });
        current.find('input[type=tel]').each(function() {
          var pattern = /^[0-9]*$/;
          if(!pattern.test($(this).val()) || $(this).val().length<1){
            err = true;
            $(this).addClass('error');
          } else {
            $(this).removeClass('error');
          }
        });
        current.find('.input-text').each(function() {
          var pattern = /([A-Za-z])/;
          if(!pattern.test($(this).val()) || $(this).val().length<2){
            err = true;
            $(this).addClass('error');
          } else {
            $(this).removeClass('error');
          }
        });
        current.find('.datepicker').each(function() {        
          if($(this).val().length<2){
            err = true;
            $(this).addClass('error');
          } else {
            $(this).removeClass('error');
          }
        });
        current.find('select').each(function() {
          if ($(this).val()=='' || $(this).val()=='null') {
            err=true;
            $(this).next('.ui-selectmenu-button').addClass('error');
          } else {
            $(this).next('.ui-selectmenu-button').removeClass('error');
          }
        });
        
        if (err) {
          e.preventDefault();
        }
      });
      //slider
      $('.slider-footer').slick({
        dots: true,
        infinite: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2500,
      });
  });
});
