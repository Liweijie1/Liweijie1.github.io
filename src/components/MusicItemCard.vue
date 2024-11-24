<template>
  <li
    class="musicItemCard"
    @click="setCurrentSongId()"
    :class="{ active: musicId == currentSongId }"
  >
    <div class="left">
      <p class="musicName">{{ musicName }}</p>
      <p class="singer">
        <span class="sq"></span>
        <span>{{ singer }} - {{ albumName }}</span>
      </p>
    </div>
    <img v-if="musicId !== currentSongId" src="@/assets/play.png" />
    <div v-else class="anima" :class="{ playing: playing }">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </li>
</template>

<script>
export default {
  props: [
    "musicName",
    "albumName",
    "singer",
    "musicId",
    "currentSongId",
    "playing",
  ],
  methods: {
    setCurrentSongId() {
      this.$emit("play-this-song");
    },
  },
};
</script>

<style lang="less" scoped>
ul,
li{
  padding: 0;
  margin: 0;
}
@keyframes moveGradient {
  0% {
    background-position: 0% 50%;
  }

  100% {
    background-position: 100% 50%;
  }
}

.musicItemCard {
  height: 55px;
  margin: 0px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgb(160, 160, 160);

  &.active {
    background: linear-gradient(
      45deg,
      #87ceeb,
      #b0c3e6,
      #8793eb,
      #00bfff,
      #8a82f8,
      #8793eb,
      #b0c3e6,
      #87ceeb
    );
    background-size: 300% 300%;
    animation: moveGradient 5s linear infinite;
    .left {
      .p {
        &.singer {
          font-size: 60px;
          color: white !important;
        }
      }
    }
  }

  .left {
    width: 60%;

    p {
      text-align: left;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &.musicName {
        font-size: 20px;
        color: #333;
      }

      &.singer {
        font-size: 16px;
        color: #888;

        .sq {
          background: url("@/assets/sq.png") no-repeat 0 0;
          width: 24px;
          height: 16px;
          display: block;
          float: left;
          margin-top: 3px;
        }
      }
    }
  }

  img {
    width: 22px;
    height: 22px;
    margin-left: 10px;
  }

  @keyframes anima {
    0% {
      transform: scaleY(1);
    }
    100% {
      transform: scaleY(0);
    }
  }

  .anima {
    width: 22px;
    height: 22px;
    display: flex;
    justify-content: space-around;

    span {
      width: 15%;
      height: 100%;
      background: red;
      display: block;
      animation: anima 0.8s linear alternate;
      animation-iteration-count: infinite;
      animation-play-state: paused;
      transform-origin: bottom;

      &:nth-child(1) {
        animation-delay: 0s;
      }
      &:nth-child(2) {
        animation-delay: -0.4s;
      }
      &:nth-child(3) {
        animation-delay: -0.2s;
      }
      &:nth-child(4) {
        animation-delay: -0.6s;
      }
    }
    &.playing {
      span {
        animation-play-state: running;
      }
    }
  }
}
</style>