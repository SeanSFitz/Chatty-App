import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
  }

  chatInputHandler(event) {
    //checks to see if input was ENTER key, is so, calls sendMessage from App.jsx via props
    if (event.keyCode === 13) {
      event.preventDefault();
      this.props.onMessage(event.target.value);
      event.target.value = "";
    }
  }

  usernameHandler(event) {
    //checks to see if input was ENTER key, if so, calls sendNameChange from App.jsx via props
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
