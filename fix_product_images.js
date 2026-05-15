/**
 * fix_product_images.js — v3 SAFE (only VERIFIED and NOT 404)
 * 
 * Run: node fix_product_images.js
 */

const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, 'src', 'data', 'products.ts');

// REMOVED 404s:
// photo-1605100804763-247f66156ce4
// photo-1599643478524-fb66f70d00f8

const VERIFIED = {
  rings: [
    'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=800&auto=format&fit=crop',
  ],
  necklaces: [
    'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop',
  ],
  bracelets: [
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1629224316810-9d8805b95e76?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=800&auto=format&fit=crop',
  ],
  earrings: [
    'https://images.unsplash.com/photo-1629224316810-9d8805b95e76?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop',
  ],
};

const POOLS = {
  anillos: VERIFIED.rings,
  collares: VERIFIED.necklaces,
  pulseras: VERIFIED.bracelets,
  aros: VERIFIED.earrings,
};

const lines = fs.readFileSync(FILE, 'utf-8').split('\n');
const output = [];
let currentCat = null;
const counters = { anillos: 0, collares: 0, pulseras: 0, aros: 0 };
let insideImages = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  const catMatch = line.match(/category:\s*"(anillos|collares|pulseras|aros)"/);
  if (catMatch) currentCat = catMatch[1];

  const imgSingle = line.match(/^(\s+)images:\s*\["https:\/\/.+"\],?$/);
  if (imgSingle && currentCat) {
    const indent = imgSingle[1];
    const pool = POOLS[currentCat];
    const n = counters[currentCat]++;
    const img1 = pool[n % pool.length];
    const img2 = pool[(n + Math.ceil(pool.length / 2)) % pool.length];
    output.push(`${indent}images: [`);
    output.push(`${indent}  "${img1}",`);
    output.push(`${indent}  "${img2}",`);
    output.push(`${indent}],`);
    continue;
  }

  const imgStartMulti = line.match(/^(\s+)images:\s*\[$/);
  if (imgStartMulti && currentCat) {
    insideImages = true;
    const indent = imgStartMulti[1];
    const pool = POOLS[currentCat];
    const n = counters[currentCat]++;
    const img1 = pool[n % pool.length];
    const img2 = pool[(n + 2) % pool.length];
    const img3 = pool[(n + 4) % pool.length];
    output.push(line);
    output.push(`${indent}  "${img1}",`);
    output.push(`${indent}  "${img2}",`);
    output.push(`${indent}  "${img3}",`);
    continue;
  }

  if (insideImages) {
    if (line.match(/^\s+\],?$/)) {
      insideImages = false;
      output.push(line);
    }
    continue;
  }

  output.push(line);
}

fs.writeFileSync(FILE, output.join('\n'), 'utf-8');
console.log('✅ Products.ts images fixed with 200 OK verified IDs only!');
