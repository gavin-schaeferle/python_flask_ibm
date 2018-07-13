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
            		<!DOCTYPE html>
            <html>
                <head>
                    <style>
                        /* General Formatting */
                        *{
                            font-family: Courier, sans-serif;
                            font-size: 1.5vw;
                            /*font-style: italic;*/
                            color: #1d1e1e;
                            box-sizing: border-box;
                        }

                        body {
                          margin: 0;
                        }

                        /*Kyle's Header Styling header.html*/
                        /* Add a black background color to the top navigation */
                        .topnav {
                            opacity: 0.7;
                            background-color: #333;
                            overflow: hidden;
                            z-index: 10;
                        }

                        /* Style the links inside the navigation bar */
                        .topnav a {
                            float: left;
                            display: block;
                            color: #f2f2f2;
                            text-align: center;
                            padding: 14px 16px;
                            text-decoration: none;
                            font-size: 2vw;
                        }

                        /* Change the color of links on hover */
                        .topnav a:hover {
                            background-color: #ddd;
                            color: black;
                        }

                        /* Add an active class to highlight the current page */
                        .active {
                            background-color: cadetblue;
                            color: white;
                        }

                        /* Hide the link that should open and close the topnav on small screens */
                        .topnav .icon {
                            display: none;
                        }

                        header {
                            text-align: center;
                            background-color: #222629;
                            color: #86C232; 
                            padding: 20px;
                            font-size: 5vw;
                        }

                        /* Headings */
                        h1{
                            text-align: center;
                            font-size: 2.5vw;
                        }

                        h2 {
                            color: #86C232;
                            text-align: center;
                        }

                        body {
                            color: navy;
                            background-color: #6B6E70;
                        }

                        /* Create 2 equal columns that floats next to each other*/
                        .column {
                            float: left;
                            width: 50%;
                            padding: 15px;
                            color: #FFFFFF;
                        }

                        .form {
                            width: 100%;
                            word-break: break-word;
                        }

                        .input {
                            width: 100%;
                            min-height: 100px;
                            word-break: break-word;
			    height: 90%;
                        }

                        .subButton {
                            color: #86C232;
                        }

                        /* Clear floats after the columns */
                        .row:after {
                            content: "";
                            display: table;
                            clear: both;
                        }


                        /* Second Row Stuff */
                        .Chart {
                            width: 50%;
                            background-color: #FFFFFF;
                        }

                        .container {
                            background-color: #FFFFFF;
                        }

                        .other {
                            width: 50%;
                        }

                        .copywriteFoot p{
                            width: 100%;
                            color: #86C232;
                        }

                        .copywriteFoot {
                            bottom: 0;
                            background-color: #222629;
                            text-align: center;
                            font-size: 2vw;
                            margin-top: 1.5em;
                            padding-top: 1em;
                            padding-bottom: 1em;
                            color: #86C232;
                            border-top: double;
                        }
                        
                        form.input {
                        	height: 90%;
                        }

                        /* Responsive layout - makes the three columns stack on top of each other instead of next to each other 
                            When the screen is less than 600 pixels wide, hide all links, except for the first one ("Home"). 
                            Show the link that contains should open and close the topnav (.icon) 
                            The "responsive" class is added to the topnav with JavaScript when the user clicks on the icon. 
                            This class makes the topnav look good on small screens (display the links vertically instead of horizontally)*/
                        @media screen and (max-width:600px) {
                            .column {
                                width: 100%;
                            }
                            
                            .copywriteFoot { 
                                font-size: 12px; 
                            }
                            
                            .topnav a:not(:first-child) { 
                                display: none;
                            }
                            
                            .topnav a.icon {
                              float: right;
                              display: block;
                            }
                            
                            .topnav a { 
                                font-size: 16px; 
                            }
                            
                            .topnav.responsive { 
                                position: relative;
                            }
                            
                            .topnav.responsive a.icon {
                                position: absolute;
                                right: 0;
                                top: 0;
                            }
                            
                            .topnav.responsive a {
                                float: none;
                                display: block;
                                text-align: left;
                            }
                            
                        }

                        /*Kyle's styling for contact form contact.php*/
                        .map-responsive {
                            overflow:hidden;
                            padding-bottom:25px;
                            position:relative;
                            height:200px;
                        }

                        .map-responsive iframe{
                            left:0;
                            top:0;
                            width:100%;
                            height: 200px;
                            position:absolute;
                        }

                        table {  
                            width: 90%;
                            margin: 0 auto;
                        }

                        table tbody td{
                            vertical-align: top;
                        }

                        table tbody td input {
                            min-height:
                        }
                         
                        legend {
                            background-color: #616161 ;
                            color: white;
                            margin: 0 auto;
                            width: 90%;
                            padding: 0.25em;
                            text-align: center;
                            font-weight: bold;
                            font-size: 2.5vw;
                        }

                        fieldset {
                            margin: 1em auto;
                            background-color: #F5F5F5;
                            width: 70%;
                        }

                        form p {
                            margin-top: 0.5em;
                        }

                        form input[type="text"], form input[type="email"], form input[type="tel"], form select {
                            font-size: 1.5vw;
                            height: 24px;
                            padding: 3px;
                        }

                        form select {
                            height: 30px;
                        }

                        #firstname, #lastname, #email, #phonenumber, #references  { 
                            width: 90%;
                            height: 90%; 
                        }

                        #references{ 
                            box-shadow: 0 0 5px cornflowerblue; 
                        }

                        .box {
                            border: 1pt solid #9E9E9E;
                            padding: 0.5em;
                            margin-bottom: 0.4em;
                        }
                         
                        .rectangle {
                            background-color: #BDBDBD;
                            padding: 0.5em;
                            margin-bottom: 5px;
                        }

                        .centered {
                            display: block;
                            margin: auto;
                        }

                        .customcenter{
                            text-align: center;
                        }

                        .g-recaptcha {
                            display: inline-block;
                        }

                        .highlight {
                            background-color: #FFE0B2;
                        }

                        .error {
                            background: #FFCDD2 url('../images/error.png') no-repeat 98% center;
                            box-shadow: 0 0 5px #FF5252;
                            border-color: #FF1744;    
                        }
                         
                        .button {
                           -webkit-border-radius: 3;
                           -moz-border-radius: 3;
                           border-radius: 3px;
                           height: 32px;
                           color: black;
                           font-size: 1.5vw;
                           background: #FF9100;
                           padding: 5px 20px 5px 20px;
                           text-decoration: none;
                        }
                         
                        .button:hover {
                           background: #FFAB40;
                           text-decoration: none;
                        }

                        @media screen and (max-width: 800px){
                            label {font-size: 12px;}
                            .box{font-size: 12px;}
                            form input[type="text"], form input[type="email"], form input[type="tel"], form select { font-size: 12px; }
                            .button { font-size: 12px; }
                        }

                        /*Kyle's styling for contact form errors contact.html*/
                         
                        #errors{
                            width: 73%;
                            margin: 0 auto;
                            padding: 12px;
                            background: #FFCDD2;
                            box-shadow: 0 0 5px #FF5252;
                            border-color: #FF1744;
                        }

                        #errors p{
                            color: black;
                            font-size: 1.5vw;
                            font-weight: bold;
                        }

                        #errorMessages p{
                             color: black;
                             font-size: 1.5vw;
                             padding: 5px;
                             font-weight: normal;
                        }

                        @media screen and (max-width: 800px){
                            #errors p{ font-size: 12px; }
                            #errorMessages p{ font-size: 12px; }
                        }
                    </style>        
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <!-- <script type="text/javascript" src="bar.js"></script>-->   
                    <title>Cognitive Article Analysis</title>
                </head>
                <div class="topnav" id="myTopnav">
                        <a href="../templates/index.html" >Home</a>
                        <a href="../static/contact.html">Contact Us</a>
                        <a href="javascript:void(0);" class="icon" onclick="updateNavClass()">&#9776;</a>
                </div>
                <body>
                    <header>Cognitive Article Analysis</header>
                    <div class="row">
                        <div class="column">
                            <h2>Description</h2>
                            <p>Ever wondered what your favorite news anchor or news corporation thinks of a particular event? Ever wonder what their tone really says about the story? Paste in the text of the news article and find out! Our algorithm will output what the text is really trying to say!</p>
                        </div>
                        <div class="column">
                            <h2>Index</h2>
                            <form action="/" method="post">
                                <input type="text" id="input" name="textField">
                                <button type="submit" id="submitButton">Submit</button>
                            </form>
                        </div>
                    </div>
                    <div class="row">
                        <div class="column">
                            <h2>Results</h2>
                                
                        <div class="column">
                            <h2>More Results</h2>
                            <p>the Biggest Mood is ${_.findKey(result1.emotion.document.emotion, function(v) { return v === _(result1.emotion.document.emotion).values().max() })} with a value of ${ _(result1.emotion.document.emotion).values().max()}</p>
                            <p>This article may be trying to make you feel ${result1.sentiment.document.label} about the topic, with the sentiment score being ${result1.sentiment.document.score}</p>
                            <p>Here are some concepts that may be useful for future research: </p>
                            ${listOfConcepts.join(", ")}
                        </div>
                    </div>
                    <div class="copywriteFoot" id="myFooter">
                        <p>&copy; 2018 Indecisive Iguanas. No rights reserved. Updated: 07-12-2018</p> 
                    </div>
                </body>
            </html>
            	`);
            }) 
        });
    } 
    else {
        fs.readFile('./index.html', function read(err, data) {
            if (err) {
                throw err;
            }
            res.writeHead(200, {'Content-Type':'text/html'});
            res.write(data);
            res.end();
        })
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
