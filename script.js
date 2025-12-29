const text = [
  "Web Developer",
  "Problem Solver",
  "Creative Thinker"
];

let index = 0;
let char = 0;
const typing = document.querySelector(".typing");

function typeEffect() {
  if (char < text[index].length) {
    typing.textContent += text[index].charAt(char);
    char++;
    setTimeout(typeEffect, 100);
  } else {
    setTimeout(eraseEffect, 2000);
  }
}

function eraseEffect() {
  if (char > 0) {
    typing.textContent = text[index].substring(0, char - 1);
    char--;
    setTimeout(eraseEffect, 50);
  } else {
    index = (index + 1) % text.length;
    setTimeout(typeEffect, 500);
  }
}

typeEffect();
