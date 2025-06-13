const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');

if (navToggle && navList) {
navToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
    navList.classList.remove('active');
    }
});
}