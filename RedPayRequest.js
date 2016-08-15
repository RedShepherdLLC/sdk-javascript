function RedPayRequest(action, amount, account, cardHolderName, expmmyyyy, cvv,
avsZip, currency, method, retryCount, avsAddress1, avsAddress2, avsCity,
cardHolderEmail, cardHolderPhone, employeeRefNum, customerRefNum, orderRefNum,
terminalRefNum) {
  this.action = action;
  this.amount = amount;
  this.account = account;
  this.cardHolderName = cardHolderName;
  this.expmmyyyy = expmmyyyy;
  this.cvv = cvv;
  this.avsZip = avsZip;
  this.currency = currency;
  this.method = method;
  this.retryCount = retryCount;
  this.avsAddress1 = avsAddress1;
  this.avsAddress2 = avsAddress2;
  this.avsCity = avsCity;
  this.cardHolderEmail = cardHolderEmail;
  this.cardHolderPhone = cardHolderPhone;
  this.employeeRefNum = employeeRefNum;
  this.customerRefNum = customerRefNum;
  this.orderRefNum = orderRefNum;
  this.terminalRefNum = terminalRefNum;
}

var theRequest = new RedPayRequest("A", 5001, "411", "John Doe", "042018", "344", "04233");
console.log("theRequest: ", theRequest);
