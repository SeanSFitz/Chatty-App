const uuid = require('uuid/v4');

module.exports = function makeHelpers(userData) {
  return {

    makeOutgoingMessage: (message) => {
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
      let outgoingNotification = {
        type: "incomingNameChange",
        id: uuid(),
        content: `${notification.username} has change their name to ${notification.newName}`
      }
      return outgoingNotification;
    },

    makeUserJoinedNotification: (notification) => {
      let newUser = {
        name: notification.user.name,
        colour: notification.user.colour,
        id: notification.ws_id
      }
      userData.push(newUser);
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
      let name;
      for (let i in userData) {
        if (userData[i].id === id) {
          name = userData[i].name;
          userData.splice(i, 1);
        }
      }
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