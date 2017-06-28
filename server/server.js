const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v4');
// Set the port to 3001
const PORT = 3001;

let connectedUsers = [];
const helpers = require('./helpers')(connectedUsers);
const transmissionHandler = require('./transmission-handler')(helpers);
// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server, clientTracking: true});

// let connectedUsers = [];
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  ws.id = uuid();
  console.log('Client connected ' + ws.id);

  //everything in here happens when ther server gets a message
  ws.on('message', function incoming(data) {
    let transmission = JSON.parse(data);
    transmission.ws_id = ws.id;

    //call the transmission handler that will determine what type of transmission came in and how to transform it
    let response = transmissionHandler(transmission);

    wss.clients.forEach(function each(client) {
      if (client.readyState === 1) {
        console.log('Sending message to all clients');
        client.send(JSON.stringify(response));
      }
    });
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    let message = helpers.makeUserExitNotification(ws.id);
    wss.clients.forEach(function each(client) {
      if (client.readyState === 1) {
        console.log('Sending message to all clients');
        client.send(JSON.stringify(message));
      }
    });
  });
});