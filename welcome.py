# Copyright 2015 IBM Corp. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import os
from flask import Flask, jsonify , flash, redirect, render_template, request, session, abort
#import analysis
#import watson_developer_cloud
app = Flask(__name__)
 
@app.route("/hello/<string:name>/")
def hello(name):
    return render_template('test.html',name=name)
@app.route('/')
def first_welcome():
	return render_template("index.html",my_string="Input")
@app.route('/', methods=['POST'])
def Welcome():
     #return "Hello World"
      #return app.send_static_file('index.html')
	#return render_template('index.html')
	return analysis.getStats("A bunny needs food to live")
	#return render_template("index.html" ,my_string="You da best!!")
@app.route('/myapp')
def WelcomeToMyapp():
    return 'Welcome again to my app running on Bluemix!'

@app.route('/contact.html')
def showContactPage():
	return app.send_static_file('contact.html')
@app.route('/api/people')
def GetPeople():
    list = [
        {'name': 'John', 'age': 28},
        {'name': 'Bill', 'val': 26}
    ]
    return jsonify(results=list)

@app.route('/api/people/<name>')
def SayHello(name):
    message = {
        'message': 'Hello master, what shall be my bidding today?'
    }
    return jsonify(results=message)

port = os.getenv('PORT', '5000')
if __name__ == "__main__":
	app.run(host='0.0.0.0', port=int(port))
