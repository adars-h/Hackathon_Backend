const { SocketClosedUnexpectedlyError } = require("redis");
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
        socket.on("join_room", (data) => {
            const temp = data.room.toString();
            console.log("client connected : ", temp, typeof temp);
            socket.join(temp);
        });
        socket.on("send_message", async (data) => {
            let room = data.room;
            console.log("room : ", room, typeof room);
            socket.to(room).emit("receive_message", {
                username: data.username,
                score: data.score,
            });
            console.log("sent to : ", room);
            await addRequest(
                data.eventID,
                data.room,
                data.room_score,
                data.username,
                data.score
            );
        });
    });
    return io;
}
module.exports = SocketInit;
