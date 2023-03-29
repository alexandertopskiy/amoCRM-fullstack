<template>
    <div class="input-container">
        <div v-if="!isInputValid()">
            <a-tooltip title="Поиск работает от 3 символов">
                <warning-outlined class="warn-icon" />
            </a-tooltip>
        </div>
        <a-input-search
            v-model:value="searchValue"
            placeholder="Поиск сделок"
            :loading="isLoading"
            :visibilityToggle="false"
            style="width: 300px"
        />
    </div>
</template>

<script setup lang="ts">
import { WarningOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';

const searchValue = ref<string>('');

function isInputValid() {
    return !searchValue.value.length || searchValue.value.length > 3;
}

const isLoading = false;
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
