import React, {Component} from 'react';
import MessageList from './components/MessageList.jsx';
import ChatBar from './components/ChatBar.jsx';

const colours = ['#41c6ea', '#64ba4a', '#d83e13', '#b676db', '#f4bc42', '#2c305b', '#2f681c'];

let data = {
  currentUser: {name: "Anonymous", colour: ""}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [],
  users: []
};

let randomColour = () => {
  let index = Math.floor(4*Math.random());
  return colours[index];
}

let newUser = () => {
  return {
    name: 'Anonymous',
    colour: randomColour()
  }
}

let isImage = function (input) {
  if (/[jJ][pP][gG]$/.test(input) || /[pP][nN][gG]$/.test(input) || /[gG][iI][fF]$/.test(input)) {
    return true;
  }
}

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
        console.log(randomColour());
        this.setState({currentUser: newUser()});
        this.sendUserJoined();

        this.socket.onmessage = () => {
          console.log(event.data);
          let data = JSON.parse(event.data);
          this.addNewMessage(data);
          if (data.type === "incomingUserJoined") {
            this.setState({
              users: data.users,
            })
          }
          if (data.type === "incomingUserExit") {
            this.setState({
              users: data.users,
            })
          }

        }
      }
  }


  sendMessage = (input) => {
    let message = {
      type: isImage(input) ? "postImage" : "postMessage",
      colour: this.state.currentUser.colour,
      username: this.state.currentUser.name,
      content: input
    }

    this.socket.send(JSON.stringify(message));
  }

  sendNameChange = (input) => {
    let message = {
      type: "postNameChange",
      username: this.state.currentUser.name,
      newName: input
    }
    this.socket.send(JSON.stringify(message));

    this.setState(prevState => {
      return {
        ...prevState,
        currentUser: {
          ...prevState.currentUser,
          'name': input
        }
      }
    })
  }

  sendUserJoined = () => {
    let message = {
      type: "postUserJoined",
      user: this.state.currentUser
    }
    this.socket.send(JSON.stringify(message));
  }

  addNewMessage = (message) => {
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
          <span className="user-count">{this.state.users.length} users online</span>
        </nav>
        <MessageList messages={this.state.messages} user={this.state.currentUser} />
        <ChatBar username={this.state.currentUser.name}
                 onMessage={this.sendMessage.bind(this)}
                 onNameChange={this.sendNameChange} />
      </div>
    );
  }
}
export default App;
