function Packet(app, aesData, iv) {
  this.app = app;
  this.aesData = aesData;
  this.iv = iv;
}

var somePacket = new Packet("DEMO", "5646a5s6a54fs6", "as6f54a6sf");
console.log("somePacket: ", somePacket);
