import { Input, Checkbox, Button } from 'antd';
import Markdowm from './markdown'
import { connect } from 'dva';
import withRouter from 'umi/withRouter';


function Blog({dispatch, blog, tagList, insert}) {
  function handleOnChange(v) {
    dispatch({type: 'edit/editContent', payload: {content: v}})
  }

  function handleInputChange(e) {
    dispatch({type: 'edit/editTitle', payload: {title: e.target.value}})
  }

  function handleTagChange(v) {
    dispatch({type: 'edit/editTid', payload: {tid: v}})
  }

  function onSubmit() {
    if (blog.bid) {
      dispatch({type: 'edit/updateBlog', payload: {bid: blog.bid, title: blog.title, tid: blog.tid, content: blog.content, oldtid: blog.oldtid}})
    } else {
      dispatch({type: 'edit/insertBlog', payload: {title: blog.title, tid: blog.tid, content: blog.content}})
    }
  }

  return (
    <div>
      <div style={{marginBottom: 25}}>
        标题：{!insert ? blog.title ? <Input placeholder="Basic usage" style={{width: '80%'}} defaultValue={blog.title} onChange={handleInputChange}/> : null : <Input placeholder="Basic usage" style={{width: '80%'}} onChange={handleInputChange}/>}
      </div>
      <div style={{marginBottom: 25}}>
        标签：{!insert ? blog.tagList ? <Checkbox.Group options={tagList} onChange={handleTagChange} defaultValue={blog.oldtid}/> : null : <Checkbox.Group options={tagList} onChange={handleTagChange}/>}
      </div>
      <div>
        <Markdowm value={blog.content} onChange={handleOnChange}/>
      </div>
      <div style={{textAlign: 'center'}}>
        <Button type="primary" onClick={onSubmit}>提交</Button>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return state.edit;
}

export default withRouter(connect(mapStateToProps)(Blog));
