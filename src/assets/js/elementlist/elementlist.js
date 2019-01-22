$(document).ready(function(){
    $('.medvisor-ul-list').MedvisorList();
});

(function($){
    let methods = {
        init : function(options){
            return this.each(function(){
                let $this = $(this), data = $this.data("medvisor");

                if(!data){
                    data = {
                        select_els: [],
                        medvisor_list_multy: false,
                        list_click_hold: false,
                        event_selected: true
                    };
                    $this.data("medvisor", data);

                    $this.disableSelection();
                    $this.find('li:has(ul)').prepend('<div class="drop"></div>');
                    $this.find('div.drop').click(function() {
                        if ($(this).nextAll('ul').css('display')==='none') {
                            $(this).nextAll('ul').slideDown(200);
                            $(this).css({'background-position':'-11px 0'});
                        } else {
                            $(this).nextAll('ul').slideUp(200);
                            $(this).css({'background-position':'0 0'});
                        }
                    });
                    $this.find('ul').slideUp(200).parents('li').children('div.drop').css({'background-position':'0 0'});

                    if($this.is("[data-multiple]")){
                        data.medvisor_list_multy = true;
                    }

                    $("select[name='" + $this.data("select") + "'] option").prop("selected", false);
                    $.each($this.find("li.selected[data-value]"), function (i, el) {
                        $this.MedvisorList("selectItem", $(el));
                    });

                    $this.on("mousedown", function(e){
                        data.list_click_hold = true;
                        e = e.originalEvent;
                        let $el = $(e.target);
                        if(data.medvisor_list_multy && e.ctrlKey && $el.is("li.selected[data-value]")){
                            data.event_selected = false;
                            $this.MedvisorList("unSelectItem", $(el));
                        }else if($el.is("li[data-value]")){
                            data.event_selected = true;
                            if(!e.ctrlKey || !data.medvisor_list_multy){
                                $this.MedvisorList("unSelectAllItems");
                            }
                            $this.MedvisorList("selectItem", $el);
                        }
                    }).on("mouseup", function(){
                        data.list_click_hold = false;
                    }).on("mousemove", function(e){
                        if(!data.list_click_hold || !data.medvisor_list_multy) return false;
                        e = e.originalEvent;
                        let $el = $(e.target);
                        if(data.event_selected){
                            if($el.is("li[data-value]")){
                                $this.MedvisorList("selectItem", $el);
                            }
                        }else{
                            if($el.is("li.selected[data-value]")){
                                $this.MedvisorList("unSelectItem", $el);
                            }
                        }
                    });
                }
            });
        },
        selectItem: function($el){
            let $this = this, data = $this.data("medvisor");

            if($.inArray($el.data("value"), data.select_els) === -1){
                $el.addClass("selected");
                data.select_els.push($el.data("value"));
                $this.MedvisorList("changeSelectList");
            }
            $this.data("medvisor", data);
        },
        unSelectItem: function($el){
            let $this = this, data = $this.data("medvisor");
            $el.removeClass("selected");
            data.select_els.splice($.inArray($el.data("value"), data.select_els), 1);
            $this.MedvisorList("changeSelectList");
            $this.data("medvisor", data);
        },
        unSelectAllItems: function(){
            let $this = this, data = $this.data("medvisor");
            $this.find("li[data-value]").removeClass("selected");
            data.select_els = [];
            $this.data("medvisor", data);
        },
        changeSelectList:function(){
            let $this = this, data = $this.data("medvisor");

            $("select[name='"+$this.data("select")+"'] option").prop("selected", false);
            $.each(data.select_els, function (i, val) {
                $("select[name='" + $this.data("select") + "'] option[value='" + val + "']").prop("selected", true);
            });

            $this.find("li").removeClass("selected-items");
            $.each($this.find("li.selected[data-value]"), function (i, el) {
                let $li_section = $(el).parents("li:not([data-value])");
                if($li_section.find("li.selected[data-value]").length){
                    $li_section.addClass("selected-items");
                }
            });
        }
    };

    $.fn.MedvisorList = function(method){
        if (methods[method]){
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        }else if(typeof method === 'object' || !method){
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' +  method + ' не существует для jQuery.MedvisorList');
        }
    };
})(jQuery);

jQuery.fn.extend({
    disableSelection : function() {
        this.each(function() {
            this.onselectstart = function() { return false; };
            this.unselectable = "on";
            jQuery(this).css({
                '-moz-user-select': 'none',
                '-khtml-user-select': 'none',
                '-webkit-user-select': 'none',
                '-o-user-select': 'none',
                'user-select': 'none'
            });

        });
    },
    enableSelection : function() {
        this.each(function() {
            this.onselectstart = function() {};
            this.unselectable = "off";
            jQuery(this).css({
                '-moz-user-select': 'auto',
                '-khtml-user-select': 'auto',
                '-webkit-user-select': 'auto',
                '-o-user-select': 'auto',
                'user-select': 'auto'
            });
        });
    }
});