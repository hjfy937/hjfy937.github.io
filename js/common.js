var Mylike = function() {
    /* public function */
    var ClikeSw = function(obj) {
        var x = obj.x;
        var y = obj.y;
        var xClass = obj.xClass || 'on';
        var yClass = obj.yClass || 'on';
        $(x).click(function() {
            var i = $(this).index();
            var move = $(y + ':eq(' + i + ')');
            $(this).addClass(xClass).siblings().removeClass(xClass);
            move.addClass('on').siblings(y).removeClass('on');
            if (!move.is('.swiper-container-horizontal')) {
                obj.slidesPerView ? Swiper(y + ':eq(' + i + ')', { slidesPerView: obj.slidesPerView }) :
                    Swiper(y + ':eq(' + i + ')', { pagination: '.swiper-pagination', loop: true });
            }
        });
        obj.slidesPerView ? Swiper(y + ':eq(0)', { slidesPerView: obj.slidesPerView }) : Swiper(y + ':eq(0)', { pagination: '.swiper-pagination', loop: true });
    };
    /* init */
    var fun = {
        /*index*/
        Index: () => {
            /*首页banner*/
            Swiper('#banner', { pagination: '.swiper-pagination', loop: true, autoplay: 3000 });
           
            /*caes*/
            Swiper('.case_box .case_index', { pagination: '.swiper-pagination', loop: true, autoplay: 3000 });
        
            /*news*/
            ClikeSw({ x: ' .article_zixun h3', y: '.content #scroll2' });
            Swiper('.index_hot_c .tg_scroll', { pagination: '.swiper-pagination', loop: true, autoplay: 3000 });
            /*video*/
            Swiper('#certify .swiper-container', {
                watchSlidesProgress: true,
                slidesPerView: 'auto',
                centeredSlides: true,
                loop: true,
                loopedSlides: 5,

                autoplay: {
                    delay: 2000,
                },
                on: {
                    progress: function(progress) {
                        for (i = 0; i < this.slides.length; i++) {
                            var slide = this.slides.eq(i);
                            var slideProgress = this.slides[i].progress;

                            if (Math.abs(slideProgress) > 1) {
                                modify = (Math.abs(slideProgress) - 1) * 0.4 + 1;
                            }
                            translate = slideProgress * modify * 57 + '%';
                            scale = 1 - Math.abs(slideProgress) / 5;
                            zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
                            slide.transform('translateX(' + translate + ') scale(' + scale + ')');
                            slide.css('zIndex', zIndex);
                            slide.css('opacity', 1);
                            if (Math.abs(slideProgress) > 3) {
                                slide.css('opacity', 0);
                            }
                        }
                    },
                    setTransition: function(transition) {
                        for (var i = 0; i < this.slides.length; i++) {
                            var slide = this.slides.eq(i)
                            slide.transition(transition);
                        }

                    }
                }

            })
            /*地区首页横栏*/
            Swiper('#navs', { slidesPerView: 3 });
            /*地区首页专家*/
            Swiper('.hos_doctor .hos_doo', { pagination: '.swiper-pagination', loop: true, autoplay: 1000 });
            ClikeSw({ x: '.hos_doctor .doctor_nav li', y: '.hos_doctor .hos_doo' });
            ClikeSw({ x: '.NewTo #nwrapper li', y: '.NewTo .hos_doo' });
            Swiper('.NewTo .hos_doo', { pagination: '.swiper-pagination', loop: true, autoplay: 1000 });
            Swiper('.hotjp .jpList', { slidesPerView: 3, pagination: '.swiper-pagination', loop: true, autoplay: 1000 });

            /*地区首页文章调用*/
            ClikeSw({ x: '.service .tabtt li', y: '.service .tabbox', slidesPerView: '2' });
            /*地区首页优惠*/
            Swiper('.index-pro .swiper-container', { slidesPerView: 3, pagination: '.swiper-pagination', loop: true, autoplay: 3000 });
        },
        List: () => {
          
           

            /*sitemap*/

        
            $('.nav1_p').click(function(){
                $(this).addClass('active').siblings().removeClass('active');
                if ($('.nav3_text').is(':visible')){
                    $(this).removeClass('active');
                }
                $(this).next('ul').slideToggle(200);
            });
        },
    };
    /*导航*/
    $(function() {
        $(".navBtn,.xm").on("click", function() {
            $('.fixed-menu').css({ animation: 'showit 0.6s 0.1s ease both' });
            $('.fixed-menu').animate({ left: 0 });
            var mySwiper = new Swiper('.item_nav', {
                autoplay: 3500,
                loop: true,
                spaceBetween: 0,
                slidesPerView: 4,
                loop: false,
                loopedSlides: 4,
                slideToClickedSlide: false
            });

            var ww = $('body').width(),
                wh = $(window).height(),
                ih = wh - $('#item_nav').height();
            $(".fixed-menu").css({ width: ww, left: -ww });
            $(".project_content_box").css({ width: ww, height: wh });
            $(".project_nav").css({ height: ih });
            $(".project_item").css({ height: ih });
            $(".project_main .project_item .item_box").first().show().siblings().hide();
            $(".project_nav li").bind("click", function() {
                var i = $(this).index();
                $(this).addClass('on').siblings().removeClass('on');
                $(".project_main .project_item .item_box").eq(i).show().siblings().hide();
            });
            $(".return").bind("click", function() {
                $('.fixed-menu').css({ animation: 'hideit 0.6s 0.1s ease both' });
                $('.fixed-menu').animate({ left: '-1000px' });
            });
        })
    });
   
    /*微信*/
    $(".weima").click(function(){
        $(".erweima").show();
    });
    $(".close").click(function(){
        $(".erweima").hide();
    });
    var run = function(obj) {
        for (let x in obj) {
            obj[x]();
        }
    };
    return run(fun);
}();
 /*点击出现弹框*/
 function showwx(){
    var ss=document.getElementById('myshow');
    ss.style.display='block';
}
/*关闭弹窗*/
function closeshow(){
    var ss=document.getElementById('myshow');
    ss.style.display='none';
}
 /*点击出现弹框*/
 function shows(){
    var ss=document.getElementById('searchshow');
    ss.style.display='block';
}
/*关闭弹窗*/
function closes(){
    var ss=document.getElementById('searchshow');
    ss.style.display='none';
}
var searchFunc = function(path, search_id, content_id) {
	'use strict'; //使用严格模式
	$.ajax({
		url: path,
		dataType: "xml",
		success: function( xmlResponse ) {
			// 从xml中获取相应的标题等数据
			var datas = $( "entry", xmlResponse ).map(function() {
				return {
					title: $( "title", this ).text(),
					content: $("content",this).text(),
					url: $( "url" , this).text(),
                    category: $( "category" , this).text()
					};
					}).get();
					//ID选择器
					var $input = document.getElementById(search_id);
					var $resultContent = document.getElementById(content_id);
					$input.addEventListener('input', function(){
						var str='<div class=\"search-result-list\">';
						var keywords = this.value.trim().toLowerCase().split(/[\s\-]+/);
						$resultContent.innerHTML = "";
						if (this.value.trim().length <= 0) {
							return;
							}
							// 本地搜索主要部分
							datas.forEach(function(data) {
								var isMatch = true;
								var content_index = [];
								var data_title = data.title.trim().toLowerCase();
								var data_content = data.content.trim().replace(/<[^>]+>/g,"").toLowerCase();
                                
								var data_url = data.url;
                                var data_category = data.category;
								var index_title = -1;
								var index_content = -1;
								var first_occur = -1;
								// 只匹配非空文章
								if(data_title != '' && data_content != '') {
									keywords.forEach(function(keyword, i) {
										index_title = data_title.indexOf(keyword);
										index_content = data_content.indexOf(keyword);
										if( index_title < 0 && index_content < 0 ){
											isMatch = false;
										} else {
											if (index_content < 0) {
												index_content = 0;
											}
											if (i == 0) {
												first_occur = index_content;
											}
										}
									});
								}
								// 返回搜索结果
								if (isMatch) {
								//结果标签
                      str += "<a href='"+ data_url +"' class='search-result-title' target='_blank'><dl><dt><img src='"+ data_category +"'></dt><dd><h4>"+ data_title +" </h4>";
					  var content = data.content.trim().replace(/<[^>]+>/g,"");
					  if (first_occur >= 0) {
						  // 拿出含有搜索字的部分
						  var start = first_occur - 20;
						  var end = first_occur + 20;
						  if(start < 0){
							  start = 0;
							  }
							  if(start == 0){
								  end = 30;
								  }
								  if(end > content.length){
									  end = content.length;
									  }
									  var match_content = content.substr(start, end);
									  // 列出搜索关键字，定义class加高亮
									  keywords.forEach(function(keyword){
										  var regS = new RegExp(keyword, "gi");
										  match_content = match_content.replace(regS, "<strong class=\"search-keyword\">"+keyword+"</strong>");
										  })
										  str += "<p class=\"search-result\">" + match_content +"...</p></dd></dl></a>"
										  }
										  }
										  })
										  $resultContent.innerHTML = str;
										  })
										  }
										  }) }; var path = "/search.xml"; searchFunc(path, 'local-search-input', 'local-search-result');
   /*点击复制微信号*/
   function copywx(){
    const range = document.createRange();
    range.selectNode(document.getElementById('copy_content'));
    const selection = window.getSelection();
    if(selection.rangeCount > 0) selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    alert("复制成功！");
}
/*点击出现弹框*/
function wxshow(){
    var ss=document.getElementById('wxshow');
    ss.style.display='block';
}
/*关闭弹窗*/
function closewx(){
    var ss=document.getElementById('wxshow');
    ss.style.display='none';
}
//按钮显示与隐藏
$(function(){
    $(window).scroll(function(){
        var scrollTop=$(this).scrollTop();
        if(scrollTop>100){
            $(".right_c").show(300);
            $('.Header').css({"background":"#633888"});
        }else{
            $(".right_c").hide(300);  $('.Header').css({"background":"none"})
        }
    });
});
function gotoTop() {
    $('html,body').animate({scrollTop:'0px'},'slow');
}
//文章页评论选项切换
$(function () {
    $("#menu li").each(function (index) {//带参数遍历各个选项卡
        $(this).click(function () {//注册每个选项卡的点击事件
            $("#menu li.tabFocus").removeClass("tabFocus")//移除已选中的样式
            $(this).addClass("tabFocus");//增加当前选项卡的样式
            //显示选项卡对应的内容，隐藏被选中的内容
            $("#content-list div:eq(" + index + ")").show().siblings().hide();
        })
    })
})
