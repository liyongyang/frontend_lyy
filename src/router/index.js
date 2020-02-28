import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import detail1 from '../components/detail1.vue'
import detail2 from '../components/detail2.vue'
import detail3 from '../components/detail3.vue'
import detail4 from '../components/detail4.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect: '/detail1',
      children: [
        {
          path: 'detail1',
          component: detail1
        },
        {
          path: 'detail2',
          component: detail2
        },
        {
          path: 'detail3',
          component: detail3
        },
        {
          path: 'detail4',
          component: detail4
        }
      ]
    }
  ]
})
