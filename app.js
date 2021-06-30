var express=require('express');
var bodyParser=require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/family');
var db=mongoose.connection;
db.on('error', console.log.bind(console, 'connection error'));
db.once('open', function(callback){
	console.log('connection succeeded');
})

var app=express()
var path=require('path');

app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/images', express.static(__dirname + '/Images'));
app.use(bodyParser.urlencoded({
	extended: false
}));
app.set('view engine','ejs');
app.post('/index', function(req,res){
	var name = req.body.name;
	var email =req.body.email;
	
	
	var message =req.body.message;



	var data = {"name":name,"email":email,"message":message}
	
	db.collection('details').insertOne(data,function(err, collection){

		if (err) throw err;
		console.log("Record inserted Successfully");	
	
	});

    return res.render('message');
		
	
})
app.get('/message',function(req,res){
	res.sendFile( path.join(__dirname + '/index.html'));
})
app.get('/',function(req,res){
    res.sendFile( path.join(__dirname + '/index.html'));
}).listen(3030)



