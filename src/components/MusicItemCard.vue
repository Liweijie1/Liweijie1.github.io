<template>
  <li
    class="musicItemCard"
    @click="setCurrentSongId()"
    :class="{ active: musicId == currentSongId }"
  >
    <div class="left">
      <p class="musicName">{{ musicName }}</p>
      <p>{{ singer }} - {{ albumName }}</p>
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
.musicItemCard {
  height: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgb(160, 160, 160);

  &.active {
    background: rgb(148, 174, 255);
  }
  p {
    padding: 0;
    margin: 0;
    text-align: left;
    &.musicName {
      padding: 0;
      margin: 0;
      font-weight: 600;
    }
  }
  img {
    width: 30px;
    height: 30px;
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