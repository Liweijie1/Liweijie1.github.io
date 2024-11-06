// 二级列表上拉下拉特效
$(".father-list li").mouseenter(function(){
  $(this).children(".child-list").stop().slideDown(); // 显示子列表，上拉效果
}).mouseleave(function(){
  $(this).children(".child-list").stop().slideUp(); // 隐藏子列表，下拉效果
});