import { List, Divider, Tag, Popconfirm } from 'antd';
import { connect } from 'dva';
import withRouter from 'umi/withRouter';
import Link from 'umi/link';
import header from '../components/header/header.css'

const Index = ({ dispatch, blogList, total, currentPage }) => {
  const desc = (item) => (
    <div>
      {item.create_time ? item.create_time.substring(0, 10) : null}
      <Divider type="vertical"/>
      {item.tagList.map(tag =>
        <Tag color="#f50" key={tag.tag_name}>{tag.tag_name}</Tag>,
      )}
    </div>
  );


  const confirm = (bid) => {
    dispatch({type: 'bloglist/remove', payload: {bid}})
  }

  return (
    <div>
      {blogList.length > 0 ?
        <List
          itemLayout="horizontal"
          dataSource={blogList}
          bordered
          renderItem={item => (
            <List.Item actions={[<Link to={'/blog/' + item.title}>查看</Link>, <Link to={'edit/' + item.title}>编辑</Link>, <Popconfirm title="是否删除？" okText="是" cancelText="否" onConfirm={() => confirm(item.bid)}><span className={header.item}>删除</span></Popconfirm>]}>
              <List.Item.Meta
                title={<a href="https://ant.design">{item.title}</a>}
                description={desc(item)}
              />
            </List.Item>
          )}
          pagination={total > 10 ? {
            onChange: (page) => {
              dispatch({type: 'bloglist/fetch', payload: {currentPage: page}})
            },
            pageSize: 10,
            current: currentPage,
            total,
            size: 'small',
          } : false}
        /> : null}
    </div>
  );
};

function mapStateToProps(state) {
  return state.bloglist;
}

export default withRouter(connect(mapStateToProps)(Index));
