<template>
    <p v-if="contacts.length === 0" style="text-align: center">Нет Контактов, связанных со сделкой</p>
    <template v-else>
        <a-table :dataSource="contacts" :columns="columns" :pagination="false" rowKey="id">
            <!-- :locale="{ emptyText: 'Нет данных' }" -->
            <template #title>
                <h4 style="text-align: center">Все контакты, связанные со сделкой</h4>
            </template>
            <template #bodyCell="{ column, record, index }">
                <template v-if="column.key === 'index'">
                    {{ index + 1 }}
                </template>
                <template v-if="column.key === 'name'">
                    <UserCard :user="record" />
                </template>
            </template>
        </a-table>
    </template>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import IUser from '@/types/IUser';
import UserCard from '@/components/ui/UserCard.vue';

defineProps<{ contacts: IUser[] }>();

const columns = [
    { title: '#', key: 'index' },
    { title: 'Имя', dataIndex: 'name', key: 'name' },
    { title: 'Номер телефона', dataIndex: 'phone', key: 'phone' },
    { title: 'Почта', dataIndex: 'email', key: 'email' }
];
</script>
