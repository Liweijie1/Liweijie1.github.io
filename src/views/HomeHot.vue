<template>
  <div class="homeHot">
    <ol>
      <MusicItemCard
      v-for="item in hotData"
      :key="item.id"
      :musicName="item.name"
      :singer="item.ar[0].name"
      :albumName="item.al.name"
    ></MusicItemCard>
    </ol>
  </div>
</template>

<script>
import MusicItemCard from "../components/MusicItemCard.vue";
export default {
  data() {
    return {
      hot: null,
      hotData: null,
    };
  },
  components:{
    MusicItemCard,
  },
  created() {
    this.axios
      .get("https://apis.netstart.cn/music/playlist/detail?id=3778678")
      .then((res) => {
        this.hotData = res.data.playlist.tracks.slice(0, 20);
      });
  },
};
</script>

<style lang="less" scoped>
</style>