#import requests, sys, json, operator
from watson_developer_cloud import NaturalLanguageUnderstandingV1



def getStats(text):
	nlu = NaturalLanguageUnderstandingV1(version='2018-03-19',username='ef261f02-50af-4207-bca5-e8cecb4f1234',password='jSiVgDjYynBu')
	header={'Content-Type': 'application/json'}
	features={'sentiment': {}, 'keywords': {}, 'emotion': {}}

	r = nlu.analyze(headers=header, text=text, features=features)

	#print text
	#print(json.dumps(r, indent=1))
	return r
	


def parseResponse(text):
	#parsed = json.loads(text)
	parsed = getStats(text)
	resp = ""
	resp += 'This document was mostly %s, with a sentiment score of %s.\n' % (parsed['sentiment']['document']['label'], parsed['sentiment']['document']['score'])
	resp += 'The emotions (anger, joy, sadness, fear, disgust) in this article, with the strongest at the top, are:'
	for item in sorted(parsed['emotion']['document']['emotion'].items(), key=operator.itemgetter(1), reverse=True):
		resp += ' ' + item[0]

	emotions = parsed['emotion']['document']['emotion']


	return resp, emotions

#if __name__ == "__main__":
#	parseResponse(sys.argv[1])
