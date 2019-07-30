# Morse Chat API
Uses socket.io to send messages between users and translate those messages to/from morse code

## Requirements
- Node v8.9.4

## Starting App

In the project directory, you can run:

### `yarn start`

This runs `node server.js`. It could be useful to run `nodemon server.js` for testing

Your server is now available at [http://localhost:8080](http://localhost:8080).

## Socket Messages

### `SEND_MESSAGE`

message was sent
```
{
    author: <username>,
    message: <plain text message as string>
}
```

### `RECEIVE_MESSAGE`

after message is sent, this is emitted with morse-encrypted message
```
{
    author: <username>,
    message: <morse message as string>
}
```

### `CONNECT`

let the service know that a user connected
```
{
    user: <username>
}
```

### `USER_CONNECTED`

after a user connects, this is emitted with new user information
```
{
    user: <username>
}
```

### `USER_DISCONNECTED`

when socket `disconnect` is called by socket.io, this message is emitted to the clients still connected

## TODO
- ~~write unit tests for services~~
- ~~write integration tests for socket functions and returns~~
- handle decryption of morse code through route rather than through sockets
- add Cluster so all cores are being used for chat
