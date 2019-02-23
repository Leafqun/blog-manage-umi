import {Button, Statistic} from 'antd'
const Countdown = Statistic.Countdown;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

export default function() {
  return (
    <div>
      <Button type="primary">测试121</Button>
      <Countdown title="Million Seconds" value={deadline} format="HH:mm:ss:SSS" />
    </div>
  )
}
