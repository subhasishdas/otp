const express = require('express');
const os = require('os');
//var express  = require('express');
var app      = express();
//var port     = process.env.PORT || 8080;
//var flash    = require('connect-flash');
var SendOtp  = require("sendotp");
//var morgan       = require('morgan');
var bodyParser   = require('body-parser');
const sendOtp = new SendOtp('265294AoZhBoZ4MDI5c780bce');
//app.use(morgan('dev'));  // read cookies (needed for auth)
app.use(bodyParser());  // persistent login sessions
//app.use(flash()); // use connect-flash for flash messages stored in session
//const app = express();
var ph=1;
var ver='error';
app.use(express.static('dist'));
//app.get('/isverified', (req, res) => res.send({ username: os.userInfo().username }));
// app.get('/isverified', (req, res) => res.send({ verifiedtext: ver }));

app.post("/otp",function(req,res) {
	console.log(req.body);
	var number=req.body.phone;
	ph=number;
	console.log(number);
	sendOtp.send(number, "PRIIND", function (error, data) {
  		console.log(data);
		res.send({msg:"sent"});
	});
})
app.post("/verify",function(req,res) {
	// var number=req.body.phone;
	// console.log(number);
	var num=req.body.num;
	console.log("hello bhai");
	sendOtp.verify(ph,num , function (error, data) {
  console.log(data); // data object with keys 'message' and 'type'
  if(data.type == 'success') console.log('OTP verified successfully')
  if(data.type == 'error') console.log('OTP verification failed')
  	ver=data.type;
  	res.json({verifiedtext:ver});
});
});


app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
