/* ****************************** accordion ****************************** */
function startCarousel() {

    $('[data-owl-carousel]').each(function () {
        var $this = $(this);
        var itemsCount = $this.data("owlItems");
        var itemsCountPad = $this.data("owlItemsPad");
        var itemsMargin = $this.data("owlItemsMargin");
        var itemsDots = $this.data("owlItemsDots");
        var itemsLoop = $this.data("owlItemsLoop");
        var itemsNav = $this.data("owlItemsNav");
        var itemsAutoplay = $this.data("owlItemsAutoplay");
        var itemsAutoplayTimeout = $this.data("owlItemsAutoplayTimeout");
        var itemsAutoplayHoverPause = $this.data("owlItemsAutoplayHoverPause");

        $this.owlCarousel({
            items: (itemsCount ? itemsCount : 1),
            margin: (itemsMargin ? itemsMargin : 20),
            nav: (itemsNav ? itemsNav : true),
            loop: (itemsLoop ? itemsLoop : true),
            autoplay: (itemsAutoplay ? itemsAutoplay : false),
            autoplayTimeout: (itemsAutoplayTimeout ? itemsAutoplayTimeout : 3000),
            autoplayHoverPause: (itemsAutoplayHoverPause ? itemsAutoplayHoverPause : false),
            dots: (itemsDots ? itemsDots : true),
            navSpeed: 1000,
            dotsSpeed: 1000,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: itemsCountPad ? itemsCountPad : (itemsCount ? itemsCount : 1)
                },
                1000: {
                    items: itemsCount ? itemsCount : 1
                }
            }
        });
    });

}

$(function () {

    startCarousel();


    /* ------------------- ajax ------------------- */

    $(document).on("submit", "[data-it-form]", function (e) {
        e.preventDefault();
        var $form = $(this);
        var $data = new FormData($form[0]);
        $.post(
            {
                url: $form.attr("action"),
                data: $data,
                dataType: "json",
                timeout: 30000,
                processData: false,
                contentType: false,
                success: function (data) {
                    $form.addClass("success");
                    $form.find($(".it-form__success")).html(data.message);
                },

                error: function () {
                    $form.addClass("success");
                    $form.find($(".it-form__success")).html("Извините, временные проблемы на сервере, попробуйте ещё раз!");
                }
            }
        )
    });

    /* ------------------- switcher ------------------- */


    var tabButton = $("[data-switch]");

    tabButton.on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        $(this).closest("[data-switch-wrap]").find(".active").removeClass("active");
        $(this).parent().addClass("active");

        var target = $(this).data("switch");

        var dataTabValue = ("[data-tab='" + target + "']");

        $(dataTabValue).closest("[data-tabs-wrap]").find(".active").removeClass("active");

        var dataValue = $(dataTabValue).addClass("active");

        var pos = $(dataValue).position();
    });






    /* ****************************** dropdown-menu ****************************** */
    (function(){

        var menuMobileTrigger = $('[data-trigger]');

        function toggleMenuDropdown (){
            var $this = menuMobileTrigger;

            var menuNumber = $this.data("trigger");
            var menuMobileNav = $('[data-it-nav=' + menuNumber + ']');

            var overlay = $("<div/>", {
                css: {
                    display: "block",
                    position: "fixed",
                    top: "0",
                    left: "0",
                    right: "0",
                    bottom: "0",
                    width: "100%",
                    height: "100%",
                    "background-color": "rgba(0, 0, 0, 0.5)",
                    "background-size": "cover",
                    "z-index": "2",
                    "max-height": "100%"
                },
                class: "it-overlay"
            });

            $this.toggleClass('active');
            menuMobileNav.toggleClass('active');
            $("body").toggleClass("modal-open");

            if ($(".it-overlay").length <= 0 ) {
                $("body").append(overlay);
            } else {
              $(".it-overlay").remove();
            }

            if($this.css("display") === "none") {
                $this.removeClass("active");
                $("body").remove(overlay);
            }
        };

            $("body").on("click", ".it-overlay", function () {
                toggleMenuDropdown();
            });

           menuMobileTrigger.on("click", toggleMenuDropdown);

    })();

    (function () {

        var logo =  $('[data-logo]');
        function mediaTransferBlocks(mediaSizeDescktop) {

            if (mediaSizeDescktop.matches) {
                logo.prependTo($("[data-header-top-half-left]"));

            } else {
                logo.prependTo($("[data-header-bottom-size-1]"));
            }
        }

        if(logo.length) {
            var mediaSizeDescktop = window.matchMedia("screen and (max-width: 768px)");
            mediaSizeDescktop.addListener(mediaTransferBlocks);
            mediaTransferBlocks(mediaSizeDescktop);
        }

    })();


    (function(){

        var swiperContainersX = $('[data-scroll-wrap-x]');
        var swiper;

            function startSwiper() {

            $.each(swiperContainersX, function(indx, value){
                var $this = $(value);

                var swiperContainersXwidth = +$this.get(0).scrollWidth - +$this.get(0).clientWidth;

                if (swiperContainersXwidth && !$this.hasClass("swiper-container-horizontal") ) {

                    swiper = new Swiper('.swiper-container', {
                        scrollbar: {
                            el: '.swiper-scrollbar'
                        },
                        freeMode: true,
                        slidesPerView: 'auto',
                        // width: 60
                    });

                } else if ($this.hasClass("swiper-container-horizontal") && !swiperContainersXwidth) {
                    swiper.destroy();
                };
            });
        };

        $(window).on('load resize', function () {
            startSwiper();
        });

    })();

    (function() {

        var data = ['екатеринбург', 'Саратов', 'МосКва', 'Нижний новгород', 'свердловск', 'Сочи', 'крым', 'оРенБург', 'ЧеляБинск'];
        var b = [];
        var c = [];
        var iToggle = 0; // i для turn

        var cityList = $('[data-city-list]');
        var cityInput = $('[data-city-input]');
        var cityLabel = $('[data-city-label]');
        var cityListWrap = $("[data-city-list-wrap]");
        var cityInnerWrap = $("[data-city-inner-wrap]");

        // cityListWrap.hide(); // скрываем список

        $.each(data, function (i) {	// формируем список в div
            var lwrList = data[i].toLowerCase(); // массив в нижний регистр
            b[i] = '<li class="it-city__item" data-city-item id="' + lwrList + '">' + lwrList + '</li>';
            /* id делает уникальным каждый блок при клике
             и будет использоваться в поиске совпадений */
        });
        cityList.html(b); // помещаем весь массив в родительский div


        cityInput.focus(function () {
            reset();
            checking();

        }); // очищаем input для новых значений при каждом клике

        cityInnerWrap.mousedown( function () {
            if (iToggle == 0) {
                turnDown();
            } else {
                turnUp();
            }

        });


            var overlay = $("<div/>", {
                css: {
                    display: "block",
                    position: "fixed",
                    top: "0",
                    left: "0",
                    right: "0",
                    bottom: "0",
                    width: "100%",
                    height: "100%",
                    "background-color": "transparent",
                    "background-size": "cover",
                    "z-index": "2",
                    "max-height": "100%"
                },
                class: "it-overlay-transparent"
            });



        function checking() {
            $('[data-city-item]').on("click", function () {
                cityInput.val($(this).html());
                cityLabel.text($(this).html());
                turnUp();
            });
        };
        checking();

        function reset() {
            cityInput.val('');
            cityList.html(b);
        };

    // сворачивание
        function turnUp() {
            $('[data-city-array]').removeClass("active");
            cityListWrap.slideUp(200);
            $(".it-overlay-transparent").remove();
            iToggle = 0;
        };
        function turnDown() {
            $('[data-city-array]').addClass("active");
            cityListWrap.slideDown(200);
            $("body").append(overlay);
            iToggle = 1;
        };
        $("body").on("click", ".it-overlay-transparent", function () {
            $(".it-overlay-transparent").remove();
            turnUp()
        })

    // поиск совпадений
        function search() {
            turnDown();
            setTimeout(function () {
                // для регистра
                var lwrSrch = cityInput.val().toLowerCase();
                if ($('[data-city-item][id*="' + lwrSrch + '"]')[0] != null) {
                    $('[data-city-item][id*="' + lwrSrch + '"]').each(function (i) {
                        c[i] = '<li class="it-city__item" data-city-item id="' + $(this).attr('id') +
                            '">' + $(this).attr('id') + '</li>';

                    });
                    cityList.html(c);
                    c = [];
                    checking();
                } else {
                    if (cityInput.val() != '') {
                        cityList.html('');
                        checking();
                    } else {
                        reset();
                        checking();
                    }
                    ;
                }
                ;
            }, 50); // ожидание во избежание ошибок
        };


            cityInput.keyup(function (eventObject) {
                if (eventObject.key == 'Shift' ||
                    eventObject.key == 'Control') {
                    return false
                } else {
                    search();
                }
                ;
                // keypress не определяется смартфонами, потому keyup
            });



/*
    setTimeout(function () {
        cityListWrap.
            swiper1 = new Swiper('.swiper-container-vertical', {
            scrollbar: {
                el: '.swiper-scrollbar2'
            },
            direction: "vertical",
            freeMode: true,
            slidesPerView: 'auto',
            mousewheel: true,
            height: 200
        });
    }, 50);*/

    })();


    var buttonTimeWork = $("[data-it-info]");

    buttonTimeWork.on("click", function () {
        var $this = $(this);

        var thisData = $this.data("it-info");
        $("[data-switch='" +  thisData +  "']").click();
    });


    $("[data-fancybox]").fancybox({
        padding: 0,
        helpers: {
            overlay: {
                locked: false
            }
        }
    });


});

