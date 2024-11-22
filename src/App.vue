<template>
  <div id="app">
    <header v-if="$route.meta.showNav">
      <div class="left">
        <div class="imgBox">
          <img src="@/assets/wyylogo.png" />
        </div>
        <span>网易云音乐</span>
      </div>
      <div class="right">下载APP</div>
    </header>
    <nav v-if="$route.meta.showNav">
      <router-link to="/">推荐音乐</router-link>
      <router-link to="/hot">热歌榜</router-link>
      <router-link to="/search">搜索</router-link>
    </nav>
    <audio
      v-show="false"
      v-if="currentSongId"
      controls
      autoplay
      style="height: 30px"
      :src="`https://music.163.com/song/media/outer/url?id=${currentSongId}.mp3`"
      @play="playing = true"
      @pause="playing = false"
      @durationchange="duration = $event.target.duration"
      @timeupdate="currentTime = $event.target.currentTime"
      ref="audioEle"
    ></audio>
    <router-view
      :playing="playing"
      :currentSongId="currentSongId"
      :duration="duration"
      :currentTime="currentTime"
      @play-this-song="currentSongId = $event"
      @start-play-song="$refs.audioEle.play()"
      @pause-play-song="$refs.audioEle.pause()"
      @change-play-time="$refs.audioEle.currentTime = $event"
    />
    <PlayBar
      v-if="currentSongId && !$route.meta.hidePlayBar"
      :currentSongId="currentSongId"
      :playing="playing"
      @start-play-song="$refs.audioEle.play()"
      @pause-play-song="$refs.audioEle.pause()"
    ></PlayBar>
  </div>
</template>

<script>
import PlayBar from "@/components/PlayBar.vue";
export default {
  data() {
    return {
      duration: 0,
      currentTime: 0,
      currentSongId: null,
      playing: null,
    };
  },
  components: {
    PlayBar,
  },
};
</script>


<style lang="less" scoped>
#app {
  header {
    width: 100%;
    height: 95px;
    padding: 10px;
    box-sizing: border-box;
    background: #d43c33;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 15px 15px 0 0;

    .left {
      display: flex;
      align-items: center;
      .imgBox {
        width: 25px;
        height: 25px;
        background: white;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        img {
          width: 80%;
          height: 80%;
        }
      }
      span {
        height: 24px;
        color: white;
        font-size: 24px;
        line-height: 24px;
      }
    }

    .right {
      width: 100px;
      height: 36px;
      font-size: 16px;
      line-height: 36px;
      text-align: center;
      color: red;
      border-radius: 18px;
      background: white;
      display: block;
    }
  }
  nav {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    a {
      height: 100%;
      line-height: 40px;
      text-decoration: none;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
        border-bottom: 2px solid #42b983;
      }
    }
  }
}
</style>
