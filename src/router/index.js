import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress'
import {getToken} from "../utils/auth";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/login')
    },

    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/dashboard'),
        meta: { title: 'Dashboard | People Tracking' },
        beforeEnter: (to, from, next) => {
            if (getToken()) {
                next()
            } else {
                next({path: '/login'})
            }
        }
    },

    {
        path: '/location',
        name: 'Location',
        component: () => import('../views/location'),
        meta: { title: 'Location | People Tracking' },
        beforeEnter: (to, from, next) => {
            if (getToken()) {
                next()
            } else {
                next({path: '/login'})
            }
        }
    },

    {
        path: '/camera',
        name: 'Camera',
        component: () => import('../views/camera'),
        meta: { title: 'Camera | People Tracking' },
        beforeEnter: (to, from, next) => {
            if (getToken()) {
                next()
            } else {
                next({path: '/login'})
            }
        }
    },

    {
        path: '/people',
        name: 'Camera',
        component: () => import('../views/people'),
        meta: { title: 'People | People Tracking' },
        beforeEnter: (to, from, next) => {
            if (getToken()) {
                next()
            } else {
                next({path: '/login'})
            }
        }
    },

    {
        path: '/people-record',
        name: 'PeopleRecord',
        component: () => import('../views/peoplerecord'),
        meta: { title: 'People Record | People Tracking' },
        beforeEnter: (to, from, next) => {
            if (getToken()) {
                next()
            } else {
                next({path: '/login'})
            }
        }
    },

    {
        path: '/*',
        name: 'PageNotFound',
        component: () => import('../views/pagenotfound'),
        meta: { title: 'Page Not Found | People Tracking' },
    },

];

const router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        return {x: 0, y: 0}
    },

});

router.beforeEach((to, from, next) => {
    NProgress.configure({ easing: 'ease', speed: 500});
    NProgress.start();
    next()
});

router.afterEach(() => {
    NProgress.done(true)
});

const DEFAULT_TITLE = 'People Tracking | We Have Eye On You';
router.afterEach((to, from) => {
    Vue.nextTick(() => {
        document.title = to.meta.title || DEFAULT_TITLE;
    });
});

export default router;
