// script.js
// Full drawing app: pen, eraser, shape (rect/circle/line/triangle), stamp (circle/triangle/star/heart)
// Spotify shuffle (4 tracks) and canvas scale slider that preserves content (scales image).

// ---------- Spotify tracks ----------
const musicList = [
  "https://open.spotify.com/embed/track/1TQ2UYCN7nhfj3cfcFC76V?utm_source=generator",
  "https://open.spotify.com/embed/track/2X7LHd75d3EtQgsAiJi1S8?utm_source=generator",
  "https://open.spotify.com/embed/track/6AZauFwqbjjBDryjVsNZ9f?utm_source=generator",
  "https://open.spotify.com/embed/track/7biZOldbger5MgwcgE6CaA?utm_source=generator"
];

const randomMusicBtn = document.getElementById('random-music-btn');
const randomSpotifyEmbed = document.getElementById('random-spotify-embed');
if (randomMusicBtn && randomSpotifyEmbed) {
  randomMusicBtn.addEventListener('click', () => {
    const i = Math.floor(Math.random() * musicList.length);
    randomSpotifyEmbed.src = musicList[i];
  });
}

// ---------- Canvas init ----------
const container = document.getElementById('music-draw-canvas-container');
const canvas = document.getElementById('music-draw-canvas');
const ctx = canvas.getContext('2d');

// default backing size (logical drawing resolution)
let backingWidth = 1200;
let backingHeight = 800;
let displayScale = 1; // scale factor applied to display
canvas.width = backingWidth;
canvas.height = backingHeight;

// Ensure canvas fills available area while maintaining aspect ratio
function fitCanvasToContainer() {
  const cw = container.clientWidth - 24; // padding compensation
  const ch = container.clientHeight - 24;
  const aspect = backingWidth / backingHeight;
  let w = cw, h = Math.round(w / aspect);
  if (h > ch) { h = ch; w = Math.round(h * aspect); }
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
}
window.addEventListener('resize', fitCanvasToContainer);
fitCanvasToContainer();

// ---------- State ----------
let isDrawing = false;
let currentTool = 'pen'; // pen | eraser | shape | stamp
let shapeType = document.getElementById('shape-select')?.value || 'circle';
let shapeFill = document.getElementById('shape-fill')?.checked ?? true;
let shapeStrokeWidth = +document.getElementById('shape-stroke')?.value || 2;
let penSize = +document.getElementById('pen-size')?.value || 5;
let penOpacity = +document.getElementById('pen-opacity')?.value || 100;
let penColor = document.getElementById('pen-color')?.value || '#0066FF';
let eraserSize = +document.getElementById('eraser-size')?.value || 20;
let stampType = document.getElementById('stamp-select')?.value || 'circle';
let stampSize = +document.getElementById('stamp-size')?.value || 30;

// shape drawing helpers
let startX = 0, startY = 0;
let savedImageData = null;

// ---------- UI references and listeners ----------
const toolBtns = Array.from(document.querySelectorAll('.tool-btn'));
const penSettings = document.getElementById('pen-settings');
const eraserSettings = document.getElementById('eraser-settings');
const shapeSettings = document.getElementById('shape-settings');
const stampSettings = document.getElementById('stamp-settings');

toolBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    toolBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const t = btn.getAttribute('data-tool');
    if (t === 'clear') {
      clearCanvas();
      // set back to pen
      currentTool = 'pen';
      toolBtns[0]?.classList.add('active');
      showSettings('pen');
      return;
    }
    currentTool = t || 'pen';
    showSettings(currentTool);
  });
});

function showSettings(tool) {
  if (penSettings) penSettings.style.display = (tool === 'pen') ? 'flex' : 'none';
  if (eraserSettings) eraserSettings.style.display = (tool === 'eraser') ? 'flex' : 'none';
  if (shapeSettings) shapeSettings.style.display = (tool === 'shape') ? 'flex' : 'none';
  if (stampSettings) stampSettings.style.display = (tool === 'stamp') ? 'flex' : 'none';
}
showSettings('pen');

// pen controls
const penSizeSlider = document.getElementById('pen-size');
const penSizeValue = document.getElementById('pen-size-value');
const penOpacitySlider = document.getElementById('pen-opacity');
const penOpacityValue = document.getElementById('pen-opacity-value');
const penColorPicker = document.getElementById('pen-color');

if (penSizeSlider) {
  penSizeSlider.addEventListener('input', () => {
    penSize = +penSizeSlider.value;
    penSizeValue.textContent = penSize;
  });
}
if (penOpacitySlider) {
  penOpacitySlider.addEventListener('input', () => {
    penOpacity = +penOpacitySlider.value;
    penOpacityValue.textContent = penOpacity;
  });
}
if (penColorPicker) {
  penColorPicker.addEventListener('input', () => penColor = penColorPicker.value);
}

// eraser
const eraserSizeSlider = document.getElementById('eraser-size');
const eraserSizeValue = document.getElementById('eraser-size-value');
if (eraserSizeSlider) {
  eraserSizeSlider.addEventListener('input', () => {
    eraserSize = +eraserSizeSlider.value;
    eraserSizeValue.textContent = eraserSize;
  });
}

// shape
const shapeSelect = document.getElementById('shape-select');
const shapeFillCheckbox = document.getElementById('shape-fill');
const shapeStrokeSlider = document.getElementById('shape-stroke');
if (shapeSelect) shapeSelect.addEventListener('change', () => shapeType = shapeSelect.value);
if (shapeFillCheckbox) shapeFillCheckbox.addEventListener('change', () => shapeFill = shapeFillCheckbox.checked);
if (shapeStrokeSlider) shapeStrokeSlider.addEventListener('input', () => shapeStrokeWidth = +shapeStrokeSlider.value);

// stamp
const stampSelect = document.getElementById('stamp-select');
const stampSizeSlider = document.getElementById('stamp-size');
const stampSizeValue = document.getElementById('stamp-size-value');
if (stampSelect) stampSelect.addEventListener('change', () => stampType = stampSelect.value);
if (stampSizeSlider) {
  stampSizeSlider.addEventListener('input', () => {
    stampSize = +stampSizeSlider.value;
    stampSizeValue.textContent = stampSize;
  });
}

// canvas scale slider (percentage)
const scaleSlider = document.getElementById('canvas-scale');
const scaleLabel = document.getElementById('canvas-scale-value');
if (scaleSlider) {
  scaleSlider.addEventListener('input', () => {
    const pct = +scaleSlider.value;
    scaleLabel.textContent = pct + '%';
    applyCanvasScale(pct / 100);
  });
}

// ---------- coordinate helper ----------
function getPointerPos(e) {
  const rect = canvas.getBoundingClientRect();
  if (e.touches && e.touches[0]) {
    return { x: (e.touches[0].clientX - rect.left) * (backingWidth / rect.width),
             y: (e.touches[0].clientY - rect.top) * (backingHeight / rect.height) };
  } else {
    return { x: (e.clientX - rect.left) * (backingWidth / rect.width),
             y: (e.clientY - rect.top) * (backingHeight / rect.height) };
  }
}

// ---------- drawing primitives on backing canvas ----------
function drawLineOnBacking(x1, y1, x2, y2, size, color, opacity) {
  ctx.save();
  ctx.globalAlpha = opacity / 100;
  ctx.strokeStyle = color;
  ctx.lineWidth = size;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.restore();
}

function eraseAt(x, y, size) {
  ctx.clearRect(x - size/2, y - size/2, size, size);
}

function drawShapeOnBacking(type, x1, y1, x2, y2, options = {}) {
  ctx.save();
  ctx.lineWidth = options.strokeWidth || 2;
  ctx.strokeStyle = options.strokeColor || penColor;
  ctx.fillStyle = options.fillColor || penColor;
  ctx.globalAlpha = options.opacity ?? (penOpacity / 100);

  if (type === 'rectangle') {
    const w = x2 - x1, h = y2 - y1;
    if (options.fill) ctx.fillRect(x1, y1, w, h);
    else ctx.strokeRect(x1, y1, w, h);
  } else if (type === 'line') {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  } else if (type === 'circle') {
    const r = Math.hypot(x2 - x1, y2 - y1);
    ctx.beginPath();
    ctx.arc(x1, y1, r, 0, Math.PI * 2);
    if (options.fill) ctx.fill();
    else ctx.stroke();
  } else if (type === 'triangle') {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    // point 3:
    const px = x1 - (x2 - x1);
    const py = y2;
    ctx.lineTo(px, py);
    ctx.closePath();
    if (options.fill) ctx.fill();
    else ctx.stroke();
  } else if (type === 'star') {
    // simple 5-point star around (x1,y1) with radius x2 as size
    const r = Math.max(6, Math.abs(x2 - x1));
    const cx = x1, cy = y1;
    ctx.beginPath();
    for (let i=0;i<5;i++){
      const a = (i*2*Math.PI)/5 - Math.PI/2;
      const xi = cx + Math.cos(a) * r;
      const yi = cy + Math.sin(a) * r;
      ctx.lineTo(xi, yi);
      const a2 = a + Math.PI/5;
      const xi2 = cx + Math.cos(a2) * (r*0.5);
      const yi2 = cy + Math.sin(a2) * (r*0.5);
      ctx.lineTo(xi2, yi2);
    }
    ctx.closePath();
    ctx.fill();
  } else if (type === 'heart') {
    // heart centered at x1,y1, size ~|x2-x1|
    const s = Math.max(6, Math.abs(x2 - x1));
    const topY = y1 - s*0.3;
    ctx.beginPath();
    ctx.moveTo(x1, topY + s*0.2);
    ctx.bezierCurveTo(x1 + s*0.5, topY - s*0.6, x1 + s*1.2, topY + s*0.6, x1, topY + s);
    ctx.bezierCurveTo(x1 - s*1.2, topY + s*0.6, x1 - s*0.5, topY - s*0.6, x1, topY + s*0.2);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

// ---------- stamping helper ----------
function stampAt(x, y, type, size) {
  drawShapeOnBacking(type, x, y, x + size, y + size, { fill: true, fillColor: penColor, opacity: penOpacity/100 });
}

// ---------- shape preview: use an in-memory copy (ImageData) ----------
function startShape(x, y) {
  startX = x; startY = y;
  savedImageData = ctx.getImageData(0, 0, backingWidth, backingHeight);
}

function updateShapePreview(x2, y2) {
  if (!savedImageData) return;
  // restore then draw preview
  ctx.putImageData(savedImageData, 0, 0);
  drawShapeOnBacking(shapeType, startX, startY, x2, y2, { fill: shapeFill, strokeWidth: shapeStrokeWidth, strokeColor: penColor, fillColor: penColor, opacity: penOpacity/100 });
}

function finalizeShape(x2, y2) {
  if (!savedImageData) return;
  // restore then draw final
  ctx.putImageData(savedImageData, 0, 0);
  drawShapeOnBacking(shapeType, startX, startY, x2, y2, { fill: shapeFill, strokeWidth: shapeStrokeWidth, strokeColor: penColor, fillColor: penColor, opacity: penOpacity/100 });
  savedImageData = null;
}

// ---------- pointer handlers ----------
let lastPos = null;

function onDown(e) {
  e.preventDefault();
  const p = getPointerPos(e);
  isDrawing = true;
  lastPos = p;

  if (currentTool === 'shape') {
    startShape(p.x, p.y);
    return;
  }

  if (currentTool === 'pen') {
    // start path: nothing special because we draw short segments between mouse moves
    lastPos = p;
    return;
  }

  if (currentTool === 'eraser') {
    eraseAt(p.x, p.y, eraserSize);
  }

  if (currentTool === 'stamp') {
    stampAt(p.x, p.y, stampType, stampSize);
  }
}

function onMove(e) {
  if (!isDrawing) return;
  e.preventDefault();
  const p = getPointerPos(e);

  if (currentTool === 'shape') {
    updateShapePreview(p.x, p.y);
    return;
  }

  if (currentTool === 'pen') {
    if (lastPos) {
      drawLineOnBacking(lastPos.x, lastPos.y, p.x, p.y, penSize, penColor, penOpacity);
      lastPos = p;
    }
    return;
  }

  if (currentTool === 'eraser') {
    eraseAt(p.x, p.y, eraserSize);
    return;
  }
}

function onUp(e) {
  if (!isDrawing) return;
  e.preventDefault();
  const p = getPointerPos(e);

  if (currentTool === 'shape') {
    finalizeShape(p.x, p.y);
    isDrawing = false;
    lastPos = null;
    return;
  }

  isDrawing = false;
  lastPos = null;
}

// attach mouse/touch events to container for better touch handling
canvas.addEventListener('mousedown', onDown);
canvas.addEventListener('mousemove', onMove);
window.addEventListener('mouseup', onUp);

canvas.addEventListener('touchstart', onDown, { passive: false });
canvas.addEventListener('touchmove', onMove, { passive: false });
window.addEventListener('touchend', onUp);

// ---------- clear canvas ----------
function clearCanvas() {
  ctx.clearRect(0, 0, backingWidth, backingHeight);
  // keep display fit
  fitCanvasToContainer();
}

// ---------- apply canvas scale (preserve content by scaling the image) ----------
function applyCanvasScale(factor) {
  // capture current image
  const tmp = document.createElement('canvas');
  tmp.width = backingWidth;
  tmp.height = backingHeight;
  const tctx = tmp.getContext('2d');
  tctx.drawImage(canvas, 0, 0, tmp.width, tmp.height);

  // compute new backing resolution
  const newW = Math.round(backingWidth * factor);
  const newH = Math.round(backingHeight * factor);

  // create a new canvas to hold scaled result at new resolution
  const scaled = document.createElement('canvas');
  scaled.width = newW;
  scaled.height = newH;
  const sctx = scaled.getContext('2d');

  // draw scaled image (scale up or down)
  sctx.drawImage(tmp, 0, 0, tmp.width, tmp.height, 0, 0, newW, newH);

  // replace backing size and context content
  backingWidth = newW;
  backingHeight = newH;
  // set canvas logical size
  canvas.width = backingWidth;
  canvas.height = backingHeight;

  // draw scaled content back to canvas
  ctx.clearRect(0, 0, backingWidth, backingHeight);
  ctx.drawImage(scaled, 0, 0);

  // adjust display size to fit container keeping aspect ratio
  fitCanvasToContainer();
}

// ---------- keyboard shortcuts ----------
window.addEventListener('keydown', (e) => {
  if (e.key === 'p') { currentTool = 'pen'; toolBtns.forEach(b=>b.classList.remove('active')); document.querySelector('.tool-btn[data-tool="pen"]')?.classList.add('active'); showSettings('pen'); }
  if (e.key === 'e') { currentTool = 'eraser'; toolBtns.forEach(b=>b.classList.remove('active')); document.querySelector('.tool-btn[data-tool="eraser"]')?.classList.add('active'); showSettings('eraser'); }
  if (e.key === 's') { currentTool = 'shape'; toolBtns.forEach(b=>b.classList.remove('active')); document.querySelector('.tool-btn[data-tool="shape"]')?.classList.add('active'); showSettings('shape'); }
  if (e.key === 't') { currentTool = 'stamp'; toolBtns.forEach(b=>b.classList.remove('active')); document.querySelector('.tool-btn[data-tool="stamp"]')?.classList.add('active'); showSettings('stamp'); }
  if (e.key === 'c') clearCanvas();
});

// initial UI values
document.getElementById('pen-size-value').textContent = penSize;
document.getElementById('pen-opacity-value').textContent = penOpacity;
document.getElementById('eraser-size-value').textContent = eraserSize;
document.getElementById('stamp-size-value').textContent = stampSize;
document.getElementById('canvas-scale-value').textContent = (scaleSlider?.value ?? 100) + '%';
