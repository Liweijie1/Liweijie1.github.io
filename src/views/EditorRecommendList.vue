<template>
  <div>
    <section v-if="tip">
      {{tip}}
      
    </section>
    <section v-else-if="playlist">
      <header>
        {{ playlist.name }}
      </header>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playlist: null,
      tip: "",
    };
  },
  created() {
    if(this.$route.query.id){
      this.axios
      .get("https://apis.netstart.cn/music/playlist/detail", {
        params: { id: this.$route.query.id },
      })
      .then((res) => {
        this.playlist = res.data.playlist;
        console.log(this.playlist);
        console.log(this.playlist.name);
      });
    }else{
      this.tip = "路由参数错误"
    }
    
  },
};
</script>

<style lang="less" scoped>
</style>