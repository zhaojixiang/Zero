import {
  mapGetters,
  mapMutations
} from 'vuex'

export const menuShowMixin = {
  computed: {
    ...mapGetters([
      'menuShow'
    ])
  },
  mounted() {
    this.setMenuShow(false)
  },
  methods: {
    ...mapMutations({
      setMenuShow: 'SET_MENU_SHOW'
    })
  },
  beforeDestroy() {
    this.setMenuShow(true)
  }
};

export const getFacilityType = {
  data() {
    return {
      legend: [],
    }
  },
  methods: {
    initLegend: function () {
      this.$http.get('api/HomePage/FacilityType').then(res => {
        this.legend = res.data;
      });
    }
  }
};

// 单页头标题
export const headerTitle = {
  computed: {
    ...mapGetters([
      'headerTitle'
    ])
  }
}

// 组件淡入淡出动画
export const animateMixin = {
  data () {
    return {
      fadeOutCss: 'animated fadeOutLeft',
      lightSpeedOut: 'animated lightSpeedOut',
      zoomOutCss: 'animated zoomOut',
      fadeInCss: 'animated fadeInLeft',
      lightSpeedIn: 'animated lightSpeedIn',
      zoomInCss: 'animated zoomIn',
      bounceInDown: 'animated bounceInDown',
      bounceOutUp: 'animated bounceOutUp',
      flipInY: 'animated flipInY',
      flipOutY: 'animated flipOutY',
      slideInUp: 'animated slideInUp',
      slideOutDown: 'animated slideOutDown',
      fade: {
        stationManage: {
          filtrate: true,
          tab: false,
          pie: false,
          figure: false,
          fixStation: true,
          multiFilter: true
        },
        stationShow: {
          inquire: true,
          info: false,
          refer: false,
          stationInfo: false
        },
        dataReplay: {
          inquire: true,
          paging: false,
          showLine: false,
          chart: false
        },
        analyse: {
          overview: false,
          overview_: false,
          analyseForm: true,
          analyseForm_: true,
          paging: false,
          paging_: false,
          channel: false,
          channel_: false,
          tweentyFourHours: false,
          tweentyFourHours_: false,
          taskManage: false,
          taskManage_: false
        },
        stationAnalyse: {
          filter:true,
          filter_:true,
          allStation: false,
          allStation_: false,
          operator: false,
          operator_: false,
          tech: false,
          tech_: false,
          other: false,
          other_: false
        },
        spaceOfSkyAnalysis: {
          relation: false,
          partCover: false,
          errSum: false
        },
        activities: {
          activity: false,
          zonesChoice: false,
          errorSignl: false,
          barGraph: false,
          bottomBar: false
        },
        signalMultidimensional: {
          analysisRelevant: true,
          rateList: false,
          partCover: false,
          relationInfo: false,
          channelUse: false,
          rateListBtn: false,
          changeBtn: false,
          trackInformation: false
        },
        stationAuxiliary: {
          relevant: true,
          rate: false,
          analysis: false,
          channel: false,
          relation: false
        }
      }
    }
  },
  methods: {
    fadeChange: function (item, show = false) {
      if (typeof item != 'array' && item.length != 2) {
        console.error("parameter type failed!")
        return
      }
      if (!show) {
        this.fade[item[0]][item[1]] = !this.fade[item[0]][item[1]]
      } else {
        this.fade[item[0]][item[1]] = true
      }
    }
  },
};

// 页面加载 loading
export const pageLoading = {
  computed: {
    ...mapGetters([
      'pageLoading'
    ])
  },
  methods: {
    ...mapMutations({
      setLoading: 'SET_LOADING'
    })
  }
};
