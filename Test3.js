function Post(packet) {
  return $.post('http://redpaydemo.azurewebsites.net/card', packet)
  .then(function (response) {
    console.log("inner response", response);
    return response;
  });
}
//
// var packet = {
//     "app": "DEMO",
//     "data":
//     {
//         "action": "A",
//         "amount": 5100,
//         "cardholderName":"JOHN DOE",
//         "account": "4011361100000012",
//         "avsZip": "22222",
//         "expmmyyyy": "012017",
//         "cvv":"123",
//         "retryCount":"1"
//     }
// };
// Post(packet);
