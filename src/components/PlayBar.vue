<template>
  <div v-if="playBarData" class="playBar" @click="gotoSongDetail">
    <div class="left">
      <img class="musicPic" :class="{ anima: playing }" :src="picUrl" />
      <div
        class="introduce"
      >
        <span :class="{ long: musicName.length + singer.length > 12 }">
          {{ musicName }}-{{ singer }}
        </span>
      </div>
    </div>
    <div class="right">
      <img
        v-if="playing"
        @click.stop="$emit('pause-play-song')"
        src="@/assets/pause2.png"
      />
      <img
        v-else
        @click.stop="$emit('start-play-song')"
        src="@/assets/play3.png"
      />
      <img src="@/assets/list2.png" @click.stop="$emit('open-songList')"/>
    </div>
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
  props: ["currentSongId", "playing"],
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
    gotoSongDetail() {
      this.$router.push({
        path: "/songDetail",
        query: {
          id: this.currentSongId,
        },
      });
    },
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

  @keyframes rotateAnima {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .left {
    width: 65%;
    height: 100%;
    display: flex;
    align-items: center;
    .musicPic {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      border: 5px solid #000;
      margin: 0 10px;
      animation: rotateAnima 3s linear infinite;
      animation-play-state: paused;
      &.anima {
        animation-play-state: running;
      }
    }

    @keyframes nameLoop {
      0% {
        transform: translateX(0%);
      }
      100% {
        transform: translateX(-100%);
      }
    }

    .introduce {
      width: 125px;
      white-space: nowrap;
      overflow: hidden;

      .long{
        display: inline-block;
        animation: nameLoop 5s infinite;
      }
    }
  }

  .right {
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    img {
      width: 30px;
      height: 30px;
    }
  }
}
</style>