
import React from 'react';
import { ProjectFiles } from './types';

export const INITIAL_FILES: ProjectFiles = {
  html: `<!DOCTYPE html>
<html>
<head>
    <title>WebDev Studio Demo</title>
</head>
<body>
    <div class="card">
        <h1>✨ Hello, World!</h1>
        <p>This is a live preview of your code.</p>
        <p>Try changing the HTML, CSS, or JS tabs!</p>
        <button id="mainBtn" class="btn">Click Me!</button>
        
        <div class="stats">
            <div class="stat-item">
                <span id="counter">0</span>
                <label>Clicks</label>
            </div>
        </div>
    </div>
</body>
</html>`,
  css: `body {
    font-family: 'Segoe UI', system-ui, sans-serif;
    background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 90vh;
    margin: 0;
    color: white;
}

.card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 3rem;
    border-radius: 24px;
    text-align: center;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    max-width: 400px;
}

h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    background: linear-gradient(to right, #60a5fa, #a855f7);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

p {
    color: #94a3b8;
    line-height: 1.6;
}

.btn {
    margin-top: 2rem;
    background: linear-gradient(to right, #3b82f6, #8b5cf6);
    color: white;
    border: none;
    padding: 12px 32px;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.5);
}

.btn:active {
    transform: translateY(0);
}

.stats {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
}

.stat-item {
    display: flex;
    flex-direction: column;
}

#counter {
    font-size: 2rem;
    font-weight: bold;
    color: #60a5fa;
}

label {
    font-size: 0.8rem;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.1em;
}`,
  javascript: `// Interactive Logic
let count = 0;
const btn = document.getElementById('mainBtn');
const counter = document.getElementById('counter');

if (btn && counter) {
    btn.addEventListener('click', () => {
        count++;
        counter.textContent = count;
        
        // Add a small animation effect
        counter.style.transform = 'scale(1.2)';
        setTimeout(() => {
            counter.style.transform = 'scale(1)';
        }, 100);
        
        console.log(\`Clicked \${count} times!\`);
    });
}

console.log('Script initialized successfully!');`
};
