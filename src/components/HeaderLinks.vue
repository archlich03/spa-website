<template>
    <li :class="{ 'text-cyan-500': $route.path === '/' }"><RouterLink to="/">Home</RouterLink></li>
    <li :class="{ 'text-cyan-500': $route.path === '/about' }"><RouterLink to="/about">About</RouterLink></li>
    <li :class="{ 'text-cyan-500': $route.path === '/articles' }"><RouterLink to="/articles">Articles</RouterLink></li>
</template>

