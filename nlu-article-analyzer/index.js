const http = require('http');
const { parse } = require('querystring');
const fs = require('fs');
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
const _ = require('lodash');

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        collectRequestData(req, result => {
            var resNew = result.textField
            parseData(resNew, result1 => {
            	//console.log(JSON.stringify(result1, null, 2))
            	var listOfConcepts = []
            	for(var key in result1.concepts) {
            		listOfConcepts.push(result1.concepts[key].text)
            		if(listOfConcepts.length == 10) {
            			break
            		}
            	}
            	res.end(`
            		<!doctype html>
            		<html>
            		<body>
            			<p>And here are your results!</p>

            			<p>the Biggest Mood is ${_.findKey(result1.emotion.document.emotion, function(v) { return v === _(result1.emotion.document.emotion).values().max() })} with a value of ${ _(result1.emotion.document.emotion).values().max()}</p>
            			<p>This article may be trying to make you feel ${result1.sentiment.document.label} about the topic, with the sentiment score being ${result1.sentiment.document.score}</p>
            			<p>Here are some concepts that may be useful for future research: </p>
            			${listOfConcepts.join(", ")}
            		</body>
            		</html>
            	`);
            }) 
        });
    } 
    else {
        res.end(`
            <!doctype html>
            <html>
            <body>
            	<p>Please paste your article in the box below! Currently, only English is supported.</p>
                <form action="/" method="post">
                    <input type="text" id="input" name="textField">
					<button type="submit" id="submitButton">Submit</button>
                </form>
            </body>
            </html>
        `);
    }
});
server.listen(8080);

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

/* FUNCTIONS */

//access credentials
var USERNAME = "ef261f02-50af-4207-bca5-e8cecb4f1234"
var PASSWORD = "jSiVgDjYynBu"
var VERSION = "2018-03-19"


function parseData(input, callback) {
	var nlu = new NaturalLanguageUnderstandingV1({
		username: USERNAME,
		password: PASSWORD,
		version: VERSION,
		url: 'https://gateway.watsonplatform.net/natural-language-understanding/api/'
	});
	nlu.analyze(
		{
			text: input, // Buffer or String
			features: {
				emotion: {},
				concepts: {},
				keywords: {},
				sentiment: {}
			},
			language: "en"
		},
	
		function(err, response) {
			if (err) {
				console.log('error:', err);
				callback(null)
			} else {
				console.log('success');
				console.log(JSON.stringify(response, null, 2));
				callback(response)
			}
	});
};
