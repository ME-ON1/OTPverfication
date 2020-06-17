var express = require('express');
var router = express.Router();
var SpeakEasy = require("speakeasy")


const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN

const client = require('twilio')(accountSid,authToken)


var secret = SpeakEasy.generateSecret({length : 20})

router.get('/',(req,res,next)=>{
	res.render('index')
})

router.post('/',(req,res,next)=>{
	
	let {number } = req.body

	var token = SpeakEasy.totp({
		secret : secret.base32,
		encoding : "base32"
	})

	client.messages.create({
		body : token,
		from : process.env.P_NUMBER,
		to : number
	})
	.then(message => console.log(message.sid))
	res.redirect('/verify')
	
})

router.get('/verify',(req,res,next)=>{
	res.render('verify')
})

router.post('/verify',(req,res,next)=>{
	let {token } = req.body ;


	console.log(token);
	let tokenValidates = SpeakEasy.totp.verify({
		secret : secret.base32,
		encoding : 'base32',
		token : token,
		window : 6
	})

	console.log(tokenValidates)
	tokenValidates ? res.render("success") : next("THere is a Error")
	
	
})
module.exports = router;
