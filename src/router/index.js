import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue'
import { resolve } from 'path';
import Store from '../store/index'
import Equipment from '../views/equipmentControl/public/equipment.vue'
import EquipmentIndex from '../views/equipmentControl/index/index.vue'
import Situation from '../views/equipmentControl/facilitiesCondition/situation.vue'
import Situation1 from '../views/equipmentControl/facilitiesCondition/situation1.vue'
import Situation2 from '../views/equipmentControl/facilitiesCondition/situation2.vue'
import Win10 from '../views/win/index.vue'
import Situation3 from '../views/equipmentControl/facilitiesCondition/situation3.vue'
import Gdp from '../views/equipmentControl/gdp/gdp.vue'
import People from '../views/equipmentControl/people/people.vue'
import Area from '../views/equipmentControl/area/area.vue'
import Num from '../views/equipmentControl/number/number.vue'
import Worker from '../views/equipmentControl/worker/worker.vue'
import WorkAnalyze from '../views/equipmentControl/workAnalyze/workAnalyze1.vue'

import DataReplayIndex from '../views/dataReplay/dataReplay.vue'
import Details from '../views/dataReplay/details.vue'
import StationManageIndex from '../views/stationManage/index.vue'
import StationManageDrag from '../views/stationManage/stationManageDrag.vue'
import StationShowIndex from 'views/stationShow/stationShow.vue'
import AnalyseIndex from 'views/analyse/analyse1.vue'

// import ActivitiesSupport from 'activitiesSupport/activitiesSupport.vue'
// import ZonesChoice from 'activitiesSupport/zonesChoice.vue'
// import SignalGet from 'activitiesSupport/signalGet.vue'
// import BarGraph from 'base/barGraph'
// import Support from 'views/activitiesSupport/index'

const AsIndex = resolve => {
  import('views/activitiesSupport/index').then(module => {
    resolve(module)
  })
}

const SinglIndex = resolve => {
  import('views/signalMultidimensionalAnalysis/index').then(module => {
    resolve(module)
  })
}

const SaIndex = resolve => {
  import('views/stationAuxiliary/index').then(module => {
    resolve(module)
  })
}

const StIndex = resolve => {
  import('views/stationAnalysis/index').then(module => {
    resolve(module)
  })
}

const SkyIndex = resolve => {
  import('views/spaceOfSkyAnalysis/index').then(module=>{
    resolve(module)
  })
}

const High = resolve => {
  import('base/highchartLine').then(module=>{
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
      path: '/equipment',
      component: App,
      children: [
        {
          path: '/equipment/index',
          name: 'EquipmentIndex',
          component: EquipmentIndex
        },
        {
          path: '/equipment/WorkAnalyze',
          name: 'WorkAnalyze',
          component: WorkAnalyze
        },
        {
          path:'/equipment',
          component:Equipment,
          children:[
            {
              path: '/equipment/situation',
              component: Situation,
              children: [
                {
                  path: '/equipment/situation',
                  name: 'Situation1',
                  meta: {
                    active: '1',
                  },
                  component: Situation1,
                },
                {
                  path: '/equipment/situation2',
                  name: 'Situation2',
                  meta: {
                    active: '1',
                  },
                  component: Situation2,
                },
                {
                  path: '/equipment/situation3',
                  name: 'Situation3',
                  meta: {
                    active: '1',
                  },
                  component: Situation3,
                },
              ]
            },
            {
              path: '/equipment/gdp',
              name: 'Gdp',
              meta: {
                active: '2',
              },
              component: Gdp,
            },
            {
              path: '/equipment/people',
              name: 'People',
              meta: {
                active: '3',
              },
              component: People
            },
            {
              path: '/equipment/area',
              name: 'Area',
              meta: {
                active: '4',
              },
              component: Area
            },
            {
              path: '/equipment/number',
              name: 'Num',
              meta: {
                active: '5',
              },
              component: Num
            },
            {
              path: '/equipment/worker',
              name: 'Worker',
              meta: {
                active: '6',
              },
              component: Worker
            }
          ]
        }
      ]
    },
    {
      path: '/activities',
      component: App,
      children: [
        {
          path: '/activities/index',
          component: AsIndex,
          meta: {
            active: '1',
            title: '重大活动保障辅助'
          }
        }
      ]
    },
    {
      path: '/dataReplay',
      component: App,
      children: [
        {
          path: '/dataReplay/index',
          name: 'DataReplayIndex',
          component: DataReplayIndex
        },
        {
          path: '/dataReplay/details',
          name: 'Details',
          component: Details
        }
      ]
    },
    {
      path: '/StationManageIndex',
      component: App,
      children: [
        {
          path: '/stationManage/index',
          meta: {
            title: '频率台站管理'
          },
          name: 'StationManageIndex',
          component: StationManageIndex
        },
        {
          path: '/stationManage/show',
          name: 'StationManageShow',
          meta: {
            title: '频率台站管理'
          },
          component: StationManageDrag
        }
      ]
    },
    {
      path: '/stationShowIndex',
      component: App,
      children: [
        {
          path: '/stationShow/index',
          name: 'StationShowIndex',
          meta: {
            active: '1',
            title: '台站显示'
          },
          component: StationShowIndex
        }
      ]
    },
    {
      path: '/analyseIndex',
      component: App,
      children: [
        {
          path: '/analyse/index',
          name: 'AnalyseIndex',
          meta: {
            title: '频谱评估分析'
          },
          component: AnalyseIndex
        }
      ]
    },
    {
      path: '/multidimensional',
      component: App,

      children:[
        {
          path:'/multidimensional/index',
          meta:{
            title:'信号多维分析'
          } ,
          component:SinglIndex
        }
      ]
    },
    {
      path:'/stationAuxiliary',
      component:App,

      children:[
        {
          path:'/stationAuxiliary/index',
          meta:{
            title:'台站辅助选址'
          } ,
          component:SaIndex
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
      path:'/skyAnalysis',
      component:App,

      children:[
        {
          path:'/skyAnalysis/index',
          meta:{
            title:'频域空域分析'
          } ,
          component:SkyIndex
        }
      ]
    },
    {
      path:'/highchart',
      component:High
    }
  ]
});
// let loadingOption = {
//   lock: true,
//   text: 'Loading',
//   spinner: 'el-icon-loading',
//   background: 'rgba(0, 0, 0, 0.7)'
// };
// let loadingInstance = {};

router.beforeEach((to, from, next) => {
  // loadingInstance = Loading.service(loadingOption);
  next();
});
router.afterEach(route => {
      // loadingInstance.close();
      // console.log(router.app.$store.state)
      console.log(route)
      Store.commit('SET_HEADER_TITLE',route.meta.title)

});
export default router;
