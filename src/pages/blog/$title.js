import { connect } from 'dva';
import withRouter from 'umi/withRouter';
import {Divider, Tag} from 'antd'
import marked from 'marked';
import hljs from 'highlight.js'

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(lang, code, true).value;
    } else {
      return hljs.highlightAuto(code).value;
    }
  }
});

function Blog({dispatch, blog_detail}) {

  return (
    <div>
      {Object.keys(blog_detail).length > 0 ? <div>
        <h1 >{blog_detail.title}</h1>
        <div style={{marginBottom: 12}}>
          {blog_detail.create_time.substring(0, 10)}
          <Divider type="vertical"/>
          {blog_detail.tagList.length > 0 ? blog_detail.tagList.map(tag =>
            <Tag color="#f50" key={tag.tid}>{tag.tag_name}</Tag>
          ) : null}
        </div>
        <div dangerouslySetInnerHTML={{__html: marked(blog_detail.content || '', {
            sanitize: true
          })}}/>
      </div> : null}
    </div>
  )
}
function mapStateToProps(state) {
  return state.blog;
}

export default withRouter(connect(mapStateToProps)(Blog));
