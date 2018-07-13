function get_sentences(text){
	var tempText = text.replace('!', '.').replace('?', '.').replace('\n', '.');
	var sents = text.split(".");

	var i;
	for(i = 0; i < sents.length; i++){
		var currentSent = sents[i];

		//Clean up resulting sentences
		if (currentSent.startsWith("\" ")) {
			sents[i] = currentSent.substring(2, currentSent.length);
			sents[i-1] = sents[i-1] + "\"";
		}

		else if(currentSent.startsWith("\"")){
			sents[i] = currentSent.substring(1, currentSent.length);
			sents[i-1] = sents[i-1] + "\"";
		}
	}

	return sents;
}



function contains_entire_quote(sent){
	var contains_quote = sent.search("\".+\"");
	return contains_quote != -1;
}


function contains_quote_start(sent){
	var contains_quote = sent.search("\".+");
	return contains_quote != -1;
}

function contains_quote_end(sent){
	var contains_quote = sent.search(".+\"");
	return contains_quote != -1;
}


function get_quotes(quotes_list){
	var i;
	var str_quotes_arr = [];

	for(i = 0; i < quotes_list.length; i++){
		var quote = quotes_list[i].join(". ");
		//quotes_str += quote;
		str_quotes_arr.push(quote);
	}

	return str_quotes_arr;
}


function get_text_without_quotes(text_sents_list, quotes_list){
	var flattened_quotes = [];
	var i;
	var j;

	for(i=0; i < quotes_list.length; i++){
		for(j = 0; j < quotes_list[i].length; j++){
			flattened_quotes.push(quotes_list[i][j]);
		}
	}


	var sents_arr = [];
	for(i = 0; i < text_sents_list.length; i++){
		var current_sent = text_sents_list[i];
		if(flattened_quotes.indexOf(current_sent) == -1){
			sents_arr.push(current_sent);
		}
	}

	return sents_arr;
	//return flattened_quotes;
}


function separate_text_and_quotes(sents, quotes){
	var quotes_str_arr = get_quotes(quotes);
	var text_arr = get_text_without_quotes(sents, quotes);
	
	return [text_arr.join(". "), quotes_str_arr.join(". ")];
}

function get_text_and_quotes(text){
	var sentences = get_sentences(text);

	var in_quote = false;
	var quotes = [];
	var current_quote = [];

	var i;

	for(i = 0; i < sentences.length; i++){
		sent = sentences[i];

		var entire_quote_in_sent = contains_entire_quote(sent);
		var start_quote_in_sent = contains_quote_start(sent);
		

		if (in_quote == false){
			var entire_quote_in_sent = contains_entire_quote(sent);
			var start_quote_in_sent = contains_quote_start(sent);
			if(entire_quote_in_sent == true){
				//add sent to current_quote
				current_quote.push(sent);
			}
			else if(start_quote_in_sent == true){
				//add sent to current_quote
				current_quote.push(sent);
				in_quote = true;
			}
		}
		else{
			var end_quote_in_sent = contains_quote_end(sent);
			
			//add sent to current_quote
			current_quote.push(sent);

			if (end_quote_in_sent == true){
				//add current_quote to quotes
				quotes.push(current_quote);

				current_quote = [];
				in_quote = false;
			}
		}

	}

	return separate_text_and_quotes(sentences, quotes);
}
