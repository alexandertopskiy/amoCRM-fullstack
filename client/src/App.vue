<template>
    <a-layout class="layout">
        <a-layout-content class="layout-content">
            <LeadsTable />
        </a-layout-content>
    </a-layout>
</template>

<script setup lang="ts">
import LeadsTable from '@/components/LeadsTable.vue';
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
