const socketio = require("socket.io");
const { Server } = require("socket.io");
const { addRequest } = require("../DB/models/Events");
function SocketInit(app, server) {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
        },
    });
    io.on("connect", (socket) => {
        console.log("client connected");
        socket.on("join_room", (data) => socket.join(data));
        socket.on("send_message", async (data) => {
            socket.to(data.room).emit("receive_message", {
                username: data.username,
                score: data.score,
            });
            await addRequest(
                data.eventID,
                data.room,
                data.username,
                data.score
            );
        });
    });
    return io;
}
module.exports = SocketInit;
