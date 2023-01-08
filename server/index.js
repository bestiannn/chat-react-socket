import express from "express";
// import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import http from "http";
import corse from "cors";
import { PORT } from "./config.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// app.use(morgan("dev"));

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const server = http.createServer(app);

const io = new SocketServer(server, {
  cors: {
    // origin: "http://localhost:5173",
  },
});

app.use(corse());

io.on("connection", (socket) => {
  socket.on("message", (data) => {
    socket.broadcast.emit("message", data);
  });
});

app.use(express.static(join(__dirname, "../client/dist")));

server.listen(PORT);
