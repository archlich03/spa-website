<template>
    <li :class="{ 'text-cyan-500': $route.path === '/' }"><RouterLink to="/">Home</RouterLink></li>
    <li :class="{ 'text-cyan-500': $route.path === '/about' }"><RouterLink to="/about">About</RouterLink></li>
    <li :class="{ 'text-cyan-500': $route.path === '/projects' }"><RouterLink to="/projects">Projects</RouterLink></li>
    <li :class="{ 'text-cyan-500': $route.path === '/contact' }"><RouterLink to="/contact">Contact</RouterLink></li>
</template>

