<template>
  <div class="homeRecommend">
    <img class="headerImg" src="@/assets/recommend1.png" />
    <span class="title">编辑推荐</span>
    <ul class="editorRecommends">
      <EditorRecommendCard
        v-for="item in EditorRecommendData"
        :key="item.id"
        :editItem="item"
        :col="3"
      ></EditorRecommendCard>
    </ul>
    <span class="title">最新音乐</span>
    <ul
      class="latestMusic"
      v-if="latestMusicData"
      @click="$emit('change-song-list', latestMusicData)"
    >
      <MusicItemCard
        v-for="item in latestMusicData"
        :key="item.id"
        :musicId="item.id"
        :currentSongId="currentSongId"
        :playing="playing"
        :musicName="item.name"
        :singer="
          item.song.artists.length == 1
            ? item.song.artists[0].name
            : item.song.artists[0].name + ` / ` + item.song.artists[1].name
        "
        :albumName="item.song.album.name"
        @play-this-song="$emit('play-this-song', item.id)"
      ></MusicItemCard>
    </ul>
    <footer>
      <div class="logo">
        <img src="@/assets/wyylogo2.png" />
        网易云音乐
      </div>
      <div class="open">打开APP,发现更多好音乐 ></div>
      <div class="copyright">
        网易公司版权所有©1997-2024 杭州乐读科技有限公司运营
      </div>
    </footer>
  </div>
</template>

<script>
import EditorRecommendCard from "@/components/EditorRecommendCard.vue";
import MusicItemCard from "@/components/MusicItemCard.vue";
export default {
  data() {
    return {
      EditorRecommendData: [],
      latestMusicData: [],
      singer: [],
    };
  },
  props: ["currentSongId", "playing"],

  components: {
    EditorRecommendCard,
    MusicItemCard,
  },
  methods: {},
  created() {
    this.axios
      .get("/personalized")
      .then((res) => {
        this.EditorRecommendData = res.data.result.slice(0, 6);
      })
      .catch((err) => {
        console.log("编辑推荐出错", err);
      });
    this.axios
      .get("/personalized/newsong")
      .then((res) => {
        this.latestMusicData = res.data.result;
      })
      .catch((err) => {
        console.log("最新音乐出错", err);
      });
  },
};
</script>

<style lang="less" scoped>
.homeRecommend {
  margin-bottom: 60px;
  background: #fcfcfd;

  .headerImg {
    width: 100%;
    height: 60px;
  }

  .title {
    width: 100%;
    height: 40px;
    display: block;
    line-height: 40px;
    padding-left: 9px;
    box-sizing: border-box;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 40%;
      margin-top: -9px;
      width: 2px;
      height: 16px;
      background-color: #d33a31;
    }
  }

  .editorRecommends {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .latestMusic {
    padding: 0 20px;
    margin-top: 5px;
  }

  footer {
    width: 100%;
    height: 200px;
    background: url("@/assets/reCommendBackground.png") center;
    background-size: 100%;
    .logo {
      height: 40px;
      padding: 64px 0 0;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 40px;
      img {
        width: 40px;
        height: 40px;
      }
    }
    .open {
      width: 300px;
      height: 38px;
      color: rgb(250, 65, 65);
      line-height: 38px;
      text-align: center;
      margin: 15px auto;
      border-radius: 38px;
      border: 1px solid rgb(250, 65, 65);
    }
    .copyright {
      color: #888;
      font-size: 12px;
      line-height: 16px;
      text-align: center;
    }
  }
}
</style>