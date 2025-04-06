// // code_analyzer.js
// document.addEventListener('DOMContentLoaded', function() {
//     const analyzeBtn = document.getElementById('analyze-btn');
//     const codeInput = document.getElementById('code-input');
//     const languageSelect = document.getElementById('language-select');
//     const resultsContent = document.getElementById('resultsContent');
//     const resultBox = document.getElementById('resultBox');

//     // Error patterns for different languages
//     const errorPatterns = {
//         common: {
//             syntax: [
//                 { pattern: /([{\(\[][^\)\]}]*)$/m, message: "Mismatched parentheses/brackets/braces", type: "Syntax Error" },
//                 { pattern: /(?:^|\n)(\s*)\S.*[^\s;{}]\s*$/m, message: "Missing semicolon", type: "Syntax Error", languages: ["javascript", "java", "c", "cpp", "csharp", "php"] },
//                 { pattern: /(int|float|double|char|bool)\s+([a-zA-Z_]\w*)\s*[^=;\n]/g, message: "Missing semicolon after variable declaration", type: "Syntax Error", languages: ["c", "cpp", "java", "csharp"] }
//             ],
//             runtime: [
//                 { pattern: /\/\s*0/g, message: "Potential division by zero", type: "Runtime Error" },
//                 { pattern: /\.\s*[a-zA-Z_]\w*\s*\(/g, message: "Potential null reference error", type: "Runtime Error" },
//                 { pattern: /\[\s*[a-zA-Z_]\w*\s*\]/g, message: "Potential array out-of-bounds access", type: "Runtime Error" }
//             ],
//             logical: [
//                 { pattern: /if\s*\([^)]*\b(true|false)\b[^)]*\)/g, message: "Condition always evaluates to true/false", type: "Logical Error" },
//                 { pattern: /for\s*\(\s*;\s*;\s*\)/g, message: "Infinite loop detected", type: "Logical Error" }
//             ],
//             type: [
//                 { pattern: /([a-zA-Z_]\w*)\s*=\s*[^;=]*[^0-9\s;=]\s*[^;=]*;/g, message: "Potential type mismatch", type: "Type Error" }
//             ],
//             security: [
//                 { pattern: /(SELECT|INSERT|UPDATE|DELETE).*\bWHERE\b.*['"][^'"]*['"]\s*[=<>]+\s*['"][^'"]*['"]/g, message: "Potential SQL injection vulnerability", type: "Security Error" },
//                 { pattern: /innerHTML\s*=\s*[^;]*[^'"]\s*[^;]*;/g, message: "Potential XSS vulnerability", type: "Security Error", languages: ["javascript"] }
//             ]
//         },
//         python: {
//             syntax: [
//                 { pattern: /(def|class|if|elif|else|for|while|try|except|finally|with)\s*[^:]*[^\s:]\s*$/m, message: "Missing colon", type: "Syntax Error" },
//                 { pattern: /(?:^|\n)(\s*)\S.*[^\s:]\s*$/m, message: "Incorrect indentation", type: "Syntax Error" }
//             ],
//             runtime: [
//                 { pattern: /import\s+[a-zA-Z_][a-zA-Z0-9_]*\s*$/m, message: "Potential import error - module not found", type: "Runtime Error" }
//             ]
//         },
//         javascript: {
//             syntax: [
//                 { pattern: /const\s+|let\s+|var\s+/g, message: "Variable declaration without initialization", type: "Syntax Error" }
//             ],
//             runtime: [
//                 { pattern: /JSON\.parse\s*\([^)]*\)/g, message: "Potential JSON parsing error", type: "Runtime Error" }
//             ]
//         },
//         java: {
//             syntax: [
//                 { pattern: /public\s+class\s+[^{]*$/m, message: "Missing opening brace for class", type: "Syntax Error" },
//                 { pattern: /System\.out\.println\s*\([^)]*$/m, message: "Missing closing parenthesis for print statement", type: "Syntax Error" }
//             ]
//         },
//         c: {
//             syntax: [
//                 { pattern: /#include\s+<[^>]+$/m, message: "Incomplete include statement", type: "Syntax Error" },
//                 { pattern: /printf\s*\([^)]*$/m, message: "Missing closing parenthesis for printf", type: "Syntax Error" }
//             ]
//         },
//         cpp: {
//             syntax: [
//                 { pattern: /using\s+namespace\s+[^;]*$/m, message: "Missing semicolon after namespace declaration", type: "Syntax Error" },
//                 { pattern: /std::cout\s*<<[^;]*$/m, message: "Missing semicolon after cout statement", type: "Syntax Error" }
//             ]
//         }
//     };

//     analyzeBtn.addEventListener('click', function() {
//         const code = codeInput.value.trim();
//         const language = languageSelect.value;
        
//         if (!code) {
//             showResult('Please paste some code to analyze.', 'error');
//             return;
//         }

//         analyzeBtn.disabled = true;
//         analyzeBtn.textContent = 'Analyzing...';
//         resultsContent.innerHTML = '<div class="loading-message"><i class="fas fa-spinner fa-spin"></i> Analyzing your code...</div>';

//         // Simulate analysis delay (replace with actual API call if needed)
//         setTimeout(() => {
//             const results = analyzeCode(code, language);
//             displayResults(results, language);
//             analyzeBtn.disabled = false;
//             analyzeBtn.textContent = 'Analyze Code';
//         }, 1500);
//     });

//     function analyzeCode(code, language) {
//         const errors = [];
//         const allPatterns = { ...errorPatterns.common, ...(errorPatterns[language] || {}) };

//         // Check for each error type
//         for (const errorType in allPatterns) {
//             allPatterns[errorType].forEach(patternObj => {
//                 // Skip if this pattern is for specific languages and current language doesn't match
//                 if (patternObj.languages && !patternObj.languages.includes(language)) {
//                     return;
//                 }

//                 const regex = new RegExp(patternObj.pattern.source, patternObj.pattern.flags || 'g');
//                 let match;
//                 while ((match = regex.exec(code)) !== null) {
//                     // Get line number
//                     const lines = code.substring(0, match.index).split('\n');
//                     const lineNumber = lines.length;
//                     const lineContent = lines[lines.length - 1] + code.substring(match.index).split('\n')[0];
                    
//                     errors.push({
//                         type: patternObj.type,
//                         message: patternObj.message,
//                         line: lineNumber,
//                         code: lineContent.trim(),
//                         severity: getSeverity(patternObj.type)
//                     });
//                 }
//             });
//         }

//         // Additional checks for specific languages
//         if (language === 'python') {
//             checkPythonIndentation(code, errors);
//         }

//         return errors.length > 0 ? errors : null;
//     }

//     function checkPythonIndentation(code, errors) {
//         const lines = code.split('\n');
//         let indentStack = [0];
//         let inMultilineString = false;
//         let currentQuote = null;

//         lines.forEach((line, index) => {
//             // Skip empty lines
//             if (line.trim() === '') return;

//             // Handle multiline strings
//             if (inMultilineString) {
//                 if (line.includes(currentQuote)) {
//                     inMultilineString = false;
//                     currentQuote = null;
//                 }
//                 return;
//             } else {
//                 const singleQuoteCount = (line.match(/'/g) || []).length;
//                 const doubleQuoteCount = (line.match(/"/g) || []).length;
                
//                 if (singleQuoteCount % 2 !== 0 || doubleQuoteCount % 2 !== 0) {
//                     inMultilineString = true;
//                     currentQuote = singleQuoteCount % 2 !== 0 ? "'" : '"';
//                     return;
//                 }
//             }

//             const trimmedLine = line.trim();
//             const currentIndent = line.search(/\S/);

//             // Skip comments and docstrings
//             if (trimmedLine.startsWith('#') || 
//                 trimmedLine.startsWith('"""') || 
//                 trimmedLine.startsWith("'''")) {
//                 return;
//             }

//             // Check for dedent
//             if (currentIndent < indentStack[indentStack.length - 1]) {
//                 while (indentStack.length > 0 && currentIndent < indentStack[indentStack.length - 1]) {
//                     indentStack.pop();
//                 }
                
//                 if (currentIndent !== indentStack[indentStack.length - 1]) {
//                     errors.push({
//                         type: "Syntax Error",
//                         message: "Inconsistent indentation",
//                         line: index + 1,
//                         code: line,
//                         severity: "high"
//                     });
//                 }
//             }
//             // Check for new block
//             else if (trimmedLine.endsWith(':')) {
//                 const nextIndent = currentIndent + 4; // Python standard is 4 spaces
//                 indentStack.push(nextIndent);
//             }
//             // Check current indentation
//             else if (currentIndent !== indentStack[indentStack.length - 1]) {
//                 errors.push({
//                     type: "Syntax Error",
//                     message: "Incorrect indentation",
//                     line: index + 1,
//                     code: line,
//                     severity: "high"
//                 });
//             }
//         });
//     }

//     function getSeverity(errorType) {
//         switch(errorType) {
//             case 'Security Error': return 'critical';
//             case 'Runtime Error': return 'high';
//             case 'Syntax Error': return 'medium';
//             default: return 'low';
//         }
//     }

//     function displayResults(errors, language) {
//         if (!errors) {
//             resultsContent.innerHTML = `
//                 <div class="success-message">
//                     <i class="fas fa-check-circle"></i> No errors detected in your ${language} code!
//                 </div>
//             `;
//             return;
//         }

//         let html = `
//             <div class="error-summary">
//                 <p><i class="fas fa-exclamation-triangle"></i> Found ${errors.length} ${errors.length === 1 ? 'issue' : 'issues'} in your ${language} code:</p>
//             </div>
//             <div class="error-list">
//         `;

//         // Group errors by type
//         const groupedErrors = {};
//         errors.forEach(error => {
//             if (!groupedErrors[error.type]) {
//                 groupedErrors[error.type] = [];
//             }
//             groupedErrors[error.type].push(error);
//         });

//         // Display errors by type
//         for (const errorType in groupedErrors) {
//             html += `
//                 <div class="error-type-header">
//                     <h4>${errorType} (${groupedErrors[errorType].length})</h4>
//                 </div>
//             `;

//             groupedErrors[errorType].forEach(error => {
//                 html += `
//                     <div class="error-item severity-${error.severity}">
//                         <div class="error-message">
//                             <strong>${error.message}</strong>
//                         </div>
//                         <div class="error-line">
//                             Line ${error.line}: <code>${error.code.substring(0, 50)}${error.code.length > 50 ? '...' : ''}</code>
//                         </div>
//                     </div>
//                 `;
//             });
//         }

//         html += `</div>`;
//         resultsContent.innerHTML = html;
//         resultBox.style.display = 'block';
//     }

//     function showResult(message, type) {
//         const className = type === 'error' ? 'error-message' : 'success-message';
//         resultsContent.innerHTML = `<div class="${className}">${message}</div>`;
//         resultBox.style.display = 'block';
//     }

//     // Initialize with hidden result box
//     resultBox.style.display = 'none';
// });
// async function analyzeCodeWithAI(code, language) {
//     try {
//         const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCCDccD8vaOHv3QAaEIMNoZKN9umTK_83Y`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 contents: [{
//                     parts: [{
//                         text: `Analyze this ${language} code for errors and suggest improvements:\n\n${code}`
//                     }]
//                 }]
//             })
//         });

//         const data = await response.json();
//         return processAIResponse(data);
//     } catch (error) {
//         console.error('API Error:', error);
//         return null;
//     }
// }

// function processAIResponse(response) {
//     // Process the AI response and format it for display
//     // This will depend on the structure of the API response
// }
// code_analyzer.js
document.addEventListener('DOMContentLoaded', function() {
    const analyzeBtn = document.getElementById('analyze-btn');
    const codeInput = document.getElementById('code-input');
    const languageSelect = document.getElementById('language-select');
    const resultsContent = document.getElementById('resultsContent');

    analyzeBtn.addEventListener('click', function() {
        const code = codeInput.value.trim();
        const language = languageSelect.value;
        
        if (!code) {
            showResult('Please paste some code to analyze', 'error');
            return;
        }

        analyzeBtn.disabled = true;
        analyzeBtn.textContent = 'Analyzing...';
        resultsContent.innerHTML = '<div class="loading-message"><i class="fas fa-spinner fa-spin"></i> Analyzing your code...</div>';

        setTimeout(() => {
            const errors = analyzeForRealErrors(code, language);
            displayErrorResults(errors, language);
            analyzeBtn.disabled = false;
            analyzeBtn.textContent = 'Analyze Code';
        }, 1500);
    });

    function analyzeForRealErrors(code, language) {
        const errors = [];
        const lines = code.split('\n');

        // Check for common syntax errors
        checkMismatchedBraces(code, errors);
        checkMissingSemicolons(code, language, errors);
        checkUndefinedVariables(code, language, errors);
        
        // Language-specific checks
        if (language === 'python') {
            checkPythonIndentation(code, errors);
            checkPythonSyntax(code, errors);
        } else if (language === 'javascript') {
            checkJavascriptIssues(code, errors);
        } else if (language === 'java') {
            checkJavaSyntax(code, errors);
        }

        return errors;
    }

    function checkMismatchedBraces(code, errors) {
        const stack = [];
        const lines = code.split('\n');
        
        lines.forEach((line, index) => {
            for (const char of line) {
                if (char === '{' || char === '[' || char === '(') {
                    stack.push({ char, line: index + 1 });
                } else if (char === '}' || char === ']' || char === ')') {
                    if (stack.length === 0) {
                        errors.push({
                            type: 'Syntax Error',
                            message: `Mismatched ${char} - no opening bracket`,
                            line: index + 1,
                            code: line.trim()
                        });
                    } else {
                        const last = stack.pop();
                        if (
                            (char === '}' && last.char !== '{') ||
                            (char === ']' && last.char !== '[') ||
                            (char === ')' && last.char !== '(')
                        ) {
                            errors.push({
                                type: 'Syntax Error',
                                message: `Mismatched brackets ${last.char} and ${char}`,
                                line: last.line,
                                code: lines[last.line - 1].trim()
                            });
                        }
                    }
                }
            }
        });

        // Check for unclosed brackets
        stack.forEach(unclosed => {
            errors.push({
                type: 'Syntax Error',
                message: `Unclosed ${unclosed.char} bracket`,
                line: unclosed.line,
                code: lines[unclosed.line - 1].trim()
            });
        });
    }

    function checkMissingSemicolons(code, language, errors) {
        if (!['javascript', 'java', 'c', 'cpp', 'csharp', 'php'].includes(language)) return;
        
        const lines = code.split('\n');
        lines.forEach((line, index) => {
            const trimmed = line.trim();
            if (trimmed && 
                !trimmed.endsWith(';') && 
                !trimmed.endsWith('{') && 
                !trimmed.endsWith('}') &&
                !trimmed.startsWith('//') &&
                !trimmed.startsWith('/*') &&
                !trimmed.startsWith('*') &&
                !trimmed.startsWith('#') &&
                !trimmed.match(/^[a-zA-Z_][a-zA-Z0-9_]*\s*\(/) && // Function calls
                !trimmed.match(/^(if|else|for|while|switch|try|catch|finally)\b/) && // Control structures
                !trimmed.match(/^(\/\/|\/\*)/) // Comments
            ) {
                errors.push({
                    type: 'Syntax Error',
                    message: 'Missing semicolon at end of statement',
                    line: index + 1,
                    code: trimmed
                });
            }
        });
    }

    function displayErrorResults(errors, language) {
        if (errors.length === 0) {
            resultsContent.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i> No errors found in your ${language} code!
                </div>
            `;
            return;
        }

        let html = `
            <div class="error-summary">
                <h4><i class="fas fa-exclamation-triangle"></i> Found ${errors.length} ${errors.length === 1 ? 'error' : 'errors'} in your ${language} code:</h4>
            </div>
            <div class="error-list">
        `;

        errors.forEach(error => {
            html += `
                <div class="error-item">
                    <div class="error-header">
                        <span class="error-type">${error.type}</span>
                        <span class="error-line">Line ${error.line}</span>
                    </div>
                    <div class="error-message">${error.message}</div>
                    <div class="error-code">${error.code || ''}</div>
                </div>
            `;
        });

        html += `</div>`;
        resultsContent.innerHTML = html;
    }

    function showResult(message, type) {
        const className = type === 'error' ? 'error-message' : 'success-message';
        resultsContent.innerHTML = `<div class="${className}">${message}</div>`;
    }
});