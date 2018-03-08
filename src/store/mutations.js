import * as types from './mutation-types'

const mutations = {
    [types.SET_MENU_SHOW](state,flag) {
        state.menuShow = flag
    },
    [types.SET_HEADER_TITLE](state,flag) {
        state.headerTitle = flag
    },
    [types.SET_LOADING](state,flag) {
        state.pageLoading = flag
    }
} 

export default mutations