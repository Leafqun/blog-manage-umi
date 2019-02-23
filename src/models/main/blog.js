import * as blogService from '../../services/main/blogService'

export default {

  namespace: 'blog',

  state: {
    blog_detail: {}
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname.indexOf('/blog/') === 0) {
          dispatch({type: 'fetch', payload: {title: pathname.substring(6)}})
        }
      });
    },
  },

  effects: {
    *fetch({ payload: {title} }, { call, put }) {
      const {data} = yield call(blogService.getBlog, {title})
      const blog_detail = data.data
      yield put({ type: 'save', payload: {blog_detail} });
    },
  },

  reducers: {
    save(state, { payload: { blog_detail } }) {
      return { ...state, blog_detail };
    },
  },

};
