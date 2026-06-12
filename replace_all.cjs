const fs = require('fs');

function fixFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/typeof translations/g, "typeof window.translations");
  content = content.replace(/translations\[/g, "window.translations[");
  fs.writeFileSync(file, content);
}

fixFile('app.js');
fixFile('index.html');
console.log("Fixed globally");
