<template>
  <div class="lyricAndImg" :class="{ play: playing }">
    <div class="alImg" @click="scrollToLyric" ref="alImg">

      <img class="recordTwo" :class="{ play: playing }" src="@/assets/record2.png">
      <div class="musicPic" :class="{ play: playing }">
        <img v-if="musicPic" :src="musicPic" />
      </div>
    </div>

    <div
      class="lyric"
      @click="scrollToLeftImg"
      @scroll="stopAutoScroll"
      ref="lyric"
    >
      <ul class="list">
        <li
          v-for="(item, index) in parsedLyric"
          :class="{ active: index == currentLyricIndex }"
          :key="index"
          ref="lyricElements"
        >
          <span
            ref="lyricSpans"
            :style="
              index === currentLyricIndex
                ? {
                    transform: `translateX(-${excess}px)`,
                    transition: `transform ${
                      ((parsedLyric[index + 1]?.time || duration) - item.time) *
                      0.9
                    }s`,
                    animationDuration:
                      ((parsedLyric[index + 1]?.time || duration) - item.time) *
                        0.9 +
                      's',
                  }
                : {}
            "
            >{{ item.text }}</span
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentSongId: Number,
    playing: Boolean,
    musicPic: String,
    currentTime: Number,
    duration: Number,
  },

  data() {
    return {
      lyric: "",
      lyricElementsHeight: [],
      autoScroll: true,
      excess: 0,
    };
  },

  computed: {
    parsedLyric() {
      return this.lyric
        .split("\n")
        .filter((o) => o)
        .map((item) => {
          var res = item.match(
            /\[(?<m>\d{2}):(?<s>\d{2}\.\d{2,3})\](?<str>.*)/i
          );
          return {
            time: Number(res.groups.m) * 60 + parseFloat(res.groups.s),
            text: res.groups.str || "---",
          };
        });
    },

    currentLyricIndex() {
      return this.parsedLyric.findLastIndex((item) => {
        return item.time <= this.currentTime;
      });
    },
  },

  methods: {
    scrollToLyric() {
      this.$refs.lyric.scrollIntoView({ behavior: "smooth", inline: "center" });
    },
    scrollToLeftImg() {
      this.$refs.alImg.scrollIntoView({ behavior: "smooth", inline: "center" });
    },
    stopAutoScroll() {
      this.autoScroll = false;
      setTimeout(function () {
        this.autoScroll = true;
      }, 1000);
    },
    updateRoute(songId) {
      if (this.$route.query.id !== songId) {
        this.$router.push({ query: { id: songId } }).catch((err) => {
          if (err.name !== "NavigationDuplicated") {
            throw err;
          }
        });
      }
    },
  },

  watch: {
    currentLyricIndex() {
      this.$refs.lyric.scrollTop = this.lyricElementsHeight
        .slice(0, this.currentLyricIndex)
        .reduce((total, num) => total + num, 0);
    },
    currentTime() {
      if (this.$refs.lyricElements && this.$refs.lyricSpans) {
        const curLiWidth =
          this.$refs.lyricElements[this.currentLyricIndex]?.offsetWidth ?? 0;
        const curSpanWidth =
          this.$refs.lyricSpans[this.currentLyricIndex]?.offsetWidth ?? 0;
        if (curLiWidth < curSpanWidth) {
          this.excess = curSpanWidth - curLiWidth;
        } else {
          this.excess = 0;
        }
      }

      if (this.currentTime == this.duration) {
        this.$emit("start-play-song");
      }
    },
    currentSongId(newId) {
      if (this.$route.query.id !== newId) {
        this.updateRoute(newId);
      }

      this.axios
        .get("/lyric", {
          params: {
            id: this.$route.query.id,
          },
        })
        .then((res) => {
          this.lyric = res.data.lrc.lyric;
          this.$nextTick(() => {
            this.lyricElementsHeight = this.$refs.lyricElements.map(
              (ele) => ele.offsetHeight
            );
          });
        })
        .catch((err) => {
          console.log("歌词请求失败", err);
        });
    },
  },

  created() {
    this.axios
      .get("/lyric", {
        params: {
          id: this.$route.query.id,
        },
      })
      .then((res) => {
        this.lyric = res.data.lrc.lyric;
        this.$nextTick(() => {
          this.lyricElementsHeight = this.$refs.lyricElements.map(
            (ele) => ele.offsetHeight
          );
        });
      })
      .catch((err) => {
        console.log("歌词请求失败", err);
      });
  },
};
</script>

<style lang="less" scoped>
.lyricAndImg {
  width: 100vw;
  height: 400px;
  margin-top: 10px;
  display: flex;
  overflow: scroll;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  box-sizing: border-box;
  --excess-value: 50px;

  &.play {
    .lyric {
      li.active {
        span {
          animation-play-state: running;
        }
      }
    }
  }

  &::-webkit-scrollbar {
    width: 0;
  }

  .alImg {
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    box-sizing: border-box;
    scroll-snap-align: start;
    position: relative;

    @keyframes rotateAnima {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    .recordTwo{
      width: 120px;
      height: 120px;
      position: absolute;
      top: 28px;
      left: 50%;
      margin-left: -60px;
      z-index: 2;
      transition: transform 1s;
      transform-origin: center top;
      transform: rotate(-30deg);
      &.play{
        transform: rotate(0deg);
      }
    }

    .musicPic {
      width: 260px;
      height: 260px;
      border-radius: 50%;
      background: url('@/assets/record1.png') center;
      background-size: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin:auto;
      animation: rotateAnima 3s linear infinite;
      animation-play-state: paused;
      position: absolute;
      top: 100px;
      left: 50%;
      margin-left: -130px;

      img{
        width: 166px;
        height: 166px;
        border-radius: 50%;
      }

      &.play {
        animation-play-state: running;
      }
    }
  }

  .lyric {
    width: 100%;
    height: 100%;
    padding: 50% 10px;
    flex-shrink: 0;
    box-sizing: border-box;
    scroll-snap-align: start;
    overflow-y: scroll;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
      width: 0;
    }

    ul {
      list-style: none;
      text-align: center;

      li {
        width: 100%;
        overflow: hidden;

        @keyframes lyricAnima {
          0% {
            background-image: linear-gradient(to right, red 49%, white 51%);
            color: transparent;
            background-position-x: 100%;
          }
          100% {
            background-image: linear-gradient(to right, red 49%, white 51%);
            color: transparent;
            background-position-x: 0%;
          }
        }

        span {
          font-size: 20px;
          line-height: 32px;
          color: white;
          display: inline-block;
          background-size: 200%;
          background-repeat: no-repeat;
          background-position-x: 100%;
          background-clip: text;
          position: relative;
        }

        &.active {
          span {
            font-size: 30px;
            line-height: 60px;
            white-space: nowrap;
            animation: lyricAnima linear;
            animation-play-state: paused;
          }
        }
      }
    }
  }
}
</style>