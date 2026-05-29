const fs=require('fs');
const path='C:/Users/Hii/.gemini/antigravity/brain/a3583e47-70aa-41a3-8d32-fb74dcb57b4e/scratch/Happy-Birthday/src';
const files=['index.css', 'App.css', 'BookCanvas.css', 'Opening.css', 'HeartTransition.css', 'LoveLetter.css', 'SmallLetter.css'];
let css = '';
for(let f of files) {
    css += '\n/* ' + f + ' */\n' + fs.readFileSync(path + '/' + f, 'utf-8');
}
css = css.replace(/body\s*\{/g, '.fake-body {');
css = css.replace(/:root\s*\{/g, '.fake-root {');

// Move @import statements to the top
const imports = [];
css = css.replace(/@import[^;]+;/g, (match) => {
    imports.push(match);
    return '';
});

// For Tailwind CSS we will just add @import "tailwindcss" at the very top.
let finalCss = '@import "tailwindcss";\n' + imports.join('\n') + '\n.romantic-anime-template {\n' + css + '\n}\n';

fs.writeFileSync('c:/Users/Hii/Documents/wisher/Wisher/src/templates/birthday/romantic-anime-birthday/styles.scss', finalCss);
