const fs = require('fs');
const path = require('path');

const d = 'src/templates/birthday/galactic-3d-heart';
let cssPath = path.join(d, 'style.css');
let css = fs.readFileSync(cssPath, 'utf-8');

let imports = [];
css = css.replace(/@import\s+url\([^)]+\);/g, match => {
    imports.push(match);
    return '';
});

// Fix image path
css = css.replace(/url\(['"]?\/src\/assets\/([^'"]+)['"]?\)/g, "url('./assets/$1')");

fs.writeFileSync(cssPath, imports.join('\n') + '\n' + css);

// Fix remaining CSS imports
['OpeningAnimation.tsx', 'SmallLetter.tsx', 'BookCanvas.tsx', 'Home.tsx', 'LoveLetter.tsx', 'HeartTransition.tsx'].forEach(f => {
    let p = path.join(d, 'components', f);
    if (fs.existsSync(p)) {
        let c = fs.readFileSync(p, 'utf-8');
        c = c.replace(/import\s+['"].*\.css['"];?/g, '');
        fs.writeFileSync(p, c);
    }
});
