<template>
  <div id="app">
    <nav v-if="$route.meta.showNav">
      <router-link to="/">推荐音乐</router-link> |
      <router-link to="/hot">热歌榜</router-link> |
      <router-link to="/search">搜索</router-link>
    </nav>
    <audio
      v-if="currentSongId"
      controls
      style="height: 30px"
      :src="`https://music.163.com/song/media/outer/url?id=${currentSongId}.mp3`"
      @play="playing = true"
      @pause="playing = false"
      ref="audioEle"
    ></audio>
    <router-view
      @play-this-song="currentSongId = $event"
      :playing="playing"
      @start-play-song="$refs.audioEle.play()"
      @pause-play-song="$refs.audioEle.pause()"
    />
    <PlayBar
      v-if="currentSongId"
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
      currentSongId: null,
      playing: null,
    };
  },
  components: {
    PlayBar,
  },
};
</script>


<style lang="less">
* {
  padding: 0;
  margin: 0;
}
#app {
  nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
}
</style>
