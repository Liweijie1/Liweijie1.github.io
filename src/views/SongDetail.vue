<template>
  <div class="songDetail">
    <header>
      <div class="toBottom" @click="$router.back()">
        <img src="@/assets/toBottom.png" />
      </div>
    </header>

    <LyricAndImg
      :playing="playing"
      :musicPic="musicPic"
      :currentTime="currentTime"
      :duration="duration"
      @start-play-song="$emit('start-play-song')"
    ></LyricAndImg>

    <section class="info">
      <div class="left">
        <span class="musicName">{{ musicName }}</span>
        <span class="singer">{{ singer }}</span>
      </div>
    </section>
    <div class="progress" :class="{ scale: inputing }">
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

    <footer>
      <img src="@/assets/roop.png" />
      <img src="@/assets/before.png" />
      <img
        v-if="playing"
        @click.stop="$emit('pause-play-song')"
        src="@/assets/pause.png"
      />
      <img
        v-else
        @click.stop="$emit('start-play-song')"
        src="@/assets/play2.png"
      />
      <img src="@/assets/next.png" />
      <img src="@/assets/list.png" />
    </footer>
  </div>
</template>

<script>
import LyricAndImg from "@/components/LyricAndImg.vue";
export default {
  components: {
    LyricAndImg,
  },
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
  watch: {
    currentTime() {
      if (!this.inputing) {
        this.userValue = this.currentTime;
      }
    },
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
  height: 100vh;
  background: linear-gradient(to top, #29313c, #475669);

  header {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    .toBottom {
      width: 30px;
      height: 30px;
      margin-left: 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .info {
    width: 100%;
    height: 60px;
    margin: 20px auto 5px;
    .left {
      width: 60%;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .musicName {
        font-size: 24px;
        color: #bfc1c2;
        display: block;
      }
      .singer {
        font-size: 16px;
        color: #949ea7;
        display: block;
      }
    }
  }

  .progress {
    width: 98%;
    height: 3px;
    margin: 5px auto;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 0.575);
    position: relative;
    input {
      width: 100%;
      opacity: 0;
    }
    .mask {
      width: 0px;
      height: 3px;
      background: rgba(255, 255, 255, 0.844);
      position: absolute;
      bottom: 0;
      z-index: 0;
      position: relative;

      &::after {
        content: "";
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.844);
        display: block;
        position: absolute;
        top: -2px;
        right: -2px;
      }
    }

    &.scale {
      transform: scaleY(2);
      .mask::after {
        transform: scaleX(2);
      }
    }
  }

  .time {
    width: 98%;
    height: 30px;
    color: rgb(96, 242, 255);
    margin: 5px auto;
    display: flex;
    justify-content: space-between;
    line-height: 30px;
  }

  footer {
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      width: 30px;
      &:nth-child(3) {
        width: 40px;
      }
    }
  }
}
</style>