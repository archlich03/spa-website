<script setup>
import { onMounted } from 'vue';
import HomeButtons from '@/components/HomeButtons.vue';

onMounted(() => {
    document.title = "Home | Rokas Stankūnas";
    
    const descriptionMetaTag = document.querySelector('meta[name="description"]');
    const keywordsMetaTag = document.querySelector('meta[name="keywords"]');
    const canonicalLinkTag = document.querySelector('link[rel="canonical"]');

    if (descriptionMetaTag) {
        descriptionMetaTag.setAttribute('content', "Welcome to my small corner of the internet!");
    }

    if (keywordsMetaTag) {
        keywordsMetaTag.setAttribute('content', "website, portfolio");
    }

    if (canonicalLinkTag) {
        canonicalLinkTag.setAttribute('href', "https://stankunas.me/");
    }
});
</script>

<template>
    <div class="container mx-auto max-w-[700px] flex flex-col items-center justify-center min-h-screen space-y-4">
        <span class="text-center text-white text-bold text-6xl">
            <h1>Hello, I'm Rokas.</h1>Welcome to my small corner of the internet!
        </span>
        <HomeButtons />
    </div>
</template>