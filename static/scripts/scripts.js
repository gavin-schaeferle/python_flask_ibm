var fs = require('fs');
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

console.log("we accessed the js")
//access credentials
var USERNAME = "ef261f02-50af-4207-bca5-e8cecb4f1234"
var PASSWORD = "jSiVgDjYynBu"
var VERSION = "2018-03-19"


function getStats() {
	var nlu = new NaturalLanguageUnderstandingV1({
		username: USERNAME,
		password: PASSWORD,
		version: VERSION,
		url: 'https://gateway.watsonplatform.net/natural-language-understanding/api/'
	});

	nlu.analyze(
		{
			text: "I am going to buy a car today", // Buffer or String
			features: {
				emotions: {},
				sentiment: {},
				keywords: {}
			}
		},

	function(err, response) {
		if (err) {
			console.log('error:', err);
			alert("no")
		} else {
			console.log(JSON.stringify(response, null, 2));
			alert("Hi!")
		}
	});
}

function test() {
	alert("Hi!");
}