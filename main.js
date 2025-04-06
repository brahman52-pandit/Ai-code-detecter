 // Mobile Menu Toggle
 const menuBtn = document.getElementById('menuBtn');
 const closeSidebar = document.getElementById('closeSidebar');
 const sidebar = document.getElementById('sidebar');
 
 menuBtn.addEventListener('click', () => {
     sidebar.classList.add('active');
 });
 
 closeSidebar.addEventListener('click', () => {
     sidebar.classList.remove('active');
 });
 
 // Slideshow Functionality
 const slides = document.getElementById('slides');
 const prevBtn = document.getElementById('prevBtn');
 const nextBtn = document.getElementById('nextBtn');
 let currentSlide = 0;
 const slideCount = document.querySelectorAll('.slide').length;
 
 function updateSlide() {
     slides.style.transform = `translateX(-${currentSlide * 100}%)`;
 }
 
 nextBtn.addEventListener('click', () => {
     currentSlide = (currentSlide + 1) % slideCount;
     updateSlide();
 });
 
 prevBtn.addEventListener('click', () => {
     currentSlide = (currentSlide - 1 + slideCount) % slideCount;
     updateSlide();
 });
 
 // Auto-advance slides every 5 seconds
 setInterval(() => {
     currentSlide = (currentSlide + 1) % slideCount;
     updateSlide();
 }, 5000);
 
 // FAQ Toggle
 const faqItems = document.querySelectorAll('.faq-item');
 
 faqItems.forEach(item => {
     const question = item.querySelector('.faq-question');
     
     question.addEventListener('click', () => {
         item.classList.toggle('active');
         
         // Close other open FAQs
         faqItems.forEach(otherItem => {
             if (otherItem !== item && otherItem.classList.contains('active')) {
                 otherItem.classList.remove('active');
             }
         });
     });
 });
 
 // Code Analyzer Demo Functionality
//  const analyzeBtn = document.getElementById('analyze-btn');
//  const resultsContent = document.getElementById('resultsContent');
 
//  analyzeBtn.addEventListener('click', () => {
//      const codeInput = document.getElementById('code-input').value;
     
//      if (!codeInput.trim()) {
//          resultsContent.innerHTML = '<p class="text-danger">Please paste some code to analyze.</p>';
//          return;
//      }
     
//      // Simulate analysis
//      analyzeBtn.disabled = true;
//      analyzeBtn.textContent = 'Analyzing...';
     
//      setTimeout(() => {

         // Demo results
      // Code Analyzer Functionality
// const analyzeBtn = document.getElementById('analyze-btn');
// const resultsContent = document.getElementById('resultsContent');
// const codeInput = document.getElementById('code-input');
// const languageSelect = document.getElementById('language-select');

// analyzeBtn.addEventListener('click', () => {
//     const code = codeInput.value.trim();
//     const language = languageSelect.value;
    
//     if (!code) {
//         showResult('Please paste some code to analyze', 'error');
//         return;
//     }

//     analyzeBtn.disabled = true;
//     analyzeBtn.textContent = 'Analyzing...';
//     resultsContent.innerHTML = '<div class="loading-message"><i class="fas fa-spinner fa-spin"></i> Analyzing your code...</div>';

//     setTimeout(() => {
//         const errors = findRealErrors(code, language);
//         displayErrorResults(errors, language);
//         analyzeBtn.disabled = false;
//         analyzeBtn.textContent = 'Analyze Code';
//     }, 1500);
// });

// function findRealErrors(code, language) {
//     const errors = [];
//     const lines = code.split('\n');

//     // Check for mismatched brackets/parentheses/braces
//     checkMismatchedBraces(code, errors);
    
//     // Check for missing semicolons in applicable languages
//     if (['javascript', 'java', 'c', 'cpp', 'csharp', 'php'].includes(language)) {
//         checkMissingSemicolons(code, errors);
//     }
    
//     // Language-specific checks
//     if (language === 'python') {
//         checkPythonIndentation(code, errors);
//     }

//     return errors;
// }

// function checkMismatchedBraces(code, errors) {
//     const stack = [];
//     const lines = code.split('\n');
    
//     lines.forEach((line, index) => {
//         for (const char of line) {
//             if (char === '{' || char === '[' || char === '(') {
//                 stack.push({ char, line: index + 1 });
//             } else if (char === '}' || char === ']' || char === ')') {
//                 if (stack.length === 0) {
//                     errors.push({
//                         type: 'Syntax Error',
//                         message: `Mismatched ${char} - no opening bracket`,
//                         line: index + 1,
//                         code: line.trim()
//                     });
//                 } else {
//                     const last = stack.pop();
//                     if (
//                         (char === '}' && last.char !== '{') ||
//                         (char === ']' && last.char !== '[') ||
//                         (char === ')' && last.char !== '(')
//                     ) {
//                         errors.push({
//                             type: 'Syntax Error',
//                             message: `Mismatched brackets ${last.char} and ${char}`,
//                             line: last.line,
//                             code: lines[last.line - 1].trim()
//                         });
//                     }
//                 }
//             }
//         }
//     });
    

    // Check for unclosed brackets
//     stack.forEach(unclosed => {
//         errors.push({
//             type: 'Syntax Error',
//             message: `Unclosed ${unclosed.char} bracket`,
//             line: unclosed.line,
//             code: lines[unclosed.line - 1].trim()
//         });
//     });
// }

// function displayErrorResults(errors, language) {
//     if (errors.length === 0) {
//         resultsContent.innerHTML = `
//             <div class="success-message">
//                 <i class="fas fa-check-circle"></i> No errors found in your ${language} code!
//             </div>
//         `;
//         return;
//     }

//     let html = `
//         <div class="error-summary">
//             <h4><i class="fas fa-exclamation-triangle"></i> Found ${errors.length} ${errors.length === 1 ? 'error' : 'errors'} in your ${language} code:</h4>
//         </div>
//         <div class="error-list">
//     `;

//     errors.forEach(error => {
//         html += `
//             <div class="error-item">
//                 <div class="error-header">
//                     <span class="error-type">${error.type}</span>
//                     <span class="error-line">Line ${error.line}</span>
//                 </div>
//                 <div class="error-message">${error.message}</div>
//                 <div class="error-code">${error.code || ''}</div>
//             </div>
//         `;
//     });

//     html += `</div>`;
//     resultsContent.innerHTML = html;
// }

// function showResult(message, type) {
//     const className = type === 'error' ? 'error-message' : 'success-message';
//     resultsContent.innerHTML = `<div class="${className}">${message}</div>`;
// }
         
//          analyzeBtn.disabled = false;
//          analyzeBtn.textContent = 'Analyze Code';
//      }, 2000);
// )};  
// main.js - Updated Code Analyzer
document.addEventListener('DOMContentLoaded', function() {
    // Previous menu/slideshow/FAQ code remains the same...

    // Code Analyzer Functionality
    const analyzeBtn = document.getElementById('analyze-btn');
    const resultsContent = document.getElementById('resultsContent');
    const codeInput = document.getElementById('code-input');
    const languageSelect = document.getElementById('language-select');

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

        // Process the code analysis
        setTimeout(() => {
            const errors = analyzePythonCode(code); // Focus on Python for now
            displayErrorResults(errors, language);
            analyzeBtn.disabled = false;
            analyzeBtn.textContent = 'Analyze Code';
        }, 1000);
    });

    function analyzePythonCode(code) {
        const errors = [];
        const lines = code.split('\n');
        let indentStack = [0]; // Track expected indentation levels
        let inFunction = false;
        let inLoop = false;

        // Check for syntax errors
        lines.forEach((line, index) => {
            const lineNumber = index + 1;
            const trimmed = line.trim();
            const currentIndent = line.search(/\S/); // Find first non-whitespace char

            // Skip empty lines and comments
            if (!trimmed || trimmed.startsWith('#')) {
                return;
            }

            // Check for function definition without colon
            if (trimmed.startsWith('def ') && !trimmed.endsWith(':')) {
                errors.push({
                    type: 'Syntax Error',
                    message: 'Missing colon at end of function definition',
                    line: lineNumber,
                    code: trimmed
                });
                inFunction = true;
            }

            // Check for inconsistent indentation
            if (currentIndent !== -1) { // Skip empty lines
                const expectedIndent = inFunction ? 4 : 0; // Basic indentation check
                if (currentIndent < indentStack[indentStack.length - 1]) {
                    // Dedent - pop from stack until we find matching level
                    while (currentIndent < indentStack[indentStack.length - 1]) {
                        indentStack.pop();
                    }
                    if (currentIndent !== indentStack[indentStack.length - 1]) {
                        errors.push({
                            type: 'Indentation Error',
                            message: 'Inconsistent indentation',
                            line: lineNumber,
                            code: line
                        });
                    }
                } else if (trimmed.endsWith(':') && !trimmed.startsWith('#')) {
                    // New block - push expected indent
                    indentStack.push(currentIndent + 4);
                } else if (currentIndent > indentStack[indentStack.length - 1]) {
                    errors.push({
                        type: 'Indentation Error',
                        message: 'Unexpected indentation',
                        line: lineNumber,
                        code: line
                    });
                }
            }

            // Check for obvious syntax errors
            if (trimmed.match(/^[a-zA-Z_][a-zA-Z0-9_]*\s*\([^)]*$/)) {
                errors.push({
                    type: 'Syntax Error',
                    message: 'Missing closing parenthesis',
                    line: lineNumber,
                    code: trimmed
                });
            }
        });

        return errors;
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
                <h4><i class="fas fa-exclamation-triangle"></i> Found ${errors.length} ${errors.length === 1 ? 'error' : 'errors'}:</h4>
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
                    <div class="error-code">${error.code}</div>
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