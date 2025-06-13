src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"

const helpPage = "./help/.htm"; 

src="help.js"

function updateMainMargin() {
const header = document.querySelector('.header');
const main = document.querySelector('.main');
main.style.marginTop = `${header.offsetHeight}px`;
}

window.onload = updateMainMargin;
window.addEventListener('resize', updateMainMargin);