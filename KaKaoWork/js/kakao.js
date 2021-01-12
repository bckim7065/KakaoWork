 var timer = null;

        $(document).ready(function(){
            addWindowEvent();
            addSlickSlideEvent();
            addClickEventToElem();
        });

        function addWindowEvent() {
            $(window).on('scroll', function(){
                scrollFun();

                if (!timer) {
                    setTimeout(function(){
                        timer = null;
                        scrollFun();
                    }, 50)
                }
            });
            
            $(window).on('resize', function(){
                scrollFun();

                if (!timer) {
                    setTimeout(function(){
                        timer = null;
                        scrollFun();
                    }, 200)
                }
            });
        }

        function addSlickSlideEvent() {
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
        }
        
        function addClickEventToElem() {
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

            // 관련사이트
            $('.btn_relation').on('click', function(e){
                $('.list_relation').toggleClass('on');
            });

            // 이미지 앵커
            $('.link_func').click(function(e) {
                e.preventDefault();
                var index = $('.link_func').index(this) >= 3 ? $('.link_func').index(this) + 1 : $('.link_func').index(this);
                var imgList = $('.item_img');
                var docHeaderElem = $('.doc-header');
                var scrollY = Math.ceil((imgList[index]).getBoundingClientRect().top + document.documentElement.scrollTop - docHeaderElem.outerHeight() - 160);

                document.documentElement.scrollTop = scrollY;
            });
        }

        function scrollFun() {
            var scrollTop = $(window).scrollTop();   
            var docHeaderElem = $(".doc-header");
            var wrapInfoElem = $(".wrap_info");
            var sectionDescElem = $(".content-home .section_desc");
            var sectionServiceElem = $(".section_service");
            var windowWidth = window.innerWidth;
            var descEmphElem = $(".content-home .desc_emph");
            var descImgElem = $(".content-home .desc_img");
            var pageXOffset = window.pageXOffset;
            var innerHeaderElem = $(".inner_header"); 
            var groupWorkElem = $(".group_work");
            var groupSearchkElem = $(".group_search");
            var groupConnectElem = $(".group_connect");
            var descEmphEmElem = $(".section_desc .desc_emph em");
            var imgList = $(".item_img");
            var initScrollTop = 0;
            
            // Header Check
            docHeaderElem.toggleClass("scroll_header", scrollTop > 0);
            innerHeaderElem.css("transform", "translateX(" + -pageXOffset + "px)");

            scrollToDesc();
            scrollToImage();
            scrollToFadeIn();

            function scrollToImage() {
                var ImgListRect = new Array();
                var wrapInfoChildDiv = $(".wrap_info > div");
                var wrapInfoChildDivImgCnt = [3, 1, 2];
                var totHeight = 0;
                var ImgIndex = 0;
                var cnt = 0;
                var posImgCnt = 0;
                var marginTop = 160;
                
                for (var i = 0; i < wrapInfoChildDiv.length; i++) {
                    totHeight = 0;

                    for (var j = 0; j < wrapInfoChildDivImgCnt[i]; j++) {
                        totHeight += $(imgList[cnt]).outerHeight(true);
                        cnt++;
                    }

                    ImgIndex = cnt - wrapInfoChildDivImgCnt[i];

                    ImgListRect.push(
                        {
                            top : $(imgList[ImgIndex]).offset().top - marginTop,
                            bottom : $(imgList[ImgIndex]).offset().top + totHeight - marginTop
                        }
                    )
                }

                initScrollTop = scrollTop + docHeaderElem.outerHeight();

                if (initScrollTop < ImgListRect[0].top) {
                    wrapInfoElem.css({position: 'absolute', top: 0, bottom: 'auto'}); 

                    groupWorkElem.css("transform", "translateX(0)");
                    groupSearchkElem.css("transform", "translateX(0)");
                    groupConnectElem.css("transform", "translateX(0)");
                } else {    
                    for (var i = 0; i < wrapInfoChildDiv.length; i++) {
                        posImgCnt += wrapInfoChildDivImgCnt[i];

                        if (initScrollTop >= ImgListRect[i].top && initScrollTop <= ImgListRect[i].bottom) {
                            if (initScrollTop < ImgListRect[i].bottom - wrapInfoChildDiv[0].offsetHeight) {
                                wrapInfoElem.css({
                                    position: "fixed",
                                    top: docHeaderElem.outerHeight() - wrapInfoChildDiv[0].offsetHeight * i,
                                    bottom: "auto",
                                    width: "50%" 
                                });   

                                groupWorkElem.css("transform", "translateX(" + -pageXOffset + "px)");
                                groupSearchkElem.css("transform", "translateX(" + -pageXOffset + "px)");
                                groupConnectElem.css("transform", "translateX(" + -pageXOffset + "px)");
                            } else {
                                var offSet = parseInt($(wrapInfoChildDiv[i]).css("paddingTop"), 10) - parseInt($(imgList[posImgCnt - 1]).css("marginTop"), 10);
                                wrapInfoElem.css({
                                    position: "absolute",
                                    top: $(imgList[posImgCnt - 1]).position().top - wrapInfoChildDiv[0].offsetHeight * i - offSet,
                                    bottom: "auto",
                                    width: "50%"
                                });

                                groupWorkElem.css("transform", "translateX(0)");
                                groupSearchkElem.css("transform", "translateX(0)");
                                groupConnectElem.css("transform", "translateX(0)");
                            }

                            break;
                        }
                    }
                }

                // fade in area
                var ImgStddScrollTop = new Array();
                var workMarkOn = $('.group_work .mark_on');
                var connectMarkOn = $('.group_connect .mark_on');
                initScrollTop = scrollTop + docHeaderElem.outerHeight() + marginTop + imgList[0].offsetHeight * 0.5;

                for (var i = 0; i < imgList.length; i++) {
                    var curElementScrollY = imgList[i].getBoundingClientRect().top + document.documentElement.scrollTop;
                    ImgStddScrollTop.push(curElementScrollY);
                }

                if (initScrollTop > ImgStddScrollTop[0] && initScrollTop <= ImgStddScrollTop[1]) {
                    $(imgList[0]).addClass("item_active").siblings().removeClass("item_active");
                    workMarkOn.addClass("one").removeClass("second third");
                } else if (initScrollTop > ImgStddScrollTop[1] && initScrollTop <= ImgStddScrollTop[2]) {
                    $(imgList[1]).addClass("item_active").siblings().removeClass("item_active");
                    workMarkOn.addClass("second").removeClass("one third");
                } else if (initScrollTop > ImgStddScrollTop[2] && initScrollTop <= ImgStddScrollTop[3]) {
                    $(imgList[2]).addClass("item_active").siblings().removeClass("item_active");
                    workMarkOn.addClass("third").removeClass("second one");
                } else if (initScrollTop > ImgStddScrollTop[3] && initScrollTop <= ImgStddScrollTop[4]) {
                    $(imgList[3]).addClass("item_active").siblings().removeClass("item_active");
                } else if (initScrollTop > ImgStddScrollTop[4] && initScrollTop <= ImgStddScrollTop[5]) {
                    $(imgList[4]).addClass("item_active").siblings().removeClass("item_active");
                    connectMarkOn.addClass("one").removeClass("second");
                } else if (initScrollTop > ImgStddScrollTop[5]) {
                    $(imgList[5]).addClass("item_active").siblings().removeClass("item_active");
                    connectMarkOn.addClass("second").removeClass("one");
                }
            }

            function scrollToDesc() {
                initScrollTop = scrollTop + docHeaderElem.outerHeight();
                var matxVal = 0;
                var opacity = 0;
                var styleMatrix = "";
                var defaultMatrix = 0.3;
                var defaultOpacity = 0.5;
                var sectionDescTop = sectionDescElem.offset().top;
                var sectionDescBottom = sectionServiceElem.offset().top;
                
                if (initScrollTop < sectionDescElem.offset().top) {
                    styleMatrix = 'matrix(' + defaultMatrix + ', 0, 0,' + defaultMatrix + ', 0, 0)';

                    // descEmph
                    descEmphElem.css('position', 'absolute'); 
                    descEmphElem.css('top', '421.5px'); 
                    descEmphElem.css('bottom', 'auto'); 
                    descEmphElem.css("transform", "translateX(0)");
                    descEmphEmElem.css('opacity', defaultOpacity);

                    // descImg
                    descImgElem.css('position', 'relative'); 
                    descImgElem.css('transform', styleMatrix + "translateX(0)");
                    descImgElem.css('top', sectionDescElem.height() / 4 - 300);
                    descImgElem.css('bottom', 'auto');
                    descImgElem.css('left', windowWidth < 1200 ? -200 : windowWidth / 2 - 800);
                    descImgElem.css('opacity', defaultOpacity);
                } else if (initScrollTop > sectionDescTop && (scrollTop + window.innerHeight) <= sectionDescBottom) {
                    matxVal = Math.min(1, ((initScrollTop - sectionDescTop) / (sectionDescElem.outerHeight() / 2)).toFixed(3));
                    opacity = Math.min(1, ((initScrollTop - sectionDescTop) / (sectionDescElem.outerHeight() / 2)).toFixed(3));
                    styleMatrix = 'matrix(' + (defaultMatrix + matxVal * (1 - defaultMatrix)) + ', 0, 0,' + (defaultMatrix + matxVal * (1 - defaultMatrix)) + ', 0, 0)';
                    
                    // descEmph
                    descEmphElem.css('position', 'fixed'); 
                    descEmphElem.css('top', '440px'); 
                    descEmphElem.css('bottom', 'auto'); 
                    descEmphElem.css("position") == "fixed" ? descEmphElem.css("transform", "translateX(" + -pageXOffset + "px)") : descEmphElem.css("transform", "translateX(0)");
                    descEmphEmElem.css('opacity', defaultOpacity + opacity * (1 - defaultOpacity));

                    // descImg
                    descImgElem.css('position', 'fixed');
                    descImgElem.css('transform', styleMatrix + " translateX(" + -4.5 * (1 - (defaultMatrix + matxVal * (1 - defaultMatrix))) * pageXOffset + "px)");
                    descImgElem.css('top', sectionDescElem.height() / 4 - 300);
                    descImgElem.css('bottom', 'auto');
                    descImgElem.css('left', windowWidth < 1200 ? -200 : windowWidth / 2 - 800);
                    descImgElem.css('opacity', defaultOpacity + opacity * (1 - defaultOpacity));
                } else {
                    var offSetTop = sectionServiceElem.offset().top - window.innerHeight - sectionDescTop;
                    var descEmphElemTop = 430 + offSetTop;
                    var descImgElemTop = sectionDescElem.height() / 4 - 300 + offSetTop;

                    // descEmph
                    descEmphElem.css('position', 'absolute'); 
                    descEmphElem.css('top', descEmphElemTop); 
                    descEmphElem.css('bottom', 'auto'); 
                    descEmphElem.css("transform", "translateX(0)");
                    descEmphEmElem.css('opacity', 1);

                    // descImgElem
                    descImgElem.css('position', 'absolute'); 
                    descImgElem.css('transform', styleMatrix + "translateX(0)");
                    descImgElem.css('top', descImgElemTop);
                    descImgElem.css('opacity', 1);
                    
                }
            }

            function scrollToFadeIn() {
                var coworkContService = $(".wrap_cowork .cont_service");
                var managerContService = $(".wrap_manager .cont_service");
                var wrapProductElem = $(".wrap_product");
                var wrapAssistElem = $(".wrap_assist");
                var sectionSecure = $(".section_secure");
                var fadeInList = [coworkContService, managerContService, wrapProductElem, wrapAssistElem, sectionSecure];

                for (var i = 0; i < fadeInList.length; i++) {
                    var windowHeight = $(window).outerHeight();
                    var clientTop = fadeInList[i].get(0).getBoundingClientRect().top;
                    var clientBottom = fadeInList[i].get(0).getBoundingClientRect().bottom;

                    if (i == 0 || i == 1) {
                        fadeInList[i].parent().toggleClass("fadeIn", clientTop < windowHeight && clientBottom > 0)   
                    } else {
                        fadeInList[i].toggleClass("fadeIn", clientTop < windowHeight && clientBottom > 0)    
                    }
                }
            }
        }