var express = require('express');
var app = express();
var mongojs = require('mongojs');

var db = mongojs('contactlist1', ['contactlist1']);
var bodyParser = require('body-parser');

db.on('ready', function () {
    console.log('database connected')
});

// app.get('/', function (req, res) {
// 	response.send("Hello Word ")
// });

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactlist', function(req, res) {
	console.log("I recerved a GET request")

	db.contactlist.find(function(err, docs) {
		// console.log(docs);
		res.json(docs);
	})
});

app.post('/addcontact', function(req, res){
	console.log(req.body);
	db.contactlist.insert(req.body, function(err, doc){ 
		res.json(doc);	
		console.log("res");
		console.log(doc);
	});
});

app.delete('/contactlist/:id', function(req, res) {
	var id = req.params.id;
	console.log("deleted");
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	});
});

app.get('/contactlist/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
		console.log(doc);
	})
});

app.put('/contactlist', function(req, res) {
	var id = req.body._id;
	db.contactlist.findAndModify({
		query: {_id: mongojs.ObjectId(id)}, 
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
		new: true}, 
		function(err, doc) {
			res.json(doc);
		});
});


	// var contactlist = [person1, person2, person3];
	// res.json(contactlist);


app.listen(3000);
console.log("Server running on port 3000");