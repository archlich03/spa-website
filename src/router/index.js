import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '@/views/About.vue'
import HomeView from '@/views/Home.vue'
import ProjectsView from '@/views/Projects.vue'
import ProjectView from '@/views/Project.vue'
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
      path: '/projects',
      name: 'projects',
      component: ProjectsView,
    },
    {
      path: '/project/:name',
      name: 'project',
      component: ProjectView,
      props: true,
    },
    {
      path: '/project',
      redirect: '/projects',
    }
  ],
})

export default router

