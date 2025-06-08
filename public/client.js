
const socket = io();
let room = "";

function joinRoom() {
  room = document.getElementById("room-input").value.trim();
  if (!room) return alert("Enter a room name");
  document.getElementById("room-name").textContent = "Room: " + room;
  socket.emit("join-room", room);
}

function sendMessage() {
  const msg = document.getElementById("msg").value;
  if (msg.trim()) {
    appendMessage("You: " + msg);
    socket.emit("message", { room, message: msg });
    document.getElementById("msg").value = "";
  }
}

socket.on("message", (msg) => {
  appendMessage("Other: " + msg);
});

function appendMessage(msg) {
  const div = document.createElement("div");
  div.textContent = msg;
  document.getElementById("chat").appendChild(div);
}

function scanQR() {
  const scanner = new Html5Qrcode("qr-video");
  const video = document.getElementById("qr-video");
  video.style.display = "block";
  scanner.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 200 },
    (decoded) => {
      video.style.display = "none";
      scanner.stop();
      document.getElementById("room-input").value = decoded;
      joinRoom();
    }
  );
}
