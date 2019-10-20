var Agent = require("./Agent");
var ServiceOrder = require("./ServiceOrder");
var ServiceCodes = require("./ServiceCodes");

var agent = new Agent("1","Pepe", ServiceCodes['ILA']['code']);
var order = new ServiceOrder("2","Lucas", ServiceCodes['ILA']['code']);

console.log(agent);
console.log(order);
