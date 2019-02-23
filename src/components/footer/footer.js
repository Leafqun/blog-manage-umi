import { Icon } from 'antd';
import footer from './footer.css'

export default function() {
  return (
    <div className={footer.footer}>
      <div className={footer.lianjie}>
        <Icon type="weibo" style={{fontSize: 34,  marginRight: 20, color: 'white'}}/>
        <Icon type="wechat" theme="filled" style={{fontSize: 34, color: 'white'}}/>
      </div>
      <div className={footer.copyright}>
        Copyright©2019. Design by Leafqun
      </div>
    </div>
  );
}
