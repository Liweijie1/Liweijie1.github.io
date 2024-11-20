<template>
  <div v-if="playBarData" class="playBar" @click="gotoSongDetail">
    <img class="musicPic" :src="picUrl" />
    <div class="introduce">{{ musicName }}-{{ singer }}</div>
    <button v-if="playing" @click.stop="$emit('pause-play-song')">暂停</button>
    <button v-else @click.stop="$emit('start-play-song')">播放</button>
    <button>列表</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playBarData: null,
      picUrl: null,
      singer: null,
      musicName: null,
    };
  },
  props: ["currentSongId","playing"],
  methods: {
    requestPlayBarData() {
      this.axios
        .get("/song/detail", {
          params: {
            ids: this.currentSongId,
          },
        })
        .then((res) => {
          this.playBarData = res.data.songs[0];
          this.picUrl = this.playBarData.al.picUrl;
          this.musicName = this.playBarData.name;
          this.singer =
            this.playBarData.ar.length == 1
              ? this.playBarData.ar[0].name
              : this.playBarData.ar[0].name + "/" + this.playBarData.ar[1].name;
        })
        .catch((err) => {
          console.log("playBarData", err);
        });
    },
    gotoSongDetail(){
      this.$router.push({
        path:"/songDetail",
        query:{
          id:this.currentSongId
        }
      })
    }
  },
  watch: {
    currentSongId() {
      this.requestPlayBarData();
    },
  },
  created() {
    this.requestPlayBarData();
  },
};
</script>

<style lang="less" scoped>
.playBar {
  width: 100%;
  height: 60px;
  position: fixed;
  bottom: 0;
  background: rgb(201, 243, 250);
  display: flex;
  justify-content: space-around;
  align-items: center;

  .musicPic {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 5px solid #000;
  }

  .introduce {
    width: 30%;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>