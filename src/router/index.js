import Vue from 'vue'
import vueRouter from 'vue-router'
import test from '@/views/test.vue'
import login from '@/views/login/index.vue'
Vue.use(vueRouter)
var router = new vueRouter({
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