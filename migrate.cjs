const fs = require('fs');
const path = require('path');

const scratchDir = 'C:\\Users\\Hii\\.gemini\\antigravity\\brain\\a3583e47-70aa-41a3-8d32-fb74dcb57b4e\\scratch\\Happy-Birthday\\src';
const targetDir = 'C:\\Users\\Hii\\Documents\\wisher\\Wisher\\src\\templates\\birthday\\galactic-3d-heart';

// 1. Create target directories
const targetAssets = path.join(targetDir, 'assets');
const targetComponents = path.join(targetDir, 'components');
const targetPages = path.join(targetDir, 'pages');

if (!fs.existsSync(targetAssets)) fs.mkdirSync(targetAssets, { recursive: true });
if (!fs.existsSync(targetComponents)) fs.mkdirSync(targetComponents, { recursive: true });
if (!fs.existsSync(targetPages)) fs.mkdirSync(targetPages, { recursive: true });

// 2. Copy Assets
const scratchAssets = path.join(scratchDir, 'assets');
if (fs.existsSync(scratchAssets)) {
    const assets = fs.readdirSync(scratchAssets);
    for (const asset of assets) {
        fs.copyFileSync(path.join(scratchAssets, asset), path.join(targetAssets, asset));
    }
}

// 3. Process and Copy CSS
// We will read all CSS files and scope them to avoid breaking global Wisher CSS.
const cssFiles = [
    'App.css', 'index.css', 'LoveLetter.css', 'BookCanvas.css', 'Opening.css', 'SmallLetter.css'
];
let combinedCss = '';

const processCss = (cssContent) => {
    return cssContent
        .replace(/body\s*{/g, '.galactic-3d-heart-container {')
        .replace(/\*\s*{/g, '.galactic-3d-heart-container * {')
        .replace(/:root\s*{/g, '.galactic-3d-heart-container {'); // Scope CSS variables
};

for (const cssFile of cssFiles) {
    let filePath = path.join(scratchDir, cssFile);
    if (!fs.existsSync(filePath)) filePath = path.join(scratchDir, 'components', cssFile);
    if (!fs.existsSync(filePath)) filePath = path.join(scratchDir, 'pages', cssFile);
    
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        combinedCss += `\n/* === ${cssFile} === */\n` + processCss(content);
    }
}

fs.writeFileSync(path.join(targetDir, 'style.css'), combinedCss);

console.log("Assets and CSS migrated and scoped.");
