<template>
  <div class="songListCard">
    <header>
      <div class="toBottom">
        <img src="@/assets/toBottom.png" @click="$emit('close-songList')" />
      </div>
    </header>
    <ul class="songListContent" v-if="songList != []">
      <MusicItemCard
        v-for="item in songList"
        :key="item.id"
        :musicId="item.id"
        :currentSongId="currentSongId"
        :playing="playing"
        :musicName="item.name"
        :singer="
          (item?.song?.artists?.length == 1
            ? item?.song?.artists[0]?.name
            : item?.song?.artists[0]?.name +
              ` / ` +
              item?.song?.artists[1]?.name) ||
          (item?.ar?.length == 1
            ? item?.ar[0]?.name
            : item?.ar[0]?.name + '/' + item?.ar[1]?.name)
        "
        :albumName="item?.song?.album?.name || item?.al?.name"
        @play-this-song="$emit('play-this-song', item.id)"
      ></MusicItemCard>
    </ul>
  </div>
</template>

<script>
import MusicItemCard from "@/components/MusicItemCard.vue";
export default {
  props: {
    songList: Array,
    currentSongId: Number,
    playing: Boolean,
  },
  components: {
    MusicItemCard,
  },
};
</script>

<style lang="less" scoped>
@property --direc {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

@keyframes backgroungRotate {
  to {
    --direc: 360deg;
  }
}

.songListCard {
  width: 100%;
  height: 60%;
  padding:10px ;
  box-sizing: border-box;
  overflow-y: auto;
  position: fixed;
  bottom: 0;
  border-radius: 5px;
  background-image: linear-gradient(
      var(--direc),
      #5ddcff,
      #3c67e3 43%,
      #4e00c2
    );
    animation: backgroungRotate 3s linear infinite;
  header {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    .toBottom {
      width: 30px;
      height: 30px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .songListContent {
    padding: 0;
    background: white;
  }
}
</style>