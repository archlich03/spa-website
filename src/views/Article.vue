<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import articleData from '../assets/metadata.json';
import MarkdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.min.css';

const route = useRoute();
const router = useRouter();

const articles = ref(articleData.articles).value;
const articleIdName = computed(() => route.params.name).value;
const articleId = articles.findIndex(article => article.id === articleIdName);

const articleExists = computed(() => {
    return articles.some(article => article.id === articleIdName);
});

const md = MarkdownIt({
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(str, { language: lang }).value;
            } catch (__) {}
        }
        return ''; // use external default escaping
    }
}).use(markdownItAnchor, {
    level: 2,
    permalink: markdownItAnchor.permalink.linkInsideHeader({
        symbol: `<span aria-hidden="true">#</span>`,
        placement: 'before'
    })
})

const articleContent = ref('');
const articleTitle = ref('');
const articleImage = ref('');
const articleKeywords = ref([]);
const articleCreatedAt = ref('');

async function loadArticle() {
    if (articleExists.value) {
        const article = articles.find(article => article.id === articleIdName);
        articleTitle.value = article.seo.title;
        articleImage.value = article.seo.image;
        articleKeywords.value = article.seo.keywords;
        articleCreatedAt.value = article.seo.created_at;
        const module = await import(`../assets/articles/${article.id}.md?raw`);
        return md.render(module.default);
    }
    return false;
}

onMounted(async () => {
    articleContent.value = await loadArticle();

    if (articleExists.value) {
        document.title = `${articleTitle.value} | Rokas Stankūnas`;
    } else {
        router.push('/404');
    }

    const descriptionMetaTag = document.querySelector('meta[name="description"]');
    const keywordsMetaTag = document.querySelector('meta[name="keywords"]');
    const canonicalLinkTag = document.querySelector('link[rel="canonical"]');

    if (descriptionMetaTag) {
        descriptionMetaTag.setAttribute('content', `${articleTitle.value}`);
    }

    if (keywordsMetaTag) {
        keywordsMetaTag.setAttribute('content', articleKeywords.value.join(', '));
    }

    if (canonicalLinkTag) {
        canonicalLinkTag.setAttribute('href', `https://stankunas.me/article/${articles[articleId].id}`);
    }
});
</script>

<template>
    <Header>
        <h1 class="text-3xl font-bold text-center">{{ articleTitle }}</h1>
        <img class="mx-auto sm:w-1/2 md:w-1/3 w-full p-5" :src="`${articleImage}`" :alt="`${articleTitle} image`">
        
        <div class="flex flex-wrap gap-2 justify-center">
            <span v-for="(keyword, index) in articleKeywords" :key="index" class="badge badge-outline">{{ keyword }}</span>
        </div>
        <p class="text-right italic">Created at {{ articleCreatedAt }}</p>
        <span class="markdown" v-html="articleContent"></span>
        <Footer></Footer>
    </Header>
</template>

