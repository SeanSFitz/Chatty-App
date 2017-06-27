const uuid = require('uuid/v4');

const makeOutgoingMessage = (message) => {
  let outgoingMessage = {
    type: "incomingMessage",
    id: uuid(),
    content: message.content,
    username: message.username
  }
  return outgoingMessage;
}

const makeNameChangeNotification = (notification) => {
  let outgoingNotification = {
    type: "incomingNameChange",
    id: uuid(),
    content: `${notification.username} has change their name to ${notification.newName}`
  }
  return outgoingNotification;
}

const makeUserJoinedNotification = (notification) => {
  let outgoingNotification = {
    type: "incomingUserJoined",
    id: uuid(),
    content: `${notification.username} has joined the chat.`
  }
  return outgoingNotification;
}


const transmissionHandler = (transmission) => {
  switch(transmission.type) {
    case "postMessage":
      console.log("Post message recieved.");
      return makeOutgoingMessage(transmission);
      break;
    case "postNameChange":
      console.log("Post name change notification recieved");
      return makeNameChangeNotification(transmission);
      break;
    case "postUserJoined":
      console.log("User joined notification recieved");
      return makeUserJoinedNotification(transmission);
      break;
  }
}

module.exports = transmissionHandler;