<template>
  <div
    class="EditorRecommendCard"
    :class="{ col3: col === 3, col2: col === 2 }"
    @click="gotoEditorRecommendList(editItem.id)"
  >
    <header>
      <img :src="`${editItem.picUrl}?imageView=1&type=webp&thumbnail=246x0`" />
      <p class="playCount">
        <img src="@/assets/Headset.png">
        <span>{{ (editItem.playCount / 10000).toFixed(1) + "万" }}</span>
      </p>
      
    </header>
    <footer>
      <p>{{ editItem.name }}</p>
    </footer>
  </div>
</template>

<script>
import EditorRecommendList from "../views/EditorRecommendList.vue";
export default {
  props: ["editItem", "col"],
  component: EditorRecommendList,
  methods:{
    gotoEditorRecommendList(id){
      this.$router.push({path:"/editorRecommendList",query:{id}})
    }
  }
};
</script>

<style lang="less" scoped>
.EditorRecommendCard {
  &.col3 {
    width: 30%;
    flex-grow: 1;
    &:nth-child(3n + 2) {
      margin: 0 3px;
    }
  }
  &.col2 {
    width: 40%;
    flex-grow: 1;
  }
  header {
    position: relative;
    img {
      width: 100%;
    }
    .playCount {
      width: 100px;
      height: 18px;
      display: flex;
      justify-content: right;
      align-items: center;
      position: absolute;
      top: 2px;
      right: 5px;
      font-size: 12px;
      color: white;
      img{
        width: 12px;
        height: 12px;
        display: block;
      }
    }
  }
  footer {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
}
</style>