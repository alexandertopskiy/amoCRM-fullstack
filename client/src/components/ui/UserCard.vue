<template>
    <div class="res-user">
        <a-avatar class="res-user-icon" size="small">
            <template #icon><UserOutlined /></template>
        </a-avatar>
        {{ user.name }}
        <a v-if="user.phone" :href="phoneLink">
            <PhoneTwoTone />
        </a>
        <a v-if="user.email" :href="emailLink">
            <MailOutlined />
        </a>
    </div>
</template>

<script setup lang="ts">
import { UserOutlined, PhoneTwoTone, MailOutlined } from '@ant-design/icons-vue';
import { defineProps, computed } from 'vue';
import IUser from '@/types/IUser';

const props = defineProps<{ user: IUser }>();

const phoneLink = computed(() => 'tel:' + props.user.phone);
const emailLink = computed(() => 'mailto:' + props.user.email);
</script>

<style scoped lang="scss">
.res-user {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
</style>
