const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = 8082;

app.get("/", (req, response) => {
    response.render("../src/index.ejs");
});

io.sockets.on("connection", socket => {
    socket.on("username", username => {
        socket.username = username;
        io.emit("is_online", `🔵 <i> ${socket.username} se une al chat...</i>`);
    });

    socket.on("disconnect", username => {
        io.emit(
          "is_online",
          `🔴 <i> ${socket.username} ha dejado el chat ..</i>`
        );
    });

    socket.on("chat_message", function(message) {
        io.emit(
          "chat_message",
          `<strong> ${socket.username} </strong>: ${message}`
        );
    });
      
});

const server = http.listen(port, () => {
    console.log("Server listening port ", port);
});