import {menuList} from '../../assets/js/menu'

export default {
  namespace: 'header',
  state: {active: '首页', isShow: false},
  reducers: {
    'update'(state, { active: name }) {
      state.active = name
      return {...state}
    },
    'show'(state) {
      // state.isShow = true
      return {...state, isShow: true}
    },
    'hide'(state) {
      // state.isShow = false
      return {...state, isShow: false}
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        dispatch({ type: 'update', active: menuList[pathname] });
      });
    },
  },
};
