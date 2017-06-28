import React, {Component} from 'react';

class Message extends Component {
  render() {
    return (
          <div className="message">
            <span className="message-username" style={{color: this.props.msg.colour}}>{this.props.msg.username}</span>
            <span className="message-content">
              <img src={this.props.msg.url}></img>
            </span>
          </div>
    );
  }
}
export default Message;
