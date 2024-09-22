
    // 鼠标悬浮特效
    $("a").mouseover(function(){
        $(this).addClass("jt")
    })
    $(".bfsp").mouseover(function(){
        $(this).addClass("jt")
    })
    $(".box3 .xgtx").mouseover(function(){
        $(this).addClass("jt")
    })
    $(".box3 .bctx").mouseover(function(){
        $(this).addClass("jt")
    })
    $(".box3 .qlltx").mouseover(function(){
        $(this).addClass("jt")
    })
    $(".box4 .zjt img").mouseover(function(){
        $(this).addClass("jt")
    })
    $(".box4 .yjt img").mouseover(function(){
        $(this).addClass("jt")
    })
    // 获取视频节点
    var myvideo=document.getElementById("sp1");

    // 播放视频特效
    $(".box1 .bfsp").click(function(){
        $(".sp").css("display","block")
        $(".lj").css("display","block")
    })

    // 暂停视频特效
    $(".box1 .lj").click(function(){
        $(".sp").css("display","none")
        $(".lj").css("display","none")
        myvideo.pause();
    })
    
    // 点击头像切换内容特效
    $(".box3 .xgtx").click(function(){
        $(".box3 .bj").css("background","url(./img/index/xgbj.webp) center center/cover")
        $(".box3 .js").css("background","url(./img/index/xgjs.webp) center center/cover")
        $(".box3 .py11").css("background","url(./img/index/xgpy11.webp) center center/cover")
        $(".box3 .py21").css("background","url(./img/index/xgpy21.webp) center center/cover")
        $(".box3 .xgtx").css("background","url(./img/index/xgtx2.webp) center center/cover")
        $(".box3 .bctx").css("background","url(./img/index/bctx1.webp) center center/cover")
        $(".box3 .qlltx").css("background","url(./img/index/qlltx1.webp) center center/cover")   
    })
    $(".box3 .bctx").click(function(){
        $(".box3 .bj").css("background","url(./img/index/bcszbj.webp) center center/cover")
        $(".box3 .js").css("background","url(./img/index/bcjs.webp) center center/cover")
        $(".box3 .py11").css("background","url(./img/index/bcpy11.webp) center center/cover")
        $(".box3 .py21").css("background","url(./img/index/bcpy21.webp) center center/cover")
        $(".box3 .bctx").css("background","url(./img/index/bctx2.webp) center center/cover")
        $(".box3 .xgtx").css("background","url(./img/index/xgtx1.webp) center center/cover")
        $(".box3 .qlltx").css("background","url(./img/index/qlltx1.webp) center center/cover")   
    })
    $(".box3 .qlltx").click(function(){
        $(".box3 .bj").css("background","url(./img/index/qllbj.webp) center center/cover")
        $(".box3 .js").css("background","url(./img/index/qlljs.webp) center center/cover")
        $(".box3 .py11").css("background","url(./img/index/qllpy11.webp) center center/cover")
        $(".box3 .py21").css("background","url(./img/index/qllpy21.webp) center center/cover")
        $(".box3 .qlltx").css("background","url(./img/index/qlltx2.webp) center center/cover")
        $(".box3 .xgtx").css("background","url(./img/index/xgtx1.webp) center center/cover")
        $(".box3 .bctx").css("background","url(./img/index/bctx1.webp) center center/cover")   
    })

    // 轮播图特效
    var swiper = new Swiper(".b", {
        autoplay: true,
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });