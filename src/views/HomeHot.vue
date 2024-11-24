<template>
  <div class="homeHot">
    <header>
      <div>云音乐</div>
      <div class="hotImg"></div>
      <div class="upDate">更新日期:11月24日</div>
    </header>
    <ol v-if="hotData" @click="$emit('change-song-list', hotData)">
      <MusicItemCard
        v-for="item in hotData"
        :key="item.id"
        :musicId="item.id"
        :currentSongId="currentSongId"
        :playing="playing"
        :musicName="item.name"
        :singer="
          item.ar.length == 1
            ? item.ar[0].name
            : item.ar[0].name + '/' + item.ar[1].name
        "
        :albumName="item.al.name"
        @play-this-song="$emit('play-this-song', item.id)"
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
  props: ["currentSongId", "playing"],
  components: {
    MusicItemCard,
  },
  created() {
    this.axios.get("/playlist/detail?id=3778678").then((res) => {
      this.hotData = res.data.playlist.tracks.slice(0, 20);
    });
  },
};
</script>

<style lang="less" scoped>
ul,
li {
  padding: 0;
  margin: 0;
}
.homeHot {
  margin-bottom: 60px;
  header {
    height: 147px;
    background: url("@/assets/hotBackground.jpg") center;
    background-size: 100%;
    color: white;
    padding: 20px;
    box-sizing: border-box;
    .hotImg {
      background: url("@/assets/sq.png") no-repeat -24px -45px;
      background-size: 116%;
      width: 142px;
      height: 67px;
    }
    .upDate{
      font-size: 12px;
    }
  }
}
</style>