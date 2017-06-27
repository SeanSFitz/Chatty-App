import React, {Component} from 'react';
import MessageList from './components/MessageList.jsx';
import ChatBar from './components/ChatBar.jsx';

let data = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
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
          this.addNewMessage(JSON.parse(event.data));
        }
      }
  }

  keyDownHandler(event) {
    // event.preventDefault();
    if (event.keyCode === 13) {
      event.preventDefault();
      let message = {
        username: this.state.currentUser.name,
        content: event.target.value
      }
      event.target.value = "";
      this.sendMessage(message);
    }
  }

  sendMessage(message) {
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
        <ChatBar currentUser={this.state.currentUser} keyDownHandler={this.keyDownHandler.bind(this)} />
      </div>
    );
  }
}
export default App;
