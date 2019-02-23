import React from 'react';
import header from './header.css';
import TweenOne from 'rc-tween-one';

class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.animation = [
      { x: -5, opacity: 1, duration: 500 }
    ];
    this.animation2 = [
      { x: 5, opacity: 1, duration: 500 }
    ];
    this.state = {
      moment: null,
      paused: true,
      reverse: false,
    };
  }

  choose = () => {
    this.props.choose(this.props.item)
  }

  handlenMouseOver = () => {
    this.setState({
      paused: false,
      reverse: false,
      moment: null,
    });
  }

  handleMouseOut = () => {
    this.setState({
      paused: false,
      reverse: true,
      moment: null,
    });
  }

  render() {
    return (
      <div style={{display: 'flex', flexFlow: 'row nowrap', fontSize: 16, marginRight: '20px'}}>
        <TweenOne
          animation={this.animation}
          paused={this.state.paused}
          reverse={this.state.reverse}
          moment={this.state.moment}
          style={{ transform: 'translateX(20px)', opacity: 0, position: 'relative', zIndex: '1' }}
        >
          <span key={1}>[</span>
        </TweenOne>
        <div>
          <span onMouseOver={this.handlenMouseOver}
                  onMouseOut={this.handleMouseOut}
             className={header['link-button']} style={{color: this.props.active === this.props.item ? 'white' : 'darkgrey'}}
             onClick={this.choose}>{this.props.item}</span>
        </div>
        <TweenOne
          animation={this.animation2}
          paused={this.state.paused}
          reverse={this.state.reverse}
          moment={this.state.moment}
          style={{ transform: 'translateX(-20px)', opacity: 0, position: 'relative', zIndex: '1' }}
        >
          <span key={2}>]</span>
        </TweenOne>
      </div>
    );
  }
}

export default Demo;
