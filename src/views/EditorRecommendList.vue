<template>
  <div class="editorRecommendList">
    <section v-if="tip">
      {{ tip }}
    </section>
    <section v-else-if="playlist" class="playlist">
      <header>
        <div class="left">
          <div class="toBottom" @click="$router.back()">
            <img src="@/assets/toBottom.png" />
          </div>
          <img class="coverImg" :src="coverImgUrl" />
        </div>
        <div class="right">
          <p>{{ playlistName }}</p>
          <img :src="creatorImg" />
          <span>{{ creatorName }}</span>
        </div>
      </header>
      <section>
        <ol v-if="tracks" @click="$emit('change-song-list', tracks)">
          <MusicItemCard
            v-for="item in tracks"
            :key="item.id"
            :musicId="item.id"
            :currentSongId="currentSongId"
            :playing="playing"
            :musicName="item.name"
            :singer="
              item.ar.length == 1
                ? item.ar[0].name
                : item.ar[0].name + '/' + item.ar[1].name
            "
            :albumName="item.al.name"
            @play-this-song="$emit('play-this-song', item.id)"
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
  props: ["currentSongId", "playing"],
  components: {
    MusicItemCard,
  },
  created() {
    if (this.$route.query.id) {
      this.axios
        .get("/playlist/detail", {
          params: { id: this.$route.query.id },
        })
        .then((res) => {
          this.playlist = res.data.playlist;
          this.playlistName = res.data.playlist.name;
          this.coverImgUrl = res.data.playlist.coverImgUrl;
          this.tracks = res.data.playlist.tracks;
          this.creatorName = res.data.playlist.creator.nickname;
          this.creatorImg = res.data.playlist.creator.avatarUrl;
        })
        .catch((err) => {
          console.log("编辑推荐列表出错", err);
        });
    } else {
      this.tip = "路由参数错误";
    }
  },
};
</script>

<style lang="less" scoped>
ul,
li{
  padding: 0;
  margin: 0;
}
.editorRecommendList {
  margin-bottom: 60px;
  .playlist {
    header {
      display: flex;
      justify-content: space-around;
      color: white;
      background: linear-gradient(to top, #29313c, #475669);
      .left {
        width: 35%;
        white-space: nowrap;
        overflow: hidden;
        text-emphasis: emphasis;
        .toBottom{
          height: 30px;
          img{
            width: 20px;
            height: 20px;
          }
        }
        .coverImg {
          width: 100%;
        }
      }
      .right {
        width: 55%;
        text-align: left;
        margin-top: 50px;
        p{
          display: -webkit-box;
          -webkit-box-orient: vertical0;
        }
        img {
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