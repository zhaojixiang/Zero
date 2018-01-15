import * as types from './mutation-types'

const mutations = {
    [types.SET_MENU_SHOW](state,flag) {
        state.menuShow = flag
    },
    [types.SET_HIGHCHART_HEIGHT](state,flag) {
        state.highchartHeight = flag
    },
    [types.SET_HEADER_TITLE](state,flag) {
        state.headerTitle = flag
    }
} 

export default mutations