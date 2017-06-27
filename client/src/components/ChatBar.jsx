import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <footer className="chatbar">
          <input className="chatbar-username" defaultValue={this.props.username} onKeyDown={this.props.usernameHandler}/>
          <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={this.props.chatInputHandler}/>
        </footer>
    );
  }
}
export default ChatBar;
