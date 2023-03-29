<template>
    <a-layout style="height: 100%">
        <a-layout-content style="padding: 0 50px; height: 100%">
            <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
        </a-layout-content>
    </a-layout>
</template>

<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
</script>

<style lang="scss">
#app {
    height: 100%;
}
</style>
