<script setup>
import { ref, onMounted } from 'vue';
import Header from '@/components/Header.vue';
import AboutExperience from '@/components/AboutExperience.vue';
import AboutCertifications from '@/components/AboutCertifications.vue';
import AboutEducation from '@/components/AboutEducation.vue';
import Footer from '@/components/Footer.vue';

onMounted(() => {
    document.title = "About me | Rokas Stankūnas";
});

const activeTab = ref('Experience');

function setActiveTab(tab) {
    activeTab.value = tab;
}
</script>

<template>
    <Header>
        <div class="content flex items-center justify-center">
            <div class="text-center">
                <h1 class="text-5xl font-bold">
                    About me
                </h1>
            </div>
        </div>
        <div role="tablist" class="flex flex-wrap space-x-4 justify-center my-8 px-4">
            <a role="tab" :class="{ 'text-cyan-500 border-b-2 border-cyan-500 pb-1 cursor-pointer': activeTab === 'Experience', 'text-gray-500 hover:text-cyan-500 transition-colors duration-300 cursor-pointer': activeTab !== 'Experience' }" @click="setActiveTab('Experience')">Experience</a>
            <a role="tab" :class="{ 'text-cyan-500 border-b-2 border-cyan-500 pb-1 cursor-pointer': activeTab === 'Certifications', 'text-gray-500 hover:text-cyan-500 transition-colors duration-300 cursor-pointer': activeTab !== 'Certifications' }" @click="setActiveTab('Certifications')">Certifications</a>
            <a role="tab" :class="{ 'text-cyan-500 border-b-2 border-cyan-500 pb-1 cursor-pointer': activeTab === 'Education', 'text-gray-500 hover:text-cyan-500 transition-colors duration-300 cursor-pointer': activeTab !== 'Education' }" @click="setActiveTab('Education')">Education</a>
        </div>
        <div v-if="activeTab === 'Experience'" role="tabpanel" class="mt-8 space-y-4">
            <AboutExperience />
        </div>
        <div v-if="activeTab === 'Certifications'" role="tabpanel" class="mt-8 space-y-4">
            <AboutCertifications />
        </div>
        <div v-if="activeTab === 'Education'" role="tabpanel" class="mt-8 space-y-4">
            <AboutEducation />
        </div>
        <Footer />
    </Header>
</template>

