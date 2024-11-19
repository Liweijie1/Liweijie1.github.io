<template>
  <li class="musicItemCard">
    <div class="left">
      <p class="musicName">{{musicName}}</p>
      <p>{{singer}} - {{albumName}}</p>
    </div>
    <img src="@/assets/play.png" alt="">
  </li>
</template>

<script>
export default {
  props:['musicName','albumName','singer']
}
</script>

<style lang="less" scoped>
  .musicItemCard{
    height: 55px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgb(160, 160, 160);
    p{
      padding: 0;
      margin: 0;
      &.musicName{
        padding: 0;
        margin: 0;
        font-weight: 600;
      }
    }
    img{
      width: 30px;
      height: 30px;
    }
  }

</style>