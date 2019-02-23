import { Timeline, Icon } from 'antd';
import logList from '../../assets/js/update_log'

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1035933_0tcyg8gtird.js',
})

export default function() {
  return (
    <div>
      <h1 style={{fontWeight: 700, marginBottom: 25}}>更新日志</h1>
      <Timeline>
        {logList.map(item =>
          <Timeline.Item key={item.id}>
            <div style={{marginLeft: 30}}>
              <div style={{fontWeight: 500, fontSize: 22, marginBottom: 15}}>
                { item.id}
              </div>
              <div style={{marginBottom: 15, fontSize: 14}}>{ item.create_time}</div>
              {item.detail.map(content =>
                <div key={content}>
                  <span><IconFont type="icon-cicleo" style={{fontSize: 12, marginRight: 8}}/></span>
                  <span>{content}</span>
                </div>
              )}
            </div>

          </Timeline.Item>
        )}
      </Timeline>
    </div>
  )
}
