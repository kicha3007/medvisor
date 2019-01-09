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

        menuMobileTrigger.on("click", function () {
            var $this = $(this);

            var menuNumber = $this.data("trigger");
            var menuMobileNav = $('[data-it-nav=' + menuNumber + ']');

            $this.toggleClass('active');
            menuMobileNav.toggleClass('active');
            if($this.css("display") === "none") {
                $this.removeClass("active");
            }

        });

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


    /* ------------------- fancybox ------------------- */

    $("[data-fancybox]").fancybox({
        // padding: 0,
        // helpers: {
        //     overlay: {
        //         showEarly : false
        //     }
        // }
    });


});

$("[data-it-info='time']").on("click",  function () {
    $("[data-switch='modal-info2']").click();
});

