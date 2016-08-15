function RedPayRequest(action, amount, account, cardHolderName, expmmyyyy, cvv, avsZip) {
  this.action = action;
  this.amount = amount;
  this.account = account;
  this.cardHolderName = cardHolderName;
  this.expmmyyyy = expmmyyyy;
  this.cvv = cvv;
  this.avsZip = avsZip;
}

var theRequest = new RedPayRequest("A", 5000, "411", "John Doe", "042018", "344", "04233");
console.log("theRequest: ", theRequest);
