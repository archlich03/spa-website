<script setup>
import { onMounted } from 'vue';

onMounted(() => {
    document.title = "404 | Rokas Stankūnas";
});
</script>

<template>
    <div class="container mx-auto max-w-[700px] flex flex-col items-center justify-center min-h-screen space-y-4">
        <span class="text-center text-white text-bold text-6xl">
            <h1>404 Page not found</h1>Click <RouterLink class="text-cyan-500" to="/">here</RouterLink> to go back!
        </span>
        
    </div>
</template>