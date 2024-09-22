
// 鼠标悬浮特效
$(".bf").mouseover(function(){
    $(this).addClass("jt")
})

// 获取视频节点
var myvideo=document.getElementById("sp1");

// 播放视频特效
$(".bf").click(function(){
    console.log("123");
    $(".sp").css("display","block")
    $(".lj").css("display","block")
})

// 暂停视频特效
$(".sp .lj").click(function(){
    $(".sp").css("display","none")
    $(".lj").css("display","none")
    myvideo.pause();
})

