
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('messageInput');
const roomIndicator = document.getElementById('room-indicator');
const urlParams = new URLSearchParams(window.location.search);
const room = urlParams.get('room') || 'default';
roomIndicator.textContent = "Room: " + room;

function sendMessage() {
  const message = messageInput.value.trim();
  if (message) {
    const msgEl = document.createElement('div');
    msgEl.textContent = `[${room}] You: ` + message;
    chatBox.appendChild(msgEl);
    messageInput.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

function startScan() {
  const videoElem = document.getElementById("qr-video");
  videoElem.style.display = "block";
  const qrScanner = new Html5Qrcode("qr-video");
  qrScanner.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 200 },
    qrCodeMessage => {
      window.location.href = qrCodeMessage;
    },
    errorMessage => {}
  ).catch(err => console.error(err));
}
