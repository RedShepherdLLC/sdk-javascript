var Security = {
  keyBase64: null,
  rsaPublicKey: "MIIBojANBgkqhkiG9w0BAQEFAAOCAY8AMIIBigKCAYEAtsQxNp3vmKVNYIxfWSi0LIRgCnPaMn0MUNouxgrs4zmg4cnvSeQ3I8YP03YbpXuWA80RvOw/nWErYAKomniJw8Y+xexMfBQ5sgJgewn3ZnRPNM9Y4Z62gwfIlsrs7Bwvpz9uUtLgeQLl1ffNaumnu1IBrqRps0EZ1QyDuu41UckTyo31C40Wez6IbeMfZeusrmPlIWqyBacdviJ5zHCA3zHNq86QMnB8HOP1U81HOSs6GTTelhD7lCoJ+fHKHxcz0MDr37fNpKpC57B0/20wBXFp9tlVtSkHcIty1lyNk2/HDH8knCdqkZk+fCvWgGwdex41x8/rM+LKC13c5J/yG6Gb2PnKhwNk4lvvnz73YAdqTUJ7qNrdtWVnOTWfbMBiNlpBCVqt8xY8UK6u83AVWrWXse0xe2Pn/kRqlXmxWT0mGEoCavjvZ9lQUL7LXAXZ1dff9r+oFUZo6xDQ3ER/OTIKa4jpvaI9S/J1drsrI1f9kkMWFwEh48dCPYplGSxzAgMBAAE=",
  getKeyWordArray: function() {
    return CryptoJS.enc.Base64.parse(this.keyBase64);
  },
  generateRandomIvBytes: function() {
    return CryptoJS.lib.WordArray.random(16);
  },
  generateRandomAesKeyBytes: function() {
    return CryptoJS.lib.WordArray.random(32);
  },
  encryptAes: function(obj) {
    var ivWordArray = this.generateRandomIvBytes();
    var encrypt = CryptoJS.AES.encrypt(JSON.stringify(obj), this.getKeyWordArray(), {iv: ivWordArray, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
   //= this.encryptAesCbc(obj, ivWordArray);
    var ivBase64 = CryptoJS.enc.Base64.stringify(ivWordArray);

    var encrypted = {
      iv: ivBase64,
      text: encrypt.toString()
    };
    return encrypted;
  },
  decryptAes: function(textBase64, ivBase64) {
    var ivWordArray = CryptoJS.enc.Base64.parse(ivBase64);
    var decrypt = CryptoJS.AES.decrypt(textBase64, this.getKeyWordArray(), {iv: ivWordArray, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
    //var decrypt = this.decryptAesCbc(textBase64, ivWordArray);
    var plaintext = decrypt.toString(CryptoJS.enc.Utf8);
    var obj = JSON.parse(plaintext);
    return obj;
  },
  encryptRsa: function() {

    var aesWordArray = this.generateRandomAesKeyBytes();
    this.keyBase64  = CryptoJS.enc.Base64.stringify(aesWordArray);

    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(this.rsaPublicKey);
    var encrypted = encrypt.encrypt(this.keyBase64);

    var encrypted = {
      rsaPublicKey: this.rsaPublicKey,
      aesKey: encrypted.toString()
    };
    return encrypted;
  },
};

function Config (app, publicRsaKey, url) {
    this.app = app;
    this.publicRsaKey = publicRsaKey;
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

    console.log("sends");
    var encryptedRsa = Security.encryptRsa();
    console.log("encryptedRsa", encryptedRsa);

    Post(encryptedRsa).then(function(rsaResponse) {
      console.log("rsaResponse", rsaResponse);
      var sessionId = rsaResponse.sessionId;
      console.log("sessionId", sessionId);
      var data = {
        "action": "A",
        "amount": 503,
        "account": 4011361100000012,
        "currency": "USD",
        "expmmyyyy": "012017",
        "cvv": "123",
        "cardHolderName": "John Doe",
        "avsZip": "22222"
      };
      var encryptedAes = Security.encryptAes(data);
      var objectData = {sessionId: sessionId, app: 'DEMO', aesData: encryptedAes.text, iv: encryptedAes.iv};
      console.log("objectData", objectData);
      Post(objectData).then(function(res) {
        // this should return success from Charge function
        console.log("res", res);
          var decryptrdAes = Security.decryptAes(res.aesData,res.iv);
          console.log("decrypted AES::",decryptrdAes);
      });
    });

    // $.post('https://redpaydev.azurewebsites.net/ecard', encryptedRsa)
    // .then(function(rsaResponse) {
    //   console.log("rsaResponse", rsaResponse);
    //   var sessionId = rsaResponse.sessionId;
    //   console.log("sessionId", sessionId);
    //   var data = {
    //     "action": "A",
    //     "amount": 503,
    //     "account": 4011361100000012,
    //     "currency": "USD",
    //     "expmmyyyy": "012017",
    //     "cvv": "123",
    //     "cardHolderName": "John Doe",
    //     "avsZip": "22222"
    //   };
      // $.post('https://redpaydev.azurewebsites.net/ecard', objectData)
      // .then(function(res) {
      //   // this should return success from Charge function
      //   console.log("res", res);
      //     var decryptrdAes = Security.decryptAes(res.aesData,res.iv);
      //     console.log("decrypted AES::",decryptrdAes);
      // });

    // var RedPayRequest = arguments[0];
    // RedPayRequest.action = "A";
    // //console.log("RedPayRequest", RedPayRequest);
    //
    // var packet = new Packet(config.app, RedPayRequest);
    // return Post(packet)
    // .then(function(response) {
    //   return response
    // });
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
  return $.post('https://redpaydev.azurewebsites.net/ecard', packet)
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
var config = new Config("DEMO", "MIIBojANBgkqhkiG9w0BAQEFAAOCAY8AMIIBigKCAYEAtsQxNp3vmKVNYIxfWSi0LIRgCnPaMn0MUNouxgrs4zmg4cnvSeQ3I8YP03YbpXuWA80RvOw/nWErYAKomniJw8Y+xexMfBQ5sgJgewn3ZnRPNM9Y4Z62gwfIlsrs7Bwvpz9uUtLgeQLl1ffNaumnu1IBrqRps0EZ1QyDuu41UckTyo31C40Wez6IbeMfZeusrmPlIWqyBacdviJ5zHCA3zHNq86QMnB8HOP1U81HOSs6GTTelhD7lCoJ+fHKHxcz0MDr37fNpKpC57B0/20wBXFp9tlVtSkHcIty1lyNk2/HDH8knCdqkZk+fCvWgGwdex41x8/rM+LKC13c5J/yG6Gb2PnKhwNk4lvvnz73YAdqTUJ7qNrdtWVnOTWfbMBiNlpBCVqt8xY8UK6u83AVWrWXse0xe2Pn/kRqlXmxWT0mGEoCavjvZ9lQUL7LXAXZ1dff9r+oFUZo6xDQ3ER/OTIKa4jpvaI9S/J1drsrI1f9kkMWFwEh48dCPYplGSxzAgMBAAE=", "https://redpaydev.azurewebsites.net/ecard");
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

  // // Voiding that Charge
  // var voidParams = {
  //   transactionId: response.data.transactionId
  // };
  //
  // card.Void(voidParams)
  // .then(function(response){
  //     console.log("Void Reponse", response);
  // })

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

// card.Charge(charge2Params)
// .then(function(response) {
//   console.log("Charge response: ", response);
//
//   // Refunding that Charge
//   var refundParams = {
//     transactionId: response.data.transactionId,
//     amount: response.data.amount
//   };
//
//   card.Refund(refundParams)
//   .then(function(response){
//       console.log("Refund Reponse", response);
//   })
//
// });
