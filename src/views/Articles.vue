<script setup>
import { ref, onMounted } from 'vue';
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue';
import articleData from '../assets/metadata.json'

const articles = ref(articleData.articles);

onMounted(() => {
    document.title = "Articles | Rokas Stankūnas";

    const descriptionMetaTag = document.querySelector('meta[name="description"]');
    const keywordsMetaTag = document.querySelector('meta[name="keywords"]');
    const canonicalLinkTag = document.querySelector('link[rel="canonical"]');

    if (descriptionMetaTag) {
        descriptionMetaTag.setAttribute('content', "This pages is made to show my latest projects with various technologies. I use these texts as a reference. Click on each one to see more details.");
    }

    if (keywordsMetaTag) {
        keywordsMetaTag.setAttribute('content', "website, portfolio");
    }

    if (canonicalLinkTag) {
        canonicalLinkTag.setAttribute('href', "https://stankunas.me/projects");
    }
});

</script>

<template>
    <Header>
        <h1 class="text-3xl font-bold">
            Articles
        </h1>
        <p>
            This page is made to show my latest projects while tinkering with various technologies. I use these texts as a reference. Click on each one to see more details.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div v-for="article in articles" :key="article.id" class="card w-full bg-base-100 shadow-xl">
                <figure>
                    <img :src="`../${article.seo.image}`" :alt="`${article.seo.title} image`" class="w-full h-48 object-cover">
                </figure>
                <div class="card-body">
                    <h2 class="card-title">{{ article.seo.title }}</h2>
                    <h3 class="card-subtitle">{{ article.seo.description }}</h3>
                    <p class="text-right italic">Created at {{ article.seo.created_at }}</p>
                    <RouterLink :to="`/article/${article.id}`" rel="noopener noreferrer" class="btn btn-outline btn-info">
                        More Details
                    </RouterLink>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </Header>
</template>

