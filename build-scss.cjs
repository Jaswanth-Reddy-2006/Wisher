const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src/templates/birthday/romantic-anime-birthday/original');
const outPath = path.join(__dirname, 'src/templates/birthday/romantic-anime-birthday/styles.scss');

const cssFiles = [
    'index.css',
    'App.css',
    'LoveLetter.css',
    'SmallLetter.css',
    'HeartTransition.css',
    'Opening.css',
    'BookCanvas.css'
];

let finalCss = `@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Inter:ital,opsz,wght@0,14..32,100..900');
@import url('https://fonts.googleapis.com/css2?family=Coiny&family=Titan+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Nerko+One&family=Sriracha&display=swap');

.font-dancingScript { font-family: "Dancing Script", cursive; }
.font-coiny { font-family: "Coiny", system-ui; }
.font-sriracha { font-family: "Sriracha", cursive; }

.romantic-anime-template {
`;

for (const file of cssFiles) {
    let content = fs.readFileSync(path.join(srcDir, file), 'utf-8');
    
    // Remove imports
    content = content.replace(/@import\s+['"].*?['"];/g, '');
    
    // Remove @theme block entirely
    content = content.replace(/@theme\s*\{[^}]*\}/g, '');
    
    // Replace :root
    content = content.replace(/:root\s*\{/g, '&, * {');
    
    // Replace body
    content = content.replace(/body\s*\{/g, '& {');
    
    finalCss += `\n/* ${file} */\n${content}\n`;
}

finalCss += `\n}\n`;

fs.writeFileSync(outPath, finalCss);
console.log('styles.scss rebuilt successfully!');
