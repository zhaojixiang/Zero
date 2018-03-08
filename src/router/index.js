import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue'
import { resolve } from 'path';
import Store from '../store/index'
import Win10 from '../views/win/index.vue'

import DataReplayIndex from 'views/dataReplay-new/dataReplay.vue'
import Details from 'views/dataReplay/detailsHichart'
import DetailsEchart from 'views/dataReplay/detailsEchart.vue'
import AnalyseIndexNew from 'views/analyse-new/analyse-new.vue'
import AnalyseNewTask from 'views/analyse-new/newTask.vue'
import Login from 'views/login/login-new'

const StIndex = resolve => {
  import('views/stationAnalysis/index').then(module => {
    resolve(module)
  })
}


const USERMANAGE = resolve => {
  import('components/userManage/index').then(module => {
    resolve(module)
  })
}
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'win',
      component: Win10
    },
    {
      path: '/dataReplay',
      component: App,
      children: [
        {
          path: '/dataReplay/index',
          name: 'DataReplayIndex',
          meta: {
            title: '数据回放'
          },
          component: DataReplayIndex
        },
        {
          path: '/dataReplay/details',
          name: 'Details',
          meta: {
            title: '数据回放'
          },
          component: Details
        },
        {
          path: '/dataReplay/detail-echart',
          name: 'DetailsEchart',
          meta: {
            title: '数据回放'
          },
          component: DetailsEchart
        },
      ]
    },
    {
      path: '/analyseIndex',
      component: App,
      children: [
        {
          path: '/analyse/indexNew',
          name: 'AnalyseIndexNew',
          meta: {
            title: '频谱评估分析(New)'
          },
          component: AnalyseIndexNew
        },
        {
          path: '/analyse/newTask',
          name: 'AnalyseNewTask',
          meta: {
            title: '频谱评估分析(New)'
          },
          component: AnalyseNewTask
        }
      ]
    },
    {
      path:'/stationAnalysis',
      component:App,

      children:[
        {
          path:'/stationAnalysis/index',
          meta:{
            title:'频谱评估基站分析'
          } ,
          component:StIndex
        }
      ]
    },
    {
      path: '/userManage',
      component: App,
      children: [
        {
          path: '/userManage/index',
          meta: {
            title: '用户管理'
          },
          component: USERMANAGE
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
});
router.beforeEach((to, from, next) => {
  next();
});
router.afterEach(route => {
      Store.commit('SET_HEADER_TITLE',route.meta.title)

});
export default router;
