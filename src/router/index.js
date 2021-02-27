import Vue from 'vue'
import VueRouter from 'vue-router'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import test from '@/views/test.vue'
import login from '@/views/login/index.vue'
import Home from '@/views/home/index.vue'
import chart from '@/views/home/chart/chart.vue'
import question from '@/views/home/question/question.vue'
import subject from '@/views/home/subject/subject.vue'
import business from '@/views/home/business/business.vue'
import userList from '@/views/home/userList/userList.vue'
Vue.use(VueRouter)
var router = new VueRouter({
    routes: [
        {
        path: '/test',
        component:test,
        meta:{
            msg:'测试'
        }
    },
    {
        path: '/login',
        component:login,
        meta:{
            msg:'登录'
        }
    },
    {
        path: '/',
        component:Home,
        meta:{
            msg:'首页'
        }
    },
    {
        path: '/home',
        component:Home,
        meta:{
            msg:'首页'
        },
        children:[
            {
                path: '/home/chart',
                component: chart,
                meta:{
                    msg:'数据概览'
                }
            },
            {
                path: '/home/userList',
                component: userList,
                meta:{
                    msg:'用户列表'
                }
            },
            {
                path: '/home/question',
                component: question,
                meta:{
                    msg:'题库列表'
                }
            },
            {
                path: '/home/business',
                component: business,
                meta:{
                    msg:'企业列表'
                }
            },
            {
                path: '/home/subject',
                component: subject,
                meta:{
                    msg:'学科列表'
                }
            },
        ]
    }
    ]
})

router.beforeEach((to,from,next) => {
    console.log(to);
    console.log(from);
    Nprogress.start()
    next()
})
router.afterEach((to,from) => {
    console.log(to);
    console.log(from);
    Nprogress.done()
    document.title = to.meta.msg
})

export default router