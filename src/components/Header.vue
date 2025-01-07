<script setup>
import { ref } from 'vue';
import HeaderLinks from '@/components/HeaderLinks.vue';

const isOpen = ref(false);

function openNav() {
  isOpen.value = true;
}

function closeNav() {
  isOpen.value = false;
}
</script>

<template>
  <div class="drawer lg:drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
        <div class="lg:hidden fixed z-10 top-0 left-0 w-full h-screen bg-black bg-opacity-90" :class="{ 'hidden': !isOpen }">
            <a href="javascript:void(0)" class="closebtn" @click="closeNav">&times;</a>
            <div class="overlay-content">
                <ul class="menu p-4 w-full text-center text-5xl">
                    <HeaderLinks />
                </ul>
            </div>
        </div>
        <div class="m-4 lg:m-4" :class="{'mt-16 lg:mt-6': true}">
            <slot></slot>
        </div>
    </div>
    <div class="drawer-side lg:block hidden bg-zinc-900 pt-[40vh] h-screen">
        <ul class="menu p-4 overflow-y-auto w-80 text-base-content text-2xl">
            <HeaderLinks />
        </ul>
    </div>
    <span
        v-if="!isOpen"
        class="lg:hidden fixed z-20 top-4 left-4 text-white text-3xl cursor-pointer"
        @click="openNav"
        >
        &#9776; open
        </span>
  </div>
</template>

<style>
.overlay-content {
  position: relative;
  top: 25%;
  width: 100%;
  text-align: center;
}
.closebtn {
  position: absolute;
  top: 20px;
  right: 45px;
  font-size: 60px;
  color: #818181;
  transition: 0.3s;
}
.closebtn:hover {
  color: #f1f1f1;
}
</style>


