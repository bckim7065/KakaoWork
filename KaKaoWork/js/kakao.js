var chkPos = false;
var items;
var chkPosAbs = false;
var chkPosFix = false;
var chkItmes = new Array();
var timer = null;

$(document).ready(function(){
    // slick slide 
    $('.wrap_slide').slick({
            autoplay : false,
            dots: true,
            speed : 300,
            infinite: true,
            autoplaySpeed: 3000 ,
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: false
        });
    
    // slick slide method
    $('.wrap_slide').on('afterChange', function(event, slick, currentSlide, nextSlide){
        var currentSlide = $('.wrap_slide').slick('slickCurrentSlide');
        
        if (currentSlide == 1) {
            $('.doc-header').addClass('second_slide');
        } else {
            $('.doc-header').removeClass('second_slide');
        }
    });

    $(window).on('scroll', function(){
        scrollFun();
    });
    
    $(window).on('resize', function(){
        scrollFun();
        if (!timer) {
            setTimeout(function(){
                timer = null;
                scrollFun();
            }, 100)
        }
    });

    items = $('.item_img');
    
    // 이미지 체크 초기화
    for (var j = 0; j < items.length; j++) {
        chkItmes[j] = false;
    }

    $('.btn_cowork li').on('click', function(e){
        var coworkElem = $('.btn_cowork li');
        var serviceElem = $('.wrap_cowork .cont_service .inner_service');

        for (var i = 0; i < coworkElem.length; i++) {
            if(coworkElem[i] == this) {
                $(coworkElem[i]).children().addClass('on');
                $(serviceElem[i]).addClass('on');
            } else {
                $(coworkElem[i]).children().removeClass('on');
                $(serviceElem[i]).removeClass('on');
            }   
        }

    });

    $('.btn_manager li').on('click', function(e){
        var managerElem = $('.btn_manager li');
        var serviceElem = $('.wrap_manager .cont_service .inner_service');

        for (var i = 0; i < managerElem.length; i++) {
            if(managerElem[i] == this) {
                $(managerElem[i]).children().addClass('on');
                $(serviceElem[i]).addClass('on');
            } else {
                $(managerElem[i]).children().removeClass('on');
                $(serviceElem[i]).removeClass('on');
            }   
        }
    });

    $('.btn_relation').on('click', function(e){
        $('.list_relation').toggleClass('on');
    });

    // markOn ScrollTop 
    var arrLinkfuncSc = [1464, 2317, 3169, 5080, 5970];

    $('.link_func').click(function(e) {
        e.preventDefault();

        var nIndex = $('.link_func').index(this);
        scrollTo(0, arrLinkfuncSc[nIndex]);
    });
});

function init() {
    
}

function scrollFun() {
    var scrollTop = $(document).scrollTop();   
    var wrapInfoElem = $('.wrap_info');
    var sectionDescElem = $(".content-home .section_desc");
    var windowWidth = window.innerWidth;
    var descEmphElem = $(".content-home .desc_emph");
    var descImgElem = $(".content-home .desc_img");
    var pageXOffset = window.pageXOffset;
    var headerElem = $(".inner_header"); 
    var groupWorkElem = $(".group_work");
    var groupSearchkElem = $(".group_search");
    var groupConnectElem = $(".group_connect");
    var wrapCoworkElem = $(".wrap_cowork");
    var wrapManagerElem = $(".wrap_manager");
    var wrapProductElem = $(".wrap_product");
    var wrapAssistElem = $(".wrap_assist");
    var sectionSecure = $(".section_secure");
    var markOnElem = $('.mark_on');
    var descEmphEmElem = $(".section_desc .desc_emph em");
    
    // Header Check
    if (scrollTop > 0) {
        $('.doc-header').addClass('scroll_header');
    } else {
        $('.doc-header').removeClass('scroll_header');
    }

    headerElem.css("transform", "translateX(" + -pageXOffset + "px)");

    if (scrollTop > 6300 && scrollTop <= 6670) {
        var matxVal = (((scrollTop / 14) - 450) / 100).toFixed(3);
        var opacity = (((scrollTop / 14) - 450) / 100).toFixed(3);
        var styleMatrix = 'matrix(' + matxVal + ', 0, 0,' + matxVal + ', 0, 0)';
        
        descEmphElem.css("transform", "translateX(0)");

        descImgElem.css('transform', styleMatrix + "translateX(0)");
        descImgElem.css('top', sectionDescElem.height() / 4 - 300);
        descImgElem.css('position', 'absolute');
        descImgElem.css('bottom', 'auto');
        descImgElem.css('left', windowWidth < 1200 ? -200 : windowWidth / 2 - 800);
        descImgElem.css('opacity', opacity);

        descEmphEmElem.css('opacity', opacity);
    } else if (scrollTop > 6670 && scrollTop < 8000) {
        var matxVal = (((scrollTop / 14) - 450) / 100).toFixed(3) > 1 ? 1 : (((scrollTop / 14) - 450) / 100).toFixed(3);
        var opacity = (((scrollTop / 14) - 450) / 100).toFixed(3);
        var styleMatrix = 'matrix(' + matxVal + ', 0, 0,' + matxVal + ', 0, 0)';
        
        descEmphElem.css("position") == "fixed" ? descEmphElem.css("transform", "translateX(" + -pageXOffset + "px)") : descEmphElem.css("transform", "translateX(0)");

        descImgElem.css('transform', styleMatrix + " translateX(" + -4.5*(1 - matxVal)*pageXOffset + "px)");
        descImgElem.css('top', sectionDescElem.height() / 4 - 300);
        descImgElem.css('position', 'fixed');
        descImgElem.css('bottom', 'auto');
        descImgElem.css('left', windowWidth < 1200 ? -200 : windowWidth / 2 - 800);
        descImgElem.css('opacity', opacity);

        descEmphEmElem.css('opacity', opacity);
    } else {
        descEmphElem.css("transform", "translateX(0)");
        descImgElem.css('transform', styleMatrix + "translateX(0)");

        descImgElem.css('opacity', 0);
        descEmphEmElem.css('opacity', 0);
    }

    // Position Check
    if (scrollTop >= 7670) {
        descEmphElem.css('position', 'absolute'); 
        descEmphElem.css('top', 'auto'); 
        descEmphElem.css('bottom', '359px'); 

        descImgElem.css('position', 'absolute'); 
        descImgElem.css('left', '151.5px'); 
        descImgElem.css('top', 'auto');
        descImgElem.css('bottom', '102.5px'); 
    } else if (scrollTop >= 6670 && scrollTop < 7670) {
        descEmphElem.css('position', 'fixed'); 
        descEmphElem.css('top', '421.5px'); 
        descEmphElem.css('bottom', 'auto'); 
    } else {
        descEmphElem.css('position', 'absolute'); 
        descEmphElem.css('top', '421.5px'); 
        descEmphElem.css('bottom', 'auto'); 
    }

    if (!chkPosAbs && (scrollTop >= 5941 && scrollTop <= 6550)) {
        chkPosAbs = true;
        chkPosFix = false;

        wrapInfoElem.css('position', 'absolute'); 
        wrapInfoElem.css('top', '2598px'); 
    } else if (!chkPosFix && (scrollTop >= 5071 && scrollTop <= 5940)) {
        chkPosAbs = false;
        chkPosFix = true;

        wrapInfoElem.css('position', 'fixed'); 
        wrapInfoElem.css('top', '-1802px'); 
    } else if (!chkPosAbs && (scrollTop >= 3200 && scrollTop <= 5070))  {
        chkPosAbs = true;
        chkPosFix = false;

        wrapInfoElem.css('position', 'absolute'); 
        wrapInfoElem.css('top', '1732px'); 
    } else if (!chkPosFix && (scrollTop >= 1464 && scrollTop < 3200)) {
        chkPosAbs = false;
        chkPosFix = true;

        wrapInfoElem.css('position', 'fixed'); 
        wrapInfoElem.css('top', '70px'); 
    } else if (!chkPosAbs && scrollTop < 1464) {
        chkPosAbs = true;
        chkPosFix = false;

        wrapInfoElem.css('position', 'absolute'); 
        wrapInfoElem.css('top', '0px'); 
    }

    if (chkPosFix) {
        groupWorkElem.css("transform", "translateX(" + -pageXOffset + "px)");
        groupSearchkElem.css("transform", "translateX(" + -pageXOffset + "px)");
        groupConnectElem.css("transform", "translateX(" + -pageXOffset + "px)");
    } else {
        groupWorkElem.css("transform", "translateX(0)");
        groupSearchkElem.css("transform", "translateX(0)");
        groupConnectElem.css("transform", "translateX(0)");
    }

    // Image Check
    if (!chkItmes[5] && scrollTop >= 5521) { 
        enableActive(items, 5);
        markOnElem.css('transform', 'translateY(37px)');
    } else if (!chkItmes[4] && (scrollTop >= 4651 && scrollTop <= 5520)) {
        enableActive(items, 4);
        markOnElem.css('transform', 'translateY(0)');
    } else if (!chkItmes[3] && (scrollTop >= 3711 && scrollTop <= 4650)) { 
        enableActive(items, 3);
    } else if (!chkItmes[2] && (scrollTop >= 2781 && scrollTop <= 3710)) {
        enableActive(items, 2);
        markOnElem.css('transform', 'translateY(74px)');
    } else if (!chkItmes[1] && (scrollTop >= 1860 && scrollTop <= 2780)) {
        enableActive(items, 1);
        markOnElem.css('transform', 'translateY(37px)');
    } else if (!chkItmes[1] && (scrollTop >= 1850 && scrollTop < 1860)) {
        enableActive(items, 1);
        markOnElem.css('transform', 'translateY(37px)');
    } else if (!chkItmes[0] && scrollTop < 1830) {
        enableActive(items, 0);
        markOnElem.css('transform', 'translateY(0)');
    } 

    // fade-in Start
    // cowork
    if (scrollTop >= 8000 && scrollTop <= 10250) {
        wrapCoworkElem.css('transform', 'translateY(0)');
        wrapCoworkElem.css('opacity', '1');
    } else {
        wrapCoworkElem.css('transform', 'translateY(50px)');
        wrapCoworkElem.css('opacity', '0');
    }

    // manager
    if (scrollTop >= 9500 && scrollTop <= 11580) {
        wrapManagerElem.css('transform', 'translateY(0)');
        wrapManagerElem.css('opacity', '1');
    } else {
        wrapManagerElem.css('transform', 'translateY(50px)');
        wrapManagerElem.css('opacity', '0');
    } 

    // product
    if (scrollTop >= 11000 && scrollTop <= 12500) {
        wrapProductElem.css('transform', 'translateY(0)');
        wrapProductElem.css('opacity', '1');
    } else {
        wrapProductElem.css('transform', 'translateY(50px)');
        wrapProductElem.css('opacity', '0');
    }

    // assist
    if (scrollTop >= 11900 && scrollTop <= 13300) {
        wrapAssistElem.css('transform', 'translateY(0)');
        wrapAssistElem.css('opacity', '1');
    } else {
        wrapAssistElem.css('transform', 'translateY(50px)');
        wrapAssistElem.css('opacity', '0');
    }

    // secure
    if (scrollTop >= 12600 && scrollTop <= 14600) {
        sectionSecure.css('transform', 'translateY(0)');
        sectionSecure.css('opacity', '1');
    } else {
        sectionSecure.css('transform', 'translateY(50px)');
        sectionSecure.css('opacity', '0');
    }
    // fade-in End
}

function enableActive(element, index) {
    for (var i = 0; i < element.length; i++) {
        if (index == i) {
            $(items[i]).addClass('item_active');
            chkItmes[i] = true;
        } else {
            chkItmes[i] = false;
            $(items[i]).removeClass('item_active');
        }
    }
}