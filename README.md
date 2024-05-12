# Legal-Document-Summarizer

## Overview:
This project aims to develop a legal document summarization system using various machine learning techniques. The system uses the BART (Bidirectional and Auto-Regressive Transformers) model for summarization along with tokenization techniques. Additionally, it employs SVM (Support Vector Machine), Multinomial Naive Bayes, Voting Classifier, Random Forest, and Multinomial Naive Bayes with Adaptive Boost for comparative analysis of summarization quality. 

## Workflow:

### Document Preprocessing:
Input legal documents are preprocessed to remove noise, irrelevant information, and formatting inconsistencies.
The documents are tokenized using the BART tokenizer for further analysis.

### Comparative Analysis:
SVM and Multinomial Naive Bayes algorithms are applied to the tokenized documents to generate summaries using different summarization methods.
Each summarization method produces a summary for each piece of the document.

### Evaluation:
The generated summaries are evaluated based on metrics such as ROUGE scores, coherence, and relevance.
Comparative analysis results are analyzed to determine the most effective summarization method.

### Final Summarization:
The best-performing summarization method, determined through comparative analysis, is used to generate piece-wise summaries for each section of the document.
Piece-wise summaries are concatenated to create the final summary of the legal document.
