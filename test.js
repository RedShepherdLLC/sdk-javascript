/////////////
// TESTING //
/////////////

// Account setup
var config = new Config("DEMO", "MIIBojANBgkqhkiG9w0BAQEFAAOCAY8AMIIBigKCAYEAtsQxNp3vmKVNYIxfWSi0LIRgCnPaMn0MUNouxgrs4zmg4cnvSeQ3I8YP03YbpXuWA80RvOw/nWErYAKomniJw8Y+xexMfBQ5sgJgewn3ZnRPNM9Y4Z62gwfIlsrs7Bwvpz9uUtLgeQLl1ffNaumnu1IBrqRps0EZ1QyDuu41UckTyo31C40Wez6IbeMfZeusrmPlIWqyBacdviJ5zHCA3zHNq86QMnB8HOP1U81HOSs6GTTelhD7lCoJ+fHKHxcz0MDr37fNpKpC57B0/20wBXFp9tlVtSkHcIty1lyNk2/HDH8knCdqkZk+fCvWgGwdex41x8/rM+LKC13c5J/yG6Gb2PnKhwNk4lvvnz73YAdqTUJ7qNrdtWVnOTWfbMBiNlpBCVqt8xY8UK6u83AVWrWXse0xe2Pn/kRqlXmxWT0mGEoCavjvZ9lQUL7LXAXZ1dff9r+oFUZo6xDQ3ER/OTIKa4jpvaI9S/J1drsrI1f9kkMWFwEh48dCPYplGSxzAgMBAAE=", "https://redpaydev.azurewebsites.net/ecard");
var card = new RedPayCardProcessor(config);

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
.then(function(RedPayResponse) {
  console.log("Charge response: ", RedPayResponse);
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
