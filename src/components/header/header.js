import head from './header.css'
import { Row, Col, Drawer, Icon } from 'antd';
import menu, {menuList2} from '../../assets/js/menu'
import Menu from './menu'
import { connect } from 'dva';
import router from 'umi/router'
import withRouter from 'umi/withRouter';

const Header =  ({dispatch, header}) => {
  function choose(name) {
    router.push(menuList2[name])
    dispatch({type: 'header/update', active: name});
  }
  function show() {
    dispatch({type: 'header/show'})
  }
  function hide() {
    dispatch({type: 'header/hide'})
  }
  function goto(name) {
    dispatch({type: 'header/hide'});
    if (name !== header.active) {
      dispatch({type: 'header/update', active: name});
      router.push(menuList2[name])
    }
  }
  return (
    <div className={head.header}>
      <Row>
        <Col xs={1} sm={6} md={6} lg={6}></Col>
        <Col xs={22} sm={12} md={12} lg={12}>
          <Row>
            <Col xs={16} sm={10} md={10} lg={8} xl={6} className={head.icon}>博客管理</Col>
            <Col xs={0} sm={14} md={14} lg={16} xl={18} style={{textAlign: 'left'}}>
              <div style={{display: 'flex', flexFlow: 'row nowrap'}}>
              {menu.map((item) =>
                <Menu item={item} key={item} choose={choose} active={header.active}/>
              )}
              </div>
            </Col>
            <Col xs={8} sm={0} md={0} lg={0} xl={0} style={{marginTop: 5, textAlign: 'right'}}>
              <Icon type="bars" style={{fontSize: 28}} onClick={show}/>
              <Drawer
                title="菜单"
                placement="right"
                closable={false}
                onClose={hide}
                visible={header.isShow}
              >
                {
                  menu.map(item =>
                    <span onClick={() => goto(item)} key={item}><p className={head.option}>{item}</p></span>
                  )}
              </Drawer>
            </Col>
          </Row>
        </Col>
        <Col xs={1} sm={6} md={6} lg={6}></Col>
      </Row>

    </div>
  )
}

export default withRouter((connect(({ header }) => ({
  header,
})))(Header));
