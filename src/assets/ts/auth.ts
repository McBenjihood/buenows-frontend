import { reactive } from 'vue';
import { checkAuth } from '@/assets/ts/api_functions.ts';

export const authStore = reactive({
    isAuthenticated: false,
    async initialize() {
        this.isAuthenticated = await checkAuth();
    }
});