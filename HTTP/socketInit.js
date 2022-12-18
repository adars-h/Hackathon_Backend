const e = require("cors");
const { set } = require("mongoose");
const socketio = require("socket.io");
const { Server } = require("socket.io");
const { addRequest } = require("../DB/models/Events");
const { v4: uuidv4 } = require("uuid");
var socketToRoom = {};
const users = {};
function SocketInit(app, server) {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
        },
    });
    let user = new Set();
    io.on("connect", (socket) => {
        socket.on("join_room", (data) => {
            console.log("client connected : ", data);
            const temp = data.room.toString();
            socket.join(temp);
        });
        socket.on("send_message", async (data) => {
            let room = data.room;
            socket.to(room).emit("receive_message", {
                username: data.username,
                score: data.score,
            });
            await addRequest(
                data.eventID,
                data.room,
                data.room_score,
                data.username,
                data.score
            );
        });

        socket.on("join-room", (roomID, userID) => {
            console.log("roomID : ", roomID, userID);
            socket.join(roomID);
            socket.to(roomID).emit("user-connected", userID);
        });

        socket.on("random_pairing", (data) => {
            user.add(
                JSON.stringify({
                    username: data.username,
                    score: data.score,
                    room: data.room,
                })
            );
            if (user.size === 2) {
                let res = [];
                let uuid = uuidv4();
                let room = "";
                for (item of user) {
                    item = JSON.parse(item);
                    item.uuid = uuid;
                    res.push(item);
                    if (room !== "") room = item.room;
                }
                socket.to(data.room).emit("receive_link", {
                    res,
                });
                socket.to(room).emit("receive_link", {
                    res,
                });
                user.clear();
            }
        });
    });
    return io;
}
module.exports = SocketInit;
