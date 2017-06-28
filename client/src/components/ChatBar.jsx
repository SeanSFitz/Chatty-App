import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    // this.chatInputHandler = this.chatInputHandler.bind(this);
  }

  chatInputHandler(event) {
    console.log(event.target.value);
    if (event.keyCode === 13) {
      event.preventDefault();
      this.props.onMessage(event.target.value);
      event.target.value = "";
    }
  }

  usernameHandler(event) {
    console.log(event.target.value)
    if (event.keyCode === 13) {
      event.preventDefault();
      let name = event.target.value;
      this.props.onNameChange(name);
    }
  }

  render() {
    return (
        <footer className="chatbar">
          <input className="chatbar-username" defaultValue={this.props.username} onKeyDown={this.usernameHandler.bind(this)}/>
          <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={this.chatInputHandler.bind(this)}/>
        </footer>
    );
  }
}
export default ChatBar;
