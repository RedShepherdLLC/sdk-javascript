function Post(packet) {
  window.onload = function() {
    var input = packet;
    $.post('http://redpaydemo.azurewebsites.net/card', input)
    .then(
        function success(userInfo) {
            console.log(userInfo);
        }
    );
  }
}

var packet = {
    "app": "DEMO",
    "data":
    {
        "action": "A",
        "amount": 5100,
        "cardholderName":"JOHN DOE",
        "account": "4011361100000012",
        "avsZip": "22222",
        "expmmyyyy": "012017",
        "cvv":"123",
        "retryCount":"1"
    }
};
Post(packet);
