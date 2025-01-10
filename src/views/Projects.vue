<script setup>
import { ref, onMounted } from 'vue';
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue';
import articleData from '../assets/metadata.json'

const articleCount = ref(articleData.count);
const articles = ref(articleData.articles);

onMounted(() => {
    document.title = "Projects | Rokas Stankūnas";
});
</script>

<template>
    <Header>
        <h1 class="text-3xl font-bold">
            Projects
        </h1>
        <p>
            Here are some of the projects I've worked on. Click on them to see more details.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div v-for="article in articles" :key="article.id" class="card w-full bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">{{ article.seo.title }}</h2>
                    <h3 class="card-subtitle">{{ article.seo.description }}</h3>
                    <p class="italic">{{ article.seo.created_at }}</p>
                    <a :href="`/project/${article.id}`" rel="noopener noreferrer" class="btn btn-outline btn-info">
                        More Details
                    </a>
                </div>
            </div>
        </div>
        <Footer />
    </Header>
</template>

