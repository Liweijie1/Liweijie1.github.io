<template>
  <div
    class="EditorRecommendCard"
    :class="{ col3: col === 3, col2: col === 2 }"
    @click="gotoEditorRecommendList(editItem.id)"
  >
    <header>
      <img :src="`${editItem.picUrl}?imageView=1&type=webp&thumbnail=246x0`" />
      <span>{{ editItem.id }}</span>
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
    span {
      position: absolute;
      top: 0;
      right: 0;
      color: white;
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