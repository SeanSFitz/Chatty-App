import React, {Component} from 'react';
import MessageList from './components/MessageList.jsx';
import ChatBar from './components/ChatBar.jsx';

let data = {
  currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: []
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = data;
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket =  new WebSocket("ws://localhost:3001", "protocol");
      this.socket.onopen = () => {
        console.log('connected');
        this.socket.onmessage = () => {
          console.log(event.data);
          this.addNewMessage(JSON.parse(event.data));
        }
      }
  }

  chatInputHandler(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.sendMessage(event.target.value);
      event.target.value = "";
    }
  }

  usernameHandler(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.sendNameChange(event.target.value);
      this.setState({currentUser: {name: event.target.value}})
    }
  }

  sendMessage(input) {
    let message = {
      type: "postMessage",
      username: this.state.currentUser.name,
      content: input
    }

    this.socket.send(JSON.stringify(message));
  }

  sendNameChange(input) {
    let message = {
      type: "postNotification",
      username: this.state.currentUser.name,
      newName: input
    }
    this.socket.send(JSON.stringify(message));
  }

  addNewMessage(message) {
    let newMessageArray = this.state.messages;
    newMessageArray.push(message);
    console.log(newMessageArray);
    this.setState({messages: newMessageArray});
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar username={this.state.currentUser.name}
          chatInputHandler={this.chatInputHandler.bind(this)}
          usernameHandler={this.usernameHandler.bind(this)} />
      </div>
    );
  }
}
export default App;
