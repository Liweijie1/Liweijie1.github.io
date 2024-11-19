import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeHot from '@/views/HomeHot.vue'
import HomeRecommend from '@/views/HomeRecommend.vue'
import HomeSearch from '@/views/HomeSearch.vue'
import EditorRecommendList from '@/views/EditorRecommendList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'recommend',
    component: HomeRecommend
  },
  {
    path: '/hot',
    name: 'hot',
    component: HomeHot
  },
  {
    path: '/search',
    name: 'search',
    component: HomeSearch
  },
  {
    path: '/editorRecommendList',
    name: 'editorRecommendList',
    component: EditorRecommendList
  },
  
]

const router = new VueRouter({
  routes
})

export default router
