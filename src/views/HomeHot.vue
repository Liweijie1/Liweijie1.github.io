<template>
  <div class="homeHot">
    <ol>
      <MusicItemCard
      v-for="item in hotData"
      :key="item.id"
      :musicId="item.id"
      :currentSongId="currentSongId"
      :playing="playing"
      :musicName="item.name"
      :singer="item.ar[0].name"
      :albumName="item.al.name"
      @play-this-song="$emit('play-this-song',item.id)"
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
  props:['currentSongId', "playing"],
  components:{
    MusicItemCard,
  },
  created() {
    this.axios
      .get("/playlist/detail?id=3778678")
      .then((res) => {
        this.hotData = res.data.playlist.tracks.slice(0, 20);
      })
     
      ;
  },
};
</script>

<style lang="less" scoped>
.homeHot{
  margin-bottom: 60px;
}
</style>