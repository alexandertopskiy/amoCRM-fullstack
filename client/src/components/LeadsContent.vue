<template>
    <a-card title="Список всех сделок" :bordered="false">
        <template #extra>
            <SearchBar />
        </template>
        <a-table :dataSource="dataSource" :columns="columns" :pagination="false" rowKey="id">
            <template #bodyCell="{ column, record }">
                <!-- Ответственный -->
                <template v-if="column.key === 'responsible_user'">
                    <div class="res-user">
                        <a-avatar class="res-user-icon" size="small">
                            <template #icon><UserOutlined /></template>
                        </a-avatar>
                        {{ record.responsible_user.name }}
                    </div>
                </template>

                <!-- Статус -->
                <template v-if="column.key === 'status'">
                    <a-tag :color="record.status.color" style="color: rgba(0, 0, 0, 0.65)">{{
                        record.status.name
                    }}</a-tag>
                </template>

                <!-- Дата -->
                <template v-if="column.key === 'created_at'">
                    <p>{{ moment(record.created_at).format('D MMMM YYYY') }}</p>
                </template>

                <!-- Бюджет -->
                <template v-if="column.key === 'price'">
                    <p>{{ record.price }} ₽</p>
                </template>
            </template>
        </a-table>
    </a-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import moment from 'moment';
import { UserOutlined } from '@ant-design/icons-vue';
import SearchBar from './SearchBar.vue';

const store = useStore();
moment.locale('ru');

const dataSource = computed(() => store.getters.leads);

const columns = [
    {
        title: 'Название',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Статус',
        dataIndex: ['status', 'name'],
        key: 'status'
    },
    {
        title: 'Ответственный',
        dataIndex: ['responsible_user', 'name'],
        key: 'responsible_user'
    },
    {
        title: 'Дата создания',
        dataIndex: 'created_at',
        key: 'created_at'
    },
    {
        title: 'Бюджет (руб)',
        dataIndex: 'price',
        key: 'price'
    }
];
</script>

<style scoped lang="scss">
.res-user {
    display: flex;
    align-items: center;

    &-icon {
        margin-right: 5px;
    }
}
</style>
