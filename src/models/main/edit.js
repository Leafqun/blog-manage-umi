import * as blogService from '../../services/main/blogService'
import { message } from 'antd';
import {defaultSelected} from '../../utils/common'
import router from 'umi/router';

export default {

  namespace: 'edit',

  state: {
    blog: {title: '', content: ''},
    tagList: [],
    insert: true
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        dispatch({type: 'save', payload: {blog: {title: '', content: ''}}})
        if (pathname.indexOf('/edit/') === 0) {
          dispatch({type: 'fetch', payload: {title: pathname.substring(6)}})
          dispatch({type: 'edit'})
        } else {
          dispatch({type: 'insert'})
        }
        if (pathname.indexOf('/edit/') === 0 || pathname.indexOf('/publish') === 0 ) {
          dispatch({type: 'fetchTag', payload: {}})
        }
      });
    },
  },

  effects: {
    *fetch({ payload: {title} }, { call, put }) {
      const {data} = yield call(blogService.getBlog, {title})
      const blog = data.data
      blog['oldtid'] = defaultSelected(blog.tagList);
      blog['tid'] = blog['oldtid']
      yield put({ type: 'save', payload: {blog} });
    },
    *fetchTag({ payload }, { call, put }) {
      const {data} = yield call(blogService.getTagList)
      const tagList = data.data
      for (let i in tagList) {
        tagList[i]['label'] = tagList[i]['tag_name']
        tagList[i]['value'] = tagList[i]['tid']
      }
      yield put({ type: 'saveTag', payload: {tagList} })
    },
    *insertBlog({ payload: {title, tid, content} }, { call, put }) {
      if (title === '' || tid.length === 0 || content === '') {
        message.error("未填写完毕")
        return false
      }
      const {data} = yield call(blogService.insertBlog, {title, tid, content})
      if (data.message === 'success') {
        message.success('添加成功');
        setTimeout(function() {
          router.push('/')
        }, 1500)
      } else {
        message.error("添加失败")
      }
    },
    *updateBlog({ payload: {title, tid, content, bid, oldtid} }, { call, put }) {
      if (title === '' || tid.length === 0 || content === '') {
        message.error("未填写完毕")
        return false
      }
      const {data} = yield call(blogService.updateBlog, {title, tid, content, bid, oldtid})
      if (data.message === 'success') {
        message.success('更新成功');
        setTimeout(function() {
          router.push('/')
        }, 1500)
      } else {
        message.error("更新失败")
      }
    },
  },

  reducers: {
    save(state, { payload: { blog } }) {
      return { ...state, blog };
    },
    saveTag(state, {payload: {tagList}}) {
      return { ...state, tagList };
    },
    insert(state) {
      state.insert = true
      return { ...state}
    },
    edit(state) {
      state.insert = false
      return { ...state}
    },
    editContent(state, {payload: {content}}) {
      state.blog.content = content
      return {...state}
    },
    editTitle(state, {payload: {title}}) {
      state.blog.title = title
      return {...state}
    },
    editTid(state, {payload: {tid}}) {
      state.blog.tid = tid
      return {...state}
    },
  },

};
