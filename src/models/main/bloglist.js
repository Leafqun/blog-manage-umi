import * as blogService from '../../services/main/blogService'
import { message } from 'antd';

export default {

  namespace: 'bloglist',

  state: {
    blogList: [],
    total: 0,
    currentPage: 1
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/') {
          dispatch({type: 'fetch', payload: {currentPage: 1}})
        }
      });
    },
  },

  effects: {
    *fetch({ payload: {currentPage=1} }, { call, put }) {
      const {data} = yield call(blogService.getBlogList, {currentPage})
      const blogList = data.data.blogList
      const total = data.data.total
      yield put({ type: 'save', payload: {blogList, total, currentPage} });
    },
    *remove({ payload: {bid} }, { call, put }) {
      const {data} = yield call(blogService.deleteBlog, {bid})
      if (data.message === 'success') {
        message.success('删除成功');
        yield put({type: 'fetch', payload: {currentPage: 1}})
      } else {
        message.error('删除失败');
      }
    },
  },

  reducers: {
    save(state, { payload: { blogList, total, currentPage } }) {
      return { ...state, blogList, total, currentPage };
    },
  },

};
