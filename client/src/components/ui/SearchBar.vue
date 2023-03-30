<template>
    <div class="input-container">
        <div v-if="!isInputValid">
            <a-tooltip title="Поиск работает от 3 символов">
                <warning-outlined class="warn-icon" />
            </a-tooltip>
        </div>
        <!-- v-model:value="searchValue" -->
        <a-input-search
            placeholder="Поиск сделок"
            :loading="isLoading"
            :visibilityToggle="false"
            style="width: 300px"
            :value="searchedTerm"
            @change="search"
        />
    </div>
</template>

<script setup lang="ts">
import { WarningOutlined } from '@ant-design/icons-vue';
import { computed, defineProps, defineEmits } from 'vue';

const props = defineProps({
    isLoading: Boolean,
    searchedTerm: String
});
const emit = defineEmits<{
    (event: 'search', newTerm: string): void;
}>();

// const searchValue = ref<string>('');
const isInputValid = computed(() => !props.searchedTerm?.length || props.searchedTerm?.length > 2);

const search = function (event: Event) {
    console.log(isInputValid.value);
    // if (!isInputValid.value) return;
    const newTerm: string = (event.target as HTMLInputElement).value;
    emit('search', newTerm);
};
</script>

<style scoped>
.input-container {
    display: flex;
    align-items: center;
}
.warn-icon {
    color: #fa8c16;
    font-size: 1rem;
    margin-right: 10px;
}
</style>
