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


function formatValue(value) {
return value === null || value === undefined ? '#' : value;
}

//Выводим количество карточек
document.getElementById('unknown-count').textContent = formatValue(data.unknown);
document.getElementById('known-count').textContent = formatValue(data.known);

//Расчёт процента
function calculateProgress(unknown, known) {
const total = (unknown || 0) + (known || 0);
if (!total) return 0;
return Math.round((known / total) * 100);
}

// Обновление прогресс-бара
const percent = calculateProgress(data.unknown, data.known);
const progressFill = document.querySelector('.progress-fill');
const progressPercent = document.querySelector('.progress-percent');

if (progressFill && progressPercent) {
progressFill.style.width = `${percent}%`;
progressPercent.textContent = `${percent}%`;
}


function autoResizeTextarea(textarea) {
textarea.style.height = "auto"; // Сброс
const maxHeight = 150;

if (textarea.scrollHeight <= maxHeight) {
    textarea.style.height = textarea.scrollHeight + "px";
} else {
    textarea.style.height = maxHeight + "px";
    textarea.style.overflowY = "scroll";
}
}

// Подстраиваем все textarea при загрузке
document.querySelectorAll('.autoresize').forEach(autoResizeTextarea);

// И при каждом вводе текста
document.querySelectorAll('.autoresize').forEach(textarea => {
textarea.addEventListener('input', () => autoResizeTextarea(textarea));
});
