# app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
#from bert_score import BERTScorer

with open('bart_model.pkl', 'rb') as f:
    model = pickle.load(f)

with open('bart_tokenizer.pkl', 'rb') as f:
    tokenizer = pickle.load(f)

def summarize(text, maxSummarylength=500):
    inputs = tokenizer.encode(text, return_tensors="pt", max_length=1024, truncation=True)
    summary_ids = model.generate(inputs, max_length=maxSummarylength, min_length=int(maxSummarylength/5), length_penalty=10.0, num_beams=4, early_stopping=True)
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    return summary

def split_text_into_pieces(text, max_tokens=600, overlapPercent=10):
    tokens = tokenizer.tokenize(text)
    overlap_tokens = int(max_tokens * overlapPercent / 100)
    pieces = [tokens[i:i + max_tokens] for i in range(0, len(tokens), max_tokens - overlap_tokens)]
    text_pieces = [tokenizer.decode(tokenizer.convert_tokens_to_ids(piece), skip_special_tokens=True) for piece in pieces]
    return text_pieces

app = Flask(__name__)
CORS(app)  # This allows Cross-Origin Resource Sharing (CORS) for all routes

@app.route('/process_text', methods=['POST'])
def process_text():
    data = request.json
    input_text = data.get('text', '')

    max_length = 500

    tokens = tokenizer.tokenize(input_text)
    expectedCountOfChunks = len(tokens) / max_length
    max_length = int(len(tokens) / expectedCountOfChunks) + 2

    # Break the text into pieces of max_length
    pieces = split_text_into_pieces(input_text, max_tokens=max_length)

    print("Number of pieces:", len(pieces))
    sub_summaries = []
    k = 0
    for k in range(0, len(pieces)):
        piece = pieces[k]
        summary = summarize(piece, maxSummarylength=150)
        sub_summaries.append(summary)

    concatenated_summary = ' '.join(sub_summaries)
    processed_text = concatenated_summary

    #scorer = BERTScorer(lang="en")
    #_, _, f1_score = scorer.score(input_text, processed_text)

    return jsonify({'textInput': input_text, 'processedText': processed_text})

if __name__ == '__main__':
    app.run(debug=True)
