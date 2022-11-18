import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: '빈탬플릿',
        component: ()=> import('@/template/Template.vue'),
        children: [
            {
                path: '/',
                name: '메인페이지',
                component: ()=> import('@/views/index.vue'),
            },
            {
                path: '/about',
                name: 'aboutus',
                component: ()=> import('@/views/about.vue'),
            },
            {
                path: '/skill',
                name: 'skill',
                component: ()=> import('@/views/skill.vue'),
            },
            {
                path: '/history',
                name: 'history',
                component: ()=> import('@/views/history.vue'),
            },
            {
                path: '/contact',
                name: 'contact',
                component: ()=> import('@/views/contact.vue'),
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;