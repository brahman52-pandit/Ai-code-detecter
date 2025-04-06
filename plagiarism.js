fetch('/api/check-plagiarism', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: textInput.value }),
})
.then(response => response.json())
.then(data => displayResults(data));