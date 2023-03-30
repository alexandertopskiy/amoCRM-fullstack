<template>
    <a-card title="Список всех сделок" :bordered="false">
        <template #extra>
            <SearchBar :isLoading="isLoading" :searchedTerm="searchTerm" @search="updateSearch" />
        </template>
        <a-table
            :dataSource="dataSource"
            rowKey="id"
            :columns="columns"
            :pagination="false"
            bordered
            :loading="isLoading"
            :scroll="{ x: true }"
        >
            <!-- Сообщение, если ничего не найдено -->
            <template #emptyText>
                <a-empty>
                    <template #description>
                        <p>Ни одной сделки не найдено</p>
                    </template>
                </a-empty>
            </template>

            <!-- Основная информация -->
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
        <a-modal :visible="!!errorMessage" :footer="null" @cancel="handleError">
            <h2>Произошла ошибка</h2>
            <p>Что-то пошло не так. Пожалуйста, повторите ошибку позже</p>
        </a-modal>
    </a-card>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import moment from 'moment';
// components
import LeadContacts from '@/components/LeadContacts.vue';
import SearchBar from '@/components/ui/SearchBar.vue';
import UserCard from '@/components/ui/UserCard.vue';

const store = useStore();
moment.locale('ru');

const searchTerm = ref('');
const isTermValid = computed(() => !searchTerm.value.length || searchTerm.value.length > 2);
const updateSearch = (newQuery: string) => (searchTerm.value = newQuery);
// задержка поиска, чтобы не делать лишних запросов, а подождать 0.3с после ввода
watch(searchTerm, function (newValue) {
    setTimeout(() => {
        if (newValue === searchTerm.value && isTermValid.value) fetchLeads();
    }, 300);
});

const errorMessage = ref(false);
const handleError = () => (errorMessage.value = false);

const isLoading = ref(false);
const fetchLeads = async function () {
    isLoading.value = true;
    try {
        await store.dispatch('getLeads', { searchQuery: searchTerm.value });
    } catch (_) {
        errorMessage.value = true;
    }
    isLoading.value = false;
};
fetchLeads();

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
