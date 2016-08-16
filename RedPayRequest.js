function RedPayRequest({action, amount, account, currency, expmmyyyy, cvv, signatureData,
 cardHolderName, method, authCode, retryCount, track1Data, track2Data, avsAddress1,
 avsAddress2, avsCity, avsZip, cardHolderEmail, cardHolderPhone, employeeRefNum,
 customerRefNum, orderRefNum, terminalRefNum, transactionId}) {
  // this.action = action;
  // this.amount = amount;
  // this.account = account;
  // this.cardHolderName = cardHolderName;
  // this.expmmyyyy = expmmyyyy;
  // this.cvv = cvv;
  // this.avsZip = avsZip;
  // this.currency = currency;
  // this.method = method;
  // this.retryCount = retryCount;
  // this.avsAddress1 = avsAddress1;
  // this.avsAddress2 = avsAddress2;
  // this.avsCity = avsCity;
  // this.cardHolderEmail = cardHolderEmail;
  // this.cardHolderPhone = cardHolderPhone;
  // this.employeeRefNum = employeeRefNum;
  // this.customerRefNum = customerRefNum;
  // this.orderRefNum = orderRefNum;
  // this.terminalRefNum = terminalRefNum;
  // this.transactionId = transactionId;
  var somePacket = new Packet(config.app, arguments[0], "45");
  var someStringPacket = JSON.stringify(somePacket);
  console.log("packet", someStringPacket);
  return Post(someStringPacket)
  .then(function(response) {
    return response
  });

  this.create = function() {
    var somePacket = new Packet(config.app, args, "45");
    var someStringPacket = JSON.stringify(somePacket);
    return somePacket;
  }
}
