<script setup>
import { onMounted } from 'vue';
import HomeButtons from '@/components/HomeButtons.vue'

onMounted(() => {
    document.title = "Home | Rokas Stankūnas";
});
</script>

<template>
    <div class="container mx-auto max-w-[700px] flex flex-col items-center justify-center min-h-screen space-y-4">
        <p class="text-center text-white text-bold text-6xl">
            Hello, I'm Rokas. Welcome to my small corner of the internet!
        </p>
        <HomeButtons />
    </div>
</template>