const fs = require('fs');
const path = require('path');

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
        results.push(file);
      }
    }
  });
  return results;
};

const files = walk('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;

  // Specific overrides first
  newContent = newContent.replace(/text-charcoal/g, 'text-ivory');
  
  // Base names
  newContent = newContent.replace(/creme/g, 'black');
  newContent = newContent.replace(/Creme/g, 'Black');
  newContent = newContent.replace(/CREME/g, 'BLACK');
  
  newContent = newContent.replace(/burgundy/g, 'gold');
  newContent = newContent.replace(/Burgundy/g, 'Gold');
  newContent = newContent.replace(/BURGUNDY/g, 'GOLD');
  
  newContent = newContent.replace(/sand/g, 'charcoal');
  newContent = newContent.replace(/Sand/g, 'Charcoal');
  newContent = newContent.replace(/SAND/g, 'CHARCOAL');
  
  newContent = newContent.replace(/dusty-pink/g, 'ivory');
  newContent = newContent.replace(/dustyPink/g, 'ivory');

  // Hex codes
  newContent = newContent.replace(/#EEE4DA/gi, '#0A0A0A');
  newContent = newContent.replace(/#4D0E13/gi, '#C9A84C');
  newContent = newContent.replace(/#DBC4AC/gi, '#3D3D3D');
  newContent = newContent.replace(/#CBA49F/gi, '#FAFAF8');

  // Also replace bg-[#FAFAF8] which was hardcoded
  newContent = newContent.replace(/#FAFAF8/g, '#0A0A0A'); // In checkout background

  if (newContent !== content) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Updated', file);
  }
});
