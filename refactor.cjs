const fs = require('fs');
const path = require('path');

const scratchDir = 'C:\\Users\\Hii\\.gemini\\antigravity\\brain\\a3583e47-70aa-41a3-8d32-fb74dcb57b4e\\scratch\\Happy-Birthday\\src';
const targetDir = 'C:\\Users\\Hii\\Documents\\wisher\\Wisher\\src\\templates\\birthday\\galactic-3d-heart';
const componentsDir = path.join(targetDir, 'components');

if (!fs.existsSync(componentsDir)) fs.mkdirSync(componentsDir, { recursive: true });

function processAndCopy(srcPath, destPath, isPage) {
    if (!fs.existsSync(srcPath)) {
        console.log("Not found:", srcPath);
        return;
    }
    let content = fs.readFileSync(srcPath, 'utf-8');

    // 1. Remove CSS imports
    content = content.replace(/import\s+['"].*\.css['"];?\n/g, '');

    // 2. Replace react-router Link
    content = content.replace(/import\s*{\s*Link\s*}\s*from\s*['"]react-router-dom['"];?/g, '');
    content = content.replace(/import\s*{\s*Link\s*}\s*from\s*['"]react-router['"];?/g, '');
    content = content.replace(/<Link\s+to=\{['"][^'"]+['"]\}\s+className=([^>]+)>/g, '<span className=$1 onClick={onNavigate} style={{cursor: "pointer"}}>');
    content = content.replace(/<\/Link>/g, '</span>');

    // 3. Add props and replace names
    if (destPath.endsWith('Home.tsx')) {
        content = content.replace(/const Home = \(\) => {/, 'const Home = ({ targetName, senderName, onNavigate }: any) => {');
        content = content.replace(/Dear Trisha/g, 'Dear {targetName}');
        content = content.replace(/Click Here Trisha/g, 'Click Here {targetName}');
        content = content.replace(/From Rexon/g, 'From {senderName}');
    } else if (destPath.endsWith('LoveLetter.tsx')) {
        content = content.replace(/const LoveLetter = \(\) => {/, 'const LoveLetter = ({ targetName, senderName, onNavigate }: any) => {');
        content = content.replace(/Dear Trisha/g, 'Dear {targetName}');
        content = content.replace(/From Rexon/g, 'From {senderName}');
    } else if (destPath.endsWith('OpeningAnimation.tsx')) {
        // Fix for OpeningAnimation props
        if (!content.includes('animateOut')) {
             content = content.replace(/const OpeningAnimation = \(\) => {/, 'const OpeningAnimation = ({ animateOut, targetName }: any) => {');
             content = content.replace(/Ahona/g, '{targetName}'); // Replace Ahona with targetName (if it's there)
        } else {
             content = content.replace(/const OpeningAnimation = \({animateOut}\) => {/, 'const OpeningAnimation = ({ animateOut, targetName }: any) => {');
             content = content.replace(/const OpeningAnimation = \({ animateOut }\) => {/, 'const OpeningAnimation = ({ animateOut, targetName }: any) => {');
        }
        content = content.replace(/Ahona/g, '{targetName}');
    } else {
        // generic
        content = content.replace(/const ([A-Za-z0-9_]+) = \(\) => {/, 'const $1 = (props: any) => {');
    }

    fs.writeFileSync(destPath, content);
    console.log("Processed:", destPath);
}

processAndCopy(path.join(scratchDir, 'components', 'OpeningAnimation.jsx'), path.join(componentsDir, 'OpeningAnimation.tsx'), false);
processAndCopy(path.join(scratchDir, 'components', 'BookCanvas.jsx'), path.join(componentsDir, 'BookCanvas.tsx'), false);
processAndCopy(path.join(scratchDir, 'components', 'HeartTransition.jsx'), path.join(componentsDir, 'HeartTransition.tsx'), false);
processAndCopy(path.join(scratchDir, 'components', 'SmallLetter.jsx'), path.join(componentsDir, 'SmallLetter.tsx'), false);
processAndCopy(path.join(scratchDir, 'pages', 'Home.jsx'), path.join(componentsDir, 'Home.tsx'), true);
processAndCopy(path.join(scratchDir, 'pages', 'LoveLetter.jsx'), path.join(componentsDir, 'LoveLetter.tsx'), true);
