function Config (app, base64Key, url) {
    this.app = app;
    this.base64Key = base64Key;
    this.url = url;
}

function CreditCardProcessor(config) {
  var config = config;

  this.Charge = function({
    amount=0,
    account,
    currency="USD",
    expmmyyyy,
    cvv,
    signatureData,
    cardHolderName,
    method="CNP",
    authCode,
    retryCount,
    track1Data,
    track2Data,
    avsAddress1,
    avsAddress2,
    avsCity,
    avsZip,
    cardHolderEmail,
    cardHolderPhone,
    employeeRefNum,
    customerRefNum,
    orderRefNum,
    terminalRefNum
  }) {

    var RedPayRequest = arguments[0];
    RedPayRequest.action = "A";
    //console.log("RedPayRequest", RedPayRequest);

    var packet = new Packet(config.app, RedPayRequest);
    return Post(packet)
    .then(function(response) {
      return response
    });
  }

  this.Void = function({transactionId}) {
    var RedPayRequest = arguments[0];
    RedPayRequest.action = "V";

    var packet = new Packet(config.app, RedPayRequest);

    return Post(packet)
    .then(function(response) {
      return response
    });
  }

  this.Refund = function({transactionId, amount}) {
    var RedPayRequest = arguments[0];
    RedPayRequest.action = "R";

    var packet = new Packet(config.app, RedPayRequest);

    return Post(packet)
    .then(function(response) {
      return response
    });
  }
}

function Post(packet) {
  //console.log("Packet", packet);
  return $.post('https://redpaystable.azurewebsites.net/card', packet)
  .then(function (response) {
    return response;
  });
}

// TODO: Change this when encryption is set up (remind Khalid)
function Packet(app, aesData, iv) {
  this.app = app;
  this.data = aesData;
  //this.iv = iv;
}

/////////////
// TESTING //
/////////////

// Account setup
var config = new Config("DEMO", "vZ9cvj3lONTEGWmuzTJ9tdjmDoEUEb7dPkdMdXyP1/4=", "https://redpaystable.azurewebsites.net/card");
var card = new CreditCardProcessor(config);

// Making a Charge
var charge1Params = {
  amount: Math.floor(Math.random()* (9000) + 1000),
  account: 4011361100000012,
  cardHolderName: "John Doe",
  "avsZip": "22222",
  "expmmyyyy": "012017",
  "cvv": "123"
};

card.Charge(charge1Params)
.then(function(response) {
  console.log("Charge response: ", response);

  // Voiding that Charge
  var voidParams = {
    transactionId: response.data.transactionId
  };

  card.Void(voidParams)
  .then(function(response){
      console.log("Void Reponse", response);
  })

});

// Making another Charge
var charge2Params = {
  amount: Math.floor(Math.random()* (9000) + 1000),
  account: 4011361100000012,
  cardHolderName: "John Doe",
  "avsZip": "22222",
  "expmmyyyy": "012017",
  "cvv": "123"
};

card.Charge(charge2Params)
.then(function(response) {
  console.log("Charge response: ", response);

  // Refunding that Charge
  var refundParams = {
    transactionId: response.data.transactionId,
    amount: response.data.amount
  };

  card.Refund(refundParams)
  .then(function(response){
      console.log("Refund Reponse", response);
  })

});
