import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '@/views/About.vue'
import HomeView from '@/views/Home.vue'
import ProjectsView from '@/views/Articles.vue'
import ArticleView from '@/views/Article.vue'
import Error404View from '@/views/404.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/articles',
      name: 'articles',
      component: ProjectsView,
    },
    {
      path: '/article/:name',
      name: 'article',
      component: ArticleView,
      props: true,
    },
    {
      path: '/article',
      redirect: '/articles',
    },
    {
      path: '/404',
      name: 'error404',
      component: Error404View,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'catchAll',
      redirect: '/404',
    }
  ],
})

export default router

