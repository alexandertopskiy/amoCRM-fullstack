<template>
    <a-card title="Список всех сделок" :bordered="false">
        <template #extra>
            <SearchBar />
        </template>
        <a-table :dataSource="dataSource" :columns="columns" :pagination="false" rowKey="id" bordered>
            <template #bodyCell="{ column, record, index }">
                <!-- Номер -->
                <template v-if="column.key === 'index'">
                    {{ index + 1 }}
                </template>

                <!-- Ответственный -->
                <template v-if="column.key === 'responsible_user'">
                    <UserCard :user="record.responsible_user" />
                </template>

                <!-- Статус -->
                <template v-if="column.key === 'status'">
                    <a-tag :color="record.status.color" style="color: rgba(0, 0, 0, 0.65)">{{
                        record.status.name
                    }}</a-tag>
                </template>

                <!-- Бюджет -->
                <template v-if="column.key === 'price'">
                    <p>{{ record.price }} ₽</p>
                </template>

                <!-- Дата -->
                <template v-if="column.key === 'created_at'">
                    <p>{{ moment(record.created_at).format('D MMMM YYYY') }}</p>
                </template>
            </template>

            <!-- Выпадающий список с контактами -->
            <template #expandedRowRender="{ record }">
                <LeadContacts :contacts="record.contacts" />
            </template>
        </a-table>
    </a-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import moment from 'moment';
// components
import LeadContacts from '@/components/LeadContacts.vue';
import SearchBar from '@/components/ui/SearchBar.vue';
import UserCard from '@/components/ui/UserCard.vue';

const store = useStore();
moment.locale('ru');

const dataSource = computed(() => store.getters.leads);

const columns = [
    { title: '#', key: 'index' },
    { title: 'Название', dataIndex: 'name', key: 'name' },
    { title: 'Бюджет (руб)', dataIndex: 'price', key: 'price' },
    { title: 'Статус', key: 'status' },
    { title: 'Ответственный', key: 'responsible_user' },
    { title: 'Дата создания', dataIndex: 'created_at', key: 'created_at' }
];
</script>
