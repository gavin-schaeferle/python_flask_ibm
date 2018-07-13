import re

def get_sentences(text):
	text = text.replace('!', '.').replace('?', '.').replace('\n', '.')
	sents = text.split(".")

	sents = [s for s in sents if s != ""]
	for i in range(len(sents)):
		current_sent = sents[i]
		if current_sent.startswith('" '):
			sents[i] = current_sent[len('" '):]
			sents[i-1] += '"'

		if current_sent == '"':
			sents[i] = ''
			sents[i-1] += '"'


	return sents



def contains_entire_quote(sent):
	entire_quote_pattern = re.compile('".+"')
	if entire_quote_pattern.search(sent):
		return True
	return False

def contains_quote_start(sent):
	start_quote_pattern = re.compile('".+')
	if start_quote_pattern.search(sent):
		return True
	return False

def contains_quote_end(sent):
	end_quote_pattern = re.compile('.+"')

	if end_quote_pattern.search(sent):
		return True
	return False


def get_text_without_quotes(text_sents_list, quotes_list):
	quote_sents = [sent for quote in quotes_list for sent in quote]
	sents = [sent.strip() for sent in text_sents_list if sent not in quote_sents and sent != '']
	return ". ".join(sents)

def get_quotes(quotes_list):
	quotes = [". ".join(quote).strip() for quote in quotes_list]
	quotes_list = [q.strip() for q in quotes]
	return ". ".join(quotes_list)
	
def separate_text_and_quotes(sents, quotes):
	text = get_text_without_quotes(sents, quotes)
	quotes = get_quotes(quotes)
	return text, quotes


def get_text_and_quotes(text):
	sentences = get_sentences(text)
	
	in_quote = False
	quotes = []
	current_quote = []

	for s in sentences:
		if in_quote == False and contains_entire_quote(s):
			quotes.append([s])

		elif in_quote == False and contains_quote_start(s):
			current_quote.append(s)
			in_quote = True

		elif in_quote == True:
			current_quote.append(s)

			if contains_quote_end(s):
				quotes.append(current_quote)
				current_quote = []
				in_quote = False

	text_without_quotes, quotes = separate_text_and_quotes(sentences, quotes)
	return [text_without_quotes, quotes]
	#print(text_without_quotes)
	#print(quotes)
