import { createStore } from 'vuex';

export default createStore({
    state: {
        isLoading: false,
        searchQuery: '',
        leads: [
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
                        'name': 'Михаил',
                        'phone': '333777',
                        'email': 'alex@test.com'
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
        ]
    },
    getters: {
        isLoading(state) {
            return state.isLoading;
        },
        searchQuery(state) {
            return state.searchQuery;
        },
        leads(state) {
            return state.leads;
        }
    },
    mutations: {},
    actions: {},
    modules: {}
});
