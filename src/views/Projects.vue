<script setup>
import { onMounted } from 'vue';
import Header from '@/components/Header.vue'

onMounted(() => {
    document.title = "Projects | Rokas Stankūnas";
});
</script>

<template>
    <Header>
        <h1 class="text-3xl font-bold underline">
            Projects
        </h1>
    </Header>
</template>