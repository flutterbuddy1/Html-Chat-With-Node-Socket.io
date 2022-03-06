const express = require("express");
const app = express();
const http = require("http");
// const { Socket } = require("socket.io-client");
const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = require("socket.io")(server);

app.use(express.json());
var clients = {};
io.on("connection", socket => {
    console.log(socket.id);
    socket.emit("connected", socket.id);
    socket.on("join", (data) => {
        console.log("User :",data,"Joined");
        clients[data] = socket;
        socket.emit("joined", data);
    });
    socket.on("message", (data) => {
        console.log(data);
        if(clients[data.id]){
            clients[data.id].emit("message", data);
        }
        socket.emit("message",data);
    });
});


server.listen(port,"0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});


/// 😂😂😂😂😂