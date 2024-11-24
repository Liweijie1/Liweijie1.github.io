<template>
  <div class="homeSearch">
    <input type="text" placeholder="搜索歌曲、歌手、专辑">
    <ul>
      <li>鹭卓</li>
      <li>船</li>
      <li>有些颜人中</li>
      <li>孤独患者</li>
      <li>于是</li>
      <li>CRY FOR ME</li>
      <li>罗生门</li>
      <li>爱错</li>
      <li>number one girl</li>
      <li>最好的时光</li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
  input{
    width: 355px;
    height: 30px;
    border-radius: 15px;
    border: none;
    padding: 10px;
    background: #EBECEC;
    box-sizing: border-box;
    display: block;
    margin:20px auto;
  }
  ul{
    list-style: none;
    margin-top: 10px;
    border-top: 1px solid #d4d6d6;
    padding-top: 5px;

    li{
      font-size: 16px;
      border-radius: 22px;
      border: 1px solid rgb(149, 149, 149);
      padding: 4px 6px;
      margin: 5px;
      float: left;
    }
  }
</style>