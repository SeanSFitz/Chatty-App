import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {
  render() {
    return (
        <main className="messages">
          {
            this.props.messages.map((message) => {
              if (message.type === "incomingMessage") {
                return <Message msg={message} key={message.id} colour={message.colour} />
              }
              if (message.type === "incomingNameChange") {
                return <Notification content={message.content} key={message.id} />
              }
              if (message.type === "incomingUserJoined") {
                return <Notification content={message.content} key={message.id} />
              }
              if (message.type === "incomingUserExit") {
                return <Notification content={message.content} key={message.id} />
              }
            })
          }
        </main>
    );
  }
}
export default MessageList;
