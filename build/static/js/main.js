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




    /* ****************************** change-city ****************************** */


    var cityChange = $("[data-it-change-city]");
    var cityFrom = $("[data-it-city-from]");
    var cityTo = $("[data-it-city-to]");

    cityChange.on("click", function(){
        var cityFromVal = cityFrom.val();
        cityFrom.data("it-city-from", cityFromVal);
        var cityFromData = cityFrom.data("it-city-from");


        var cityToVal = cityTo.val();
        cityTo.data("it-city-to", cityToVal);
        var cityToData = cityTo.data("it-city-to");

        cityFrom.val(cityToData);
        cityTo.val(cityFromData);
    });


    /* ****************************** city-width-input ****************************** */


    var $input = $('[data-it-city]'),
        $buffer = $('[data-it-city-buffer]'),
        cityInputChangeButton = $("[data-it-city-input-change]");

    $input.on('input', function() {
        $buffer.text($input.val());
        $input.width($buffer.width());
        cityInputChangeButton.css("position", "absolute");
    });

    $input.focusout(function () {
        if ($buffer.text() === "" ) {
            $input.css("width", "110px");
            cityInputChangeButton.css("position", "static");
        }
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

        var a = ['плоские', 'Маленькие', 'срЕДние', 'большие', 'подтянутые', 'обвисшие', 'с маленькими сосками', 'с болЬшими сосками', 'гладкие', 'с пупырышками', 'чувствительные', 'нечувствительные'];
        var b = [];
        var c = [];
        var i = 0; // i для turn
        $('#list').hide(); // скрываем список

        $.each(a, function (i) {	// формируем список в div
            var lwrList = a[i].toLowerCase(); // массив в нижний регистр
            b[i] = '<div class="list" id="' + lwrList + '">' + lwrList + '</div>';
            /* id делает уникальным каждый блок при клике
             и будет использоваться в поиске совпадений */
        });
        $('#list').html(b); // помещаем весь массив в родительский div

        $('input').focus(function () {
            reset();
            checking();
        }); // очищаем input для новых значений при каждом клике

        function checking() {
            $('.list').click(function () {
                $('input').val($(this).html());
                turnUp();
            });
        };
        checking();

        function reset() {
            $('input').val('');
            $('#list').html(b);
        };

// сворачивание
        function turnUp() {
            $('.array').html('&#9660;');
            $('#list').slideUp(200);
            i = 0;
        };
        function turnDown() {
            $('.array').html('&#9650;');
            $('#list').slideDown(200);
            i = 1;
        };

        $('.array').click(function () {
            if (i == 0) {
                turnDown();
            } else {
                turnUp();
            }
            ;
        });

// поиск совпадений
        function search() {
            turnDown();
            setTimeout(function () {
                // для регистра
                var lwrSrch = $('input').val().toLowerCase();
                if ($('[id*="' + lwrSrch + '"]')[0] != null) {
                    $('[id*="' + lwrSrch + '"]').each(function (i) {
                        c[i] = '<div class="list" id="' + $(this).attr('id') +
                            '">' + $(this).attr('id') + '</div>';
                        i++;
                    });
                    $('#list').html(c);
                    c = [];
                    checking();
                } else {
                    if ($('input').val() != '') {
                        $('#list').html('');
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

        $('input').keyup(function (eventObject) {
            if (eventObject.key == 'Shift' ||
                eventObject.key == 'Control') {
                return false
            } else {
                search();
            }
            ;
            // keypress не определяется смартфонами, потому keyup
        });



    })();


});

