<template>
    <a-layout class="layout">
        <a-layout-content class="layout-content">
            <LeadsContent />
        </a-layout-content>
    </a-layout>
</template>

<script setup lang="ts">
import LeadsContent from './components/LeadsContent.vue';
</script>

<style lang="scss">
#app {
    height: 100%;
}
.layout {
    height: 100%;
}
.layout-content {
    padding: 50px;
    height: 100%;
}

p {
    margin: 0;
}
</style>
