import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
// import '../src/styles/scoped-preflight.css'
// import '../src/main.css'
import '../dist/index.css'

const domNode = document.getElementById('epic-root');
const root = createRoot(domNode!);

root.render(<App />)