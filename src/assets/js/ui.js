$(document).ready(function()
{
    /* HEADER SLIDER */
    var $search_bg = $('.search-bg');

    if($search_bg.jquery) {
        var $i = 0,
            $i_max = 7;

        setIntervalAndExecute(function() {
            if($i < $i_max) {
                $i++;
            } else {
                $i = 1;
            }

            if($i == 1) {
                $search_bg.removeClass('search-bg__' + $i_max + '-active');
            } else {
                $search_bg.removeClass('search-bg__' + ($i-1) + '-active');
            }

            setTimeout(function(){
                $search_bg.removeClass('search-bg__animate');
                $search_bg.removeClass('search-bg__' + ($i-1));

                if($i == 1) {
                    $search_bg.removeClass('search-bg__' + $i_max);
                }

                $search_bg.addClass('search-bg__' + $i + ' search-bg__' + $i + '-active');
            },400);

            setTimeout(function(){
                if(!$search_bg.hasClass('search-bg__animate'))
                    $search_bg.addClass('search-bg__animate');
            },500);
        },6000);

        $search_bg.addClass('search-bg__animate');
    }

    /* TAB ACTIVE ACTION */
    $('.nav-tabs a').on('click', function () {
        $(this).parent('li').parent('ul').find('li.active').removeClass('active');
        $(this).parent('li').parent('ul').find('a.active').removeClass('active').removeClass('show');
        $(this).parent('li').addClass('active');
    });

    $('.btn-tab-next').click(function(e){
        e && e.preventDefault();
        $(this).parent().parent().parent().find('.nav-tabs > .active').next('li').find('a').trigger('click');
    });

    $('.btn-tab-prev').click(function(e){
        e && e.preventDefault();
        $(this).parent().parent().parent().find('.nav-tabs > .active').prev('li').find('a').trigger('click');
    });

    /* LOADERS */
    BX.showWait = function(node, msg) {
       $(node).addClass('action-load');
    };

    BX.closeWait = function(node, obMsg) {
        $(node).removeClass('action-load');
    };

    /* HIDE CONTENTS */
    $('.more-link-content').on('click', function(event){
        event && event.preventDefault();

        var id  = $(this).attr('href'),
            top = $(id).offset().top - 45,
            toggleClass = 'short-content-s1';

        if( $(this).parent().hasClass(toggleClass) ) {

            $('body,html').animate({scrollTop: top}, 500);
            $(this).html('Скрыть<i class="zmdi zmdi-chevron-up"></i>');

        } else {
            $(this).html('Показать больше<i class="zmdi zmdi-chevron-down"></i>');
        }

        $(this).parent().toggleClass(toggleClass);
        $(this).toggleClass('active');
    });

    /* CLICKED BLOCKS */
    var $clickableBlock = $('.clickable-block');

    $clickableBlock.on('click', function() {
        window.location = $(this).find("a.clickable-link").attr("href");
    });
});