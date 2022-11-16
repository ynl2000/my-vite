import { createRouter, createWebHistory } from 'vue-router'

const front = [
    // 퍼블리싱 가이드 - *프론트 scss 공유용
    {
        path: '/index',
        name: '메인페이지',
        component: ()=> import('@/index.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL)
});

export default router;