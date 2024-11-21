import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeHot from '@/views/HomeHot.vue'
import HomeRecommend from '@/views/HomeRecommend.vue'
import HomeSearch from '@/views/HomeSearch.vue'
import EditorRecommendList from '@/views/EditorRecommendList.vue'
import SongDetail from '@/views/SongDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'recommend',
    component: HomeRecommend,
    meta: { showNav: true }
  },
  {
    path: '/hot',
    name: 'hot',
    component: HomeHot,
    meta: { showNav: true }
  },
  {
    path: '/search',
    name: 'search',
    component: HomeSearch,
    meta: { showNav: true }
  },
  {
    path: '/editorRecommendList',
    name: 'editorRecommendList',
    component: EditorRecommendList
  },
  {
    path: '/songDetail',
    name: 'songDetail',
    component: SongDetail,
    meta : {hidePlayBar : true}
  },
  
]

const router = new VueRouter({
  routes
})

export default router
