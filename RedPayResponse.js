class RedPayResponse {
  constructor(transferStatus, responseCode, transactionId, authCode, cardLevel, cardBrand, cardType, processorCode, app, account, cardHolderName, amount, timeStamp, text, clientIP, avsCode) {
    this.transferStatus = transferStatus;
    this.responseCode = responseCode;
    this.transactionId = transactionId;
    this.authCode = authCode;
    this.cardLevel = cardLevel;
    this.cardBrand = cardBrand;
    this.cardType = cardType;
    this.processorCode = processorCode;
    this.app = app;
    this.account = account;
    this.cardHolderName = cardHolderName;
    this.amount = amount;
    this.timeStamp = timeStamp;
    this.text = text;
    this.clientIP = clientIP;
    this.avsCode = avsCode;
  }
}
