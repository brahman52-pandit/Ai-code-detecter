from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup
import PyPDF2
import docx
# Removed unused import
import difflib
from collections import defaultdict

app = Flask(__name__)

# Mock database of known sources (in a real app, use a proper database)
KNOWN_SOURCES = {
    "This is some sample code": [
        {"url": "https://example.com/source1", "similarity": 85},
        {"url": "https://example.com/source2", "similarity": 75}
    ],
    "Another example of text": [
        {"url": "https://example.com/source3", "similarity": 90}
    ]
}

def extract_text_from_pdf(file):
    reader = PyPDF2.PdfReader(file)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text

def extract_text_from_docx(file):
    doc = docx.Document(file)
    return "\n".join([para.text for para in doc.paragraphs])

def check_plagiarism(text):
    # In a real implementation, you would:
    # 1. Check against your database
    # 2. Use a plagiarism API (like Turnitin, Copyscape, etc.)
    # 3. Search the web for matches
    
    # For this demo, we'll just check against our mock database
    results = {
        "originality": 100,
        "plagiarism": 0,
        "sources": []
    }
    
    # Simple similarity check (in a real app, use more sophisticated methods)
    for known_text, sources in KNOWN_SOURCES.items():
        seq = difflib.SequenceMatcher(None, text.lower(), known_text.lower())
        similarity = seq.ratio() * 100
        
        if similarity > 30:  # Threshold for considering it a match
            results["plagiarism"] += similarity
            results["sources"].extend(sources)
    
    results["plagiarism"] = min(100, results["plagiarism"])
    results["originality"] = 100 - results["plagiarism"]
    
    return results

@app.route('/api/check-plagiarism', methods=['POST'])
def check_plagiarism_api():
    content_type = request.headers.get('Content-Type')
    
    if content_type == 'application/json':
        data = request.json
        text = data.get('text', '')
    elif 'multipart/form-data' in content_type:
        if 'file' in request.files:
            file = request.files['file']
            if file.filename.endswith('.pdf'):
                text = extract_text_from_pdf(file)
            elif file.filename.endswith(('.doc', '.docx')):
                text = extract_text_from_docx(file)
            else:
                text = file.read().decode('utf-8')
        else:
            return jsonify({"error": "No file provided"}), 400
    else:
        return jsonify({"error": "Unsupported Content-Type"}), 400
    
    if not text.strip():
        return jsonify({"error": "No text provided"}), 400
    
    results = check_plagiarism(text)
    return jsonify(results)

@app.route('/api/check-url', methods=['POST'])
def check_url_api():
    data = request.json
    url = data.get('url', '')
    
    if not url:
        return jsonify({"error": "No URL provided"}), 400
    
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        text = ' '.join([p.get_text() for p in soup.find_all('p')])
        
        results = check_plagiarism(text)
        return jsonify(results)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
    