import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '@/views/About.vue'
import HomeView from '@/views/Home.vue'
import ProjectsView from '@/views/Projects.vue'

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
      path: '/contact',
      name: 'contact',
      component: ProjectsView,
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView,
    },
    {
      path: '/project/:id',
      name: 'project',
      component: ProjectsView,
      props: true,
    },
    {
      path: '/project',
      redirect: '/projects',
    },
  ],
})

export default router

