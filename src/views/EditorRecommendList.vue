<template>
  <div class="editorRecommendList">
    <section v-if="tip">
      {{ tip }}
    </section>
    <section v-else-if="playlist" class="playlist">
      <header>
        <div class="left">
          <img :src="coverImgUrl" />
        </div>
        <div class="right">
          <p>{{ playlistName }}</p>
          <img :src="creatorImg">
          <span>{{creatorName}}</span>
        </div>
      </header>
      <section>
        <ol v-if="tracks">
          <MusicItemCard
            v-for="item in tracks"
            :key="item.id"
            :musicName="item.name"
            :singer="item.ar[0].name"
            :albumName="item.al.name"
          ></MusicItemCard>
        </ol>
      </section>
    </section>
  </div>
</template>

<script>
import MusicItemCard from "@/components/MusicItemCard.vue";
export default {
  data() {
    return {
      tip: "",
      playlist: null,
      coverImgUrl: null,
      tracks: null,
      creatorImg: null,
      creatorName: null,
    };
  },
  components: {
    MusicItemCard,
  },
  created() {
    if (this.$route.query.id) {
      this.axios
        .get("https://apis.netstart.cn/music/playlist/detail", {
          params: { id: this.$route.query.id },
        })
        .then((res) => {
          this.playlist = res.data.playlist;
          this.playlistName = res.data.playlist.name;
          this.coverImgUrl = res.data.playlist.coverImgUrl;
          this.tracks = res.data.playlist.tracks;
          this.creatorName = res.data.playlist.creator.nickname;
          this.creatorImg  = res.data.playlist.creator.avatarUrl;
        });
    } else {
      this.tip = "路由参数错误";
    }
  },
};
</script>

<style lang="less" scoped>
.editorRecommendList {
  .playlist {
    header {
      display: flex;
      justify-content: space-around;
      .left {
        width: 35%;
        img {
          width: 100%;
        }
      }
      .right {
        width: 55%;
        text-align: left;
        img{
          width: 30px;
          height: 30px;
          border-radius: 50%;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>