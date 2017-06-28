module.exports = function transmissionHandler(helpers) {

  return  (transmission) => {
    switch(transmission.type) {
      case "postMessage":
        console.log("Post message recieved.");
        return helpers.makeOutgoingMessage(transmission);
        break;
      case "postNameChange":
        console.log("Post name change notification recieved");
        return helpers.makeNameChangeNotification(transmission);
        break;
      case "postUserJoined":
        console.log("Post user joined notification recieved");
        return helpers.makeUserJoinedNotification(transmission);
        break;
      case "postUserExit":
        console.log("User exit notification recieved");
        return helpers.makeUserExitNotification(transmission);
        break;
    }
  }
}
