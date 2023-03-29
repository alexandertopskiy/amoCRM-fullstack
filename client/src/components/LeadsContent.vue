<template>
    <a-card title="Список всех сделок" :bordered="false">
        <template #extra>
            <input type="text" placeholder="Поиск сделок" />
        </template>
        <a-table :dataSource="dataSource" :columns="columns" :pagination="false" />
    </a-card>
</template>

<script setup lang="ts">
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
        'created_at': 1680077630,
        'contacts': [
            {
                'id': 3333799,
                'name': 'Михаил'
            }
        ]
    }
];

const columns = [
    {
        title: 'Название',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Бюджет',
        dataIndex: 'price',
        key: 'price'
    },
    {
        title: 'Ответственный',
        dataIndex: ['responsible_user', 'name'],
        key: 'responsible_user'
    },
    {
        title: 'Статус',
        dataIndex: ['status', 'name'],
        key: 'status'
    },
    {
        title: 'Дата создания',
        dataIndex: 'created_at',
        key: 'created_at'
    }
];
</script>
