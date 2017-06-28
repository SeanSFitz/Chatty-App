const uuid = require('uuid/v4');

module.exports = function makeHelpers(userData) {
  return {

    makeOutgoingMessage: (message) => {
      //take the incoming message and give it a unique id and message type to be interpretted by client
      let outgoingMessage = {
        type: "incomingMessage",
        id: uuid(),
        content: message.content,
        colour: message.colour,
        username: message.username
      }
      return outgoingMessage;
    },

    makeOutgoingImage: (message) => {
      //take the incoming image and give it a unique id and message type to be interpretted by client
      let outgoingImage = {
        type: "incomingImage",
        id: uuid(),
        colour: message.colour,
        url: message.content,
        username: message.username
      }
      return outgoingImage;
    },

    makeNameChangeNotification: (notification) => {
      //take the incoming name change info
      //updating stored user info on server
      for (let user of userData) {
        if (user.id === notification.ws_id) {
          user.name = notification.newName;
        }
      }
      //make notification message to be sent to client
      let outgoingNotification = {
        type: "incomingNameChange",
        id: uuid(),
        content: `${notification.username} has change their name to ${notification.newName}`
      }
      return outgoingNotification;
    },

    makeUserJoinedNotification: (notification) => {
      //take incoming user joining info and attach a unique id for this connection
      let newUser = {
        name: notification.user.name,
        colour: notification.user.colour,
        id: notification.ws_id
      }
      //update user info stored on server
      userData.push(newUser);
      //create notification message to be sent to client
      let outgoingNotification = {
        type: "incomingUserJoined",
        id: uuid(),
        content: `${notification.user.name} has joined the chat.`,
        user: newUser,
        users: userData
      }
      return outgoingNotification;
    },

    makeUserExitNotification: (id) => {
      //called by server on close of a connection with a client
      let name;
      //find associated client in user data stored on server, get the username and remove from user data
      for (let i in userData) {
        if (userData[i].id === id) {
          name = userData[i].name;
          userData.splice(i, 1);
        }
      }
      //create a notification message to be sent to client, include name from above
      let outgoingNotification = {
        type: "incomingUserExit",
        id: uuid(),
        content: `${name} has left the chat.`,
        users: userData
      }
      return outgoingNotification;
    }
  }
}