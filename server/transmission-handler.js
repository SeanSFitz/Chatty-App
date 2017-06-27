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

const makeOutgoingNotification = (notification) => {
  let outgoingNotification = {
    type: "incomingNotification",
    id: uuid(),
    content: `${notification.username} has change their name to ${notification.newName}`
  }
  return outgoingNotification;
}

const transmissionHandler = (transmission) => {
  if (transmission.type === "postMessage") {
    console.log("Post message recieved.");
    return makeOutgoingMessage(transmission);
  }
  if (transmission.type === "postNotification") {
    console.log("Post notification recieved");
    return makeOutgoingNotification(transmission);
  }
}

module.exports = transmissionHandler;