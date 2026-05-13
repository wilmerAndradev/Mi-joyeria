const fs = require('fs');
const path = require('path');

const directory = './src';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(directory);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replace emails and URLs first
  content = content.replace(/lumierejoyeria\.cl/g, 'aleafar.cl');
  content = content.replace(/lumiere-joyeria\.cl/g, 'aleafar.cl');
  content = content.replace(/lumiere\.cl/g, 'aleafar.cl');
  
  // Storage keys and file names etc
  content = content.replace(/lumiere-/g, 'aleafar-');
  content = content.replace(/lumiere_/g, 'aleafar_');
  
  // Replace LUMIÈRE uppercase
  content = content.replace(/LUMIÈRE/g, 'ALEAFAR');
  // Replace Lumière Title case
  content = content.replace(/Lumière/g, 'Aleafar');
  // Replace Lumiere without accent
  content = content.replace(/Lumiere/g, 'Aleafar');
  // Replace lumiere lowercase
  content = content.replace(/lumiere/g, 'aleafar');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated:', file);
  }
});

console.log('Done.');
