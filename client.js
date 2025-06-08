
const chat = document.getElementById("chat");
const input = document.getElementById("msg");
const roomParam = new URLSearchParams(window.location.search).get("room") || "default";
document.getElementById("room-name").textContent = "Room: " + roomParam;

function sendMessage() {
  const text = input.value.trim();
  if (text) {
    const msg = document.createElement("div");
    msg.textContent = "You: " + text;
    chat.appendChild(msg);
    input.value = "";
    chat.scrollTop = chat.scrollHeight;
  }
}

function startScan() {
  const qrScanner = new Html5Qrcode("qr-video");
  const video = document.getElementById("qr-video");
  video.style.display = "block";
  qrScanner.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    (decodedText) => {
      window.location.href = decodedText;
    },
    (errorMessage) => {}
  ).catch(err => console.error(err));
}
