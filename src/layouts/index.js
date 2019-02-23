import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import {Row, Col, BackTop} from 'antd'

function BasicLayout(props) {
  return (
    <div>
      <Header/>
      <Row style={{minHeight: document.documentElement.clientHeight - 160}}>
        <Col xs={2} sm={6} md={6} lg={6}></Col>
        <Col xs={20} sm={12} md={12} lg={12} style={{padding: '30px 0'}}>
          { props.children }
        </Col>
        <Col xs={2} sm={6} md={6} lg={6}></Col>
      </Row>
      <Footer/>
      <BackTop />
    </div>
  );
}

export default BasicLayout;
