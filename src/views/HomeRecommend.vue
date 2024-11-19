<template>
  <div class="homeRecommend">
    <h1>编辑推荐</h1>
    <ul class="editorRecommends">
      <EditorRecommendCard
        v-for="item in EditorRecommendData"
        :key="item.id"
        :editItem="item"
        :col="3"
      ></EditorRecommendCard>
    </ul>
    <h1>最新音乐</h1>
    <ul class="latestMusic">
      <MusicItemCard
        v-for="item in latestMusicData"
        :key="item.id"
        :musicName="item.name"
        :singer="
          item.song.artists.length == 1
            ? item.song.artists[0].name
            : item.song.artists[0].name + ` / ` + item.song.artists[1].name
        "
        :albumName="item.song.album.name"
      ></MusicItemCard>
    </ul>
  </div>
</template>

<script>
import EditorRecommendCard from "@/components/EditorRecommendCard.vue";
import MusicItemCard from "@/components/MusicItemCard.vue";
export default {
  data() {
    return {
      EditorRecommendData: [],
      latestMusicData: [],
      singer: [],
    };
  },
  components: {
    EditorRecommendCard,
    MusicItemCard,
  },
  created() {
    this.axios
      .get("https://apic.netstart.cn/music/personalized")
      .then((res) => {
        this.EditorRecommendData = res.data.result.slice(0, 6);
      })
      .catch((err) => {
        console.log("编辑推荐出错", err);
      });
    this.axios
      .get("https://apic.netstart.cn/music/personalized/newsong")
      .then((res) => {
        this.latestMusicData = res.data.result;
      })
      .catch((err) => {
        console.log("最新音乐出错", err);
      });
  },
};
</script>

<style lang="less" scoped>
.homeRecommend {
  * {
    margin: 0;
    padding: 0;
  }
  ul,
  li {
    list-style: none;
  }
  .editorRecommends {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>