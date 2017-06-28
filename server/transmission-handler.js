const uuid = require('uuid/v4');

let connectedUsers = [];

const makeNewUser = (name, colour) => {
  return {
    'name': name,
    'colour': colour,
    id: uuid()
  }
}

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
  let newUser = makeNewUser(notification.user.name, notification.user.colour);
  connectedUsers.push(newUser);
  let outgoingNotification = {
    type: "incomingUserJoined",
    id: uuid(),
    content: `${notification.user.name} has joined the chat.`,
    user: newUser,
    users: connectedUsers
  }
  return outgoingNotification;
}

const makeUserExitNotification = (notification) => {
  let outgoingNotification = {
    type: "incomingUserExit",
    id: uuid(),
    content: `${notification.user.name} has left the chat.`,
    user: notification.user
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
    case "postUserExit":
      console.log("User exit notification recieved");
      return makeUserExitNotification(transmission);
      break;
  }
}

module.exports = transmissionHandler;