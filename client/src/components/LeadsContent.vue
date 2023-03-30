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
            </template>
        </a-table>
    </a-card>
</template>

<script setup lang="ts">
import { UserOutlined } from '@ant-design/icons-vue';
import SearchBar from './SearchBar.vue';

const dataSource = [
    {
        'id': 1804003,
        'name': 'Продажа мешка картошки',
        'price': 100,
        'responsible_user': {
            'id': 68,
            'name': 'тест',
            'email': 'test@test.test'
        },
        'status': {
            'id': 56277310,
            'name': 'Согласование договора',
            'color': '#ffcccc'
        },
        'created_at': '2023-03-29T08:13:50.000Z',
        'contacts': [
            {
                'id': 3333799,
                'name': 'Михаил'
            }
        ]
    },
    {
        'id': 1860343,
        'name': 'Чебупели по акции',
        'price': 149,
        'responsible_user': {
            'id': 9428602,
            'name': 'alexander',
            'email': 'dai_digi_dig_dai@mail.ru'
        },
        'status': {
            'id': 56277298,
            'name': 'Первичный контакт',
            'color': '#99ccff'
        },
        'created_at': '2023-03-29T16:22:59.000Z',
        'contacts': []
    }
];

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
