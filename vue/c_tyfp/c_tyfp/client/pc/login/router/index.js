import Vue from 'vue'
import Router from 'vue-router'

const QueryPage = () => import('login/page/QueryPage.vue')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'QueryPage',
      component: QueryPage
    },{
      path: '/QueryPage',
      name: 'QueryPageChild',
      component: QueryPage
    }
  ]
})

