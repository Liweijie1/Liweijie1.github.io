<template>
  <div class="songDetail">
    <button @click="$router.back()">返回</button>
    <h3>SongDetail - {{ $route.query.id }}</h3>
    <p>{{ musicName }}</p>
    <p>{{ singer }}</p>
    <img class="musicPic" :class="{ play: playing }" :src="musicPic" />

    <div class="progress">
      <div
        class="mask"
        :style="{ width: (userValue / duration) * 100 + '%' }"
      ></div>
      <input
        type="range"
        min="0"
        :max="duration"
        v-model.number="userValue"
        @input="inputing = true"
        @change="
          inputing = false;
          $emit('change-play-time', userValue);
        "
      />
      
    </div>
    <div class="time">
      <span>{{ currentTime | formatTime }}</span>
      <span>{{ duration | formatTime }}</span>
    </div>

    <button v-if="playing" @click.stop="$emit('pause-play-song')">暂停</button>
    <button v-else @click.stop="$emit('start-play-song')">播放</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      song: null,
      musicPic: null,
      musicName: null,
      singer: null,
      inputing: false,
      userValue: this.currentTime,
    };
  },
  props: {
    playing: Boolean,
    currentSongId: Number,
    currentTime: Number,
    duration: Number,
  },
  watch:{
    currentTime(){
      if(!this.inputing){
        this.userValue = this.currentTime
      }
    }
  },
  created() {
    if (this.$route.query.id) {
      this.$emit("play-this-song", Number(this.$route.query.id));
    } else {
      console.error("歌曲 ID 未定义");
    }
    this.axios
      .get("/song/detail", {
        params: {
          ids: this.$route.query.id,
        },
      })
      .then((res) => {
        this.song = res.data.songs[0];
        this.musicPic = this.song.al.picUrl;
        this.musicName = this.song.name;
        this.singer =
          this.song.ar.length == 1
            ? this.song.ar[0].name
            : this.song.ar[0].name + "/" + this.song.ar[1].name;
      })
      .catch((err) => {
        console.log("歌曲详情页", err);
      });
  },
};
</script>

<style lang="less" scoped>
.songDetail {
  @keyframes rotateAnima {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .musicPic {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 10px solid #000;
    animation: rotateAnima 3s linear infinite;
    animation-play-state: paused;

    &.play {
      animation-play-state: running;
    }
  }

  .progress {
    width: 98%;
    height: 30px;
    margin: 5px auto;
    box-sizing: border-box;
    border: 1px solid #000;
    position: relative;
    input {
      width: 100%;
    }
    .mask {
      width: 20px;
      height: 10px;
      background: red;
      position: absolute;
      bottom: 0;
    }
  }

  .time {
    width: 98%;
    height: 30px;
    margin: 5px auto;
    display: flex;
    justify-content: space-between;
    line-height: 30px;
  }
}
</style>