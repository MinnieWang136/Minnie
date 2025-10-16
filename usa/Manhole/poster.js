const poster = document.querySelector('.poster');

function createFallingText() {
  const text = document.createElement('div');
  text.classList.add('title');
  text.textContent = 'UNDERFLOW';
  poster.appendChild(text);

  text.addEventListener('animationend', () => {
    text.remove();
  });
}

setInterval(createFallingText, 1500);
