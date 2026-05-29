const sass = require('sass');
const fs = require('fs');
let css = fs.readFileSync('c:/Users/Hii/Documents/wisher/Wisher/src/templates/birthday/romantic-anime-birthday/styles.scss', 'utf-8');
css = css.replace(/@import\s+['"]tailwindcss['"];/g, '');
const result = sass.compileString(css);
console.log(result.css.split('\n').filter(l => l.includes('--envelope')).join('\n'));
