<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import articleData from '../assets/metadata.json';
import MarkdownIt from 'markdown-it';

const route = useRoute();
const router = useRouter();

const articles = ref(articleData.articles).value;
const articleIdName = computed(() => route.params.name).value;
const articleId = articles.findIndex(article => article.id === articleIdName);

const articleExists = computed(() => {
    return articles.some(article => article.id === articleIdName);
});

const md = MarkdownIt();

const articleContent = ref('');

async function loadArticle() {
    if (articleExists.value) {
        const article = articles.find(article => article.id === articleIdName);
        const module = await import(`../assets/articles/${article.id}.md?raw`);
        return md.render(module.default);
    }
    return '<p>404 not found</p>';
}

onMounted(async () => {
    articleContent.value = await loadArticle();

    if (articleExists.value) {
        document.title = `${articles[articleId].seo.title} | Rokas Stankūnas`;
    }
});
</script>

<template>
    <Header>
        <span class="markdown" v-html="articleContent"></span>
        <Footer></Footer>
    </Header>
</template>