import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
var store = new Vuex.Store({
    state:{
        msg: '公用信息',
        userInfo: {}
    }
})
export default store