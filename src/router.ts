import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: '메인페이지',
        component: ()=> import('./views/index.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;