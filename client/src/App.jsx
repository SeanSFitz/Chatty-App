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
  //create a new Anonymous user with a random color to be associated with their messages
  return {
    name: 'Anonymous',
    colour: randomColour()
  }
}

let isImage = function (input) {
  //checks to see if an input string is a link to an image
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

        //add a new randomized user to the state
        this.setState({currentUser: newUser()});

        //send a user joined notification to the server
        this.sendUserJoined();

        //to be called when a message is recieved
        this.socket.onmessage = () => {
          //interpret incoming data
          let data = JSON.parse(event.data);
          //add the message associated with the data
          this.addNewMessage(data);
          //call additional functions for messages of specific types
          if (data.type === "incomingUserJoined") {
            //update users array in state
            this.setState({
              users: data.users,
            })
          }
          if (data.type === "incomingUserExit") {
            //update users array in state
            this.setState({
              users: data.users,
            })
          }

        }
      }
  }


  sendMessage = (input) => {
    //build message object to be sent to server
    let message = {
      //check if image or message and attach the correct "type"
      type: isImage(input) ? "postImage" : "postMessage",
      colour: this.state.currentUser.colour,
      username: this.state.currentUser.name,
      content: input
    }
    //send to server
    this.socket.send(JSON.stringify(message));
  }

  sendNameChange = (input) => {
    //build message object to be sent to server
    let message = {
      type: "postNameChange",
      username: this.state.currentUser.name,
      newName: input
    }
    //send to server
    this.socket.send(JSON.stringify(message));
    //set username in state
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
    //build message to be sent to server
    let message = {
      type: "postUserJoined",
      user: this.state.currentUser
    }
    //send message to server
    this.socket.send(JSON.stringify(message));
  }

  addNewMessage = (message) => {
    //add new message to state
    this.setState({messages: [...this.state.messages, message]});
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
