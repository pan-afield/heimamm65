import Vue from 'vue'
import VueRouter from 'vue-router'
import test from '@/views/test.vue'
import login from '@/views/login/index.vue'
Vue.use(VueRouter)
var router = new VueRouter({
    routes: [
        {
        path: '/test',
        component:test
    },
    {
        path: '/login',
        component:login
    }
    ]
})
export default router