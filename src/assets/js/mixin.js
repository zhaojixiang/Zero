import { mapGetters, mapMutations } from 'vuex'

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

export const hightchartHeight = {
    computed:{
        ...mapGetters([
            'highchartHeight'
        ])
    },
    methods: {
        ...mapMutations({
            setHighchartHeight: 'SET_HIGHCHART_HEIGHT'
        })
    },
}

export const getFacilityType = {
  data() {
    return {
      legend:[],
    }
  },
  methods: {
    initLegend:function(){
      this.$http.get('api/HomePage/FacilityType').then(res=>{
        this.legend = res.data;
      });
    }
  }
};

// 单页头标题
export const headerTitle = {
    computed:{
        ...mapGetters([
            'headerTitle'
        ])
    }
}