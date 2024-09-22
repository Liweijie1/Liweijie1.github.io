//鼠标悬浮特效
$("a").mouseover(function(){
    $(this).addClass("jt")
})
$("header .wz").mouseover(function(){
    $(this).addClass("jt")
})

// 滑动选项卡特效
$("header .wz").mouseover(function(){
    $("header .xhx").stop().animate({
        left:$(this).index()*100
    })
})
$("header .wz").mouseleave(function(){
    $("header .xhx").stop().animate({
        left:$(".gg").index()*100
    })
})

// 高光特效
$("header .wz").click(function(){
    $(this).toggleClass("gg").siblings().removeClass("gg")
})

// 二级列表上拉下拉特效
$(".wz").eq(2).click(function(){
    $(".child-list").eq(0).slideToggle()
    $(this).siblings().children(".child-list").hide();
})
$(".wz").eq(3).click(function(){
    $(".child-list").eq(1).slideToggle()
    $(this).siblings().children(".child-list").hide();
})

// 二级列表淡入淡出特效
$(".wz").eq(4).click(function(){
    $(".child-list").eq(2).fadeToggle()
    $(this).siblings().children(".child-list").hide();
})
$(".wz").eq(5).click(function(){
    $(".child-list").eq(3).fadeToggle()
    $(this).siblings().children(".child-list").hide();
})

// 二级列表显示隐藏特效
$(".wz").eq(6).click(function(){
    $(".child-list").eq(4).toggle();
    $(this).siblings().children(".child-list").hide();
})