<template>
<div class="songDetail">
  <button @click="$router.back()">返回</button>
  <h3>SongDetail - {{ $route.query.id }}</h3>
  <img class="musicPic" :src="musicPic">
  <button v-if="playing" @click.stop="$emit('pause-play-song')">暂停</button>
  <button v-else @click.stop="$emit('start-play-song')">播放</button>
</div>
</template>

<script>
export default {
  data(){
    return {
      song:null,
      musicPic:null,
    }
  },
  props:['playing'],
  created(){
    this.axios
    .get("/song/detail",{
      params:{
        ids: this.$route.query.id,
      }
    })
    .then(res=>{
      this.song = res.data.songs[0];
      this.musicPic = this.song.al.picUrl
    })
    .catch(err=>{
      console.log("歌曲详情页",err);
    })
  }
}
</script>

<style lang="less" scoped>
.songDetail{
  .musicPic{
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 10px solid #000;
  }
}
</style>