import { getMenuByRouter } from '../../lib/util'
import routers from '../../router/routers'

export default {
  state: {
    isCollapse: false,
    carTypeOptions: [
      {
        label: '海狮',
        value: 'a'
      },
      {
        label: '海星',
        value: 'b'
      },
      {
        label: '厢货',
        value: 'c'
      },
      {
        label: 'GO1',
        value: 'd'
      }
    ]
  },
  getters: {
    menuList: (state, getters, rootState) => getMenuByRouter(routers, rootState.user.access)
  },
  mutations: {
    switchCollapse (state) {
      state.isCollapse = !state.isCollapse
    }
  }
}
