function CreditCardProcessor(config) {
  this.Charge = function({amount, account, currency="USD", expDate, cvv, signatureData,
   cardHolderName, method, authCode, retryCount, track1Data, track2Data, avsAddress1,
   avsAddress2, avsCity, avsZip, cardHolderEmail, cardHolderPhone, employeeRefNum,
   customerRefNum, orderRefNum, terminalRefNum}) {
    // this.amount = amount;
    // this.account = account;
    // this.currency = currency;
    // this.expDate = expDate;
    // this.cvv = cvv;
    // this.signatureData = signatureData,
    // this.cardHolderName = cardHolderName;
    // this.method = method;
    // this.authCode = authCode;
    // this.retryCount = retryCount;
    // this.track1Data = track1Data;
    // this.track2Data = track2Data;
    // this.avsAddress1 = avsAddress1;
    // this.avsAddress2 = avsAddress2;
    // this.avsCity = avsCity;
    // this.avsZip = avsZip;
    // this.cardHolderEmail = cardHolderEmail;
    // this.cardHolderPhone = cardHolderPhone;
    // this.employeeRefNum = employeeRefNum;
    // this.customerRefNum = customerRefNum;
    // this.orderRefNum = orderRefNum;
    // this.terminalRefNum = terminalRefNum;

    var params = {action: "A", amount: amount, account: account, currency: currency,
    expmmyyyy: expDate, cvv: cvv, signatureData: signatureData, cardHolderName: cardHolderName,
    method: method, authCode: authCode, retryCount: retryCount, track1Data: track1Data,
    track2Data: track2Data, avsAddress1: avsAddress1, avsAddress2: avsAddress2, avsCity: avsCity,
    avsZip: avsZip, cardHolderEmail: cardHolderEmail, cardHolderPhone: cardHolderPhone,
    employeeRefNum: employeeRefNum, customerRefNum: customerRefNum, orderRefNum: orderRefNum,
    terminalRefNum: terminalRefNum};

    return new RedPayRequest(params);
  }

  this.Void = function({transactionId}) {
    var params = {action: "V", transactionId: transactionId};

    return new RedPayRequest(params);
  }

  this.Refund = function({transactionId, amount}) {
    var params = {action: "R", transactionId: transactionId, amount: amount};

    return new RedPayRequest(params);
  }
}

var chargeParams = {amount: 500, account: 1212};
var voidParams = {transactionId: "DEMO.123"};
var refundParams = {amount: 500, transactionId: "DEMO.123",};

var config = new Config("DEMO", "ASDFA", "ASDFaA");
var card = new CreditCardProcessor(config)
console.log("card: ", card);

var someCharge = card.Charge(chargeParams).create();
console.log("charge: ", someCharge);

var someVoid = card.Void(voidParams).create();
console.log("void: ", someVoid);

var someRefund = card.Refund(refundParams).create();
console.log("refund: ", someRefund);