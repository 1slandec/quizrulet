document.addEventListener('DOMContentLoaded', function () {

  // --- Инициализация Bootstrap Tooltips (если нужны) ---
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // --- Функция для инициализации логики шагов внутри конкретного модального окна ---
  function initializeModalSteps(modalElement) {
    const steps = modalElement.querySelectorAll('.step');
    const contents = modalElement.querySelectorAll('.step-content');
    const prevBtn = modalElement.querySelector('.btn-back-modal');
    const nextBtn = modalElement.querySelector('.btn-next-modal');

    // Если элементы для шагов не найдены, значит, это модальное окно без шагов, выходим.
    if (steps.length === 0 || !prevBtn || !nextBtn) {
      return;
    }

    let currentStep = 1; // Всегда начинаем с первого шага для данного модального окна

    function showStep(step) {
      // Обновляем активные шаги
      steps.forEach(s => {
        s.classList.toggle('active', parseInt(s.dataset.step) === step);
      });

      // Показываем нужный контент
      contents.forEach(c => {
        c.classList.toggle('active', parseInt(c.dataset.step) === step);
      });

      // Управление кнопками
      prevBtn.disabled = step === 1;
      prevBtn.style.display = step === 1 ? 'none' : 'inline-block'; // Скрываем на первом шаге

      nextBtn.disabled = false; // По умолчанию кнопка "Вперед" не отключена
      nextBtn.textContent = step === steps.length ? 'Готово' : 'Далее';
      nextBtn.classList.toggle('btn-primary', step < steps.length); // Можно менять цвет для "Готово"
      nextBtn.classList.toggle('btn-success', step === steps.length); // Можно менять цвет для "Готово"
    }

    function goToStep(step) {
      if (step < 1 || step > steps.length) return;
      currentStep = step;
      showStep(currentStep);
    }

    // Обработчики кликов по шагам (для переключения по клику на кружок)
    steps.forEach(stepEl => {
      stepEl.addEventListener('click', () => {
        const targetStep = parseInt(stepEl.dataset.step);
        goToStep(targetStep);
      });
    });

    // Кнопка "Назад"
    prevBtn.addEventListener('click', () => {
      if (currentStep > 1) {
        goToStep(currentStep - 1);
      }
    });

    // Кнопка "Вперед"
    nextBtn.addEventListener('click', () => {
      if (currentStep < steps.length) {
        goToStep(currentStep + 1);
      } else {
        const bsModal = bootstrap.Modal.getInstance(modalElement);
        if (bsModal) {
            bsModal.hide();
        }
        // Или отправить форму
        // modalElement.querySelector('form').submit();
      }
    });

    // Инициализация при первом запуске или сбросе
    showStep(currentStep);

    // --- Дополнительная специфичная логика для importModal (если требуется) ---
    // Если у вас есть textarea и select внутри конкретного модального окна,
    // вы можете добавить их логику здесь.
    // Пример для importModal:
    if (modalElement.id === 'importModal') {
      const importTextarea = modalElement.querySelector('.step-content[data-step="1"] textarea');
      const separatorSelect = modalElement.querySelector('.step-content[data-step="2"] #separator_inline');
      const separatorLinesSelect = modalElement.querySelector('.step-content[data-step="2"] #separator_line');
      console.log(separatorSelect);
      console.log(separatorLinesSelect);
      const previewPre = modalElement.querySelector('#preview');

      function updatePreview() {
        const text = importTextarea ? importTextarea.value : '';
        let separator = separatorSelect ? separatorSelect.value : '';
        let separatorLines = separatorLinesSelect ? separatorLinesSelect.value : '';
        console.log(separator);
        console.log(separatorLines);
        
        
        if (text && separator && previewPre) {
          const lines = text.split(separatorLines);
          let previewText = '';
          lines.forEach(line => {
            previewText += line.split(separator).join(' | ') + '\n';
          });
          previewPre.textContent = previewText;
        } else if (previewPre) {
          previewPre.textContent = 'Данные здесь...';
        }
      }

      if (importTextarea) importTextarea.addEventListener('input', updatePreview);
      if (separatorSelect) separatorSelect.addEventListener('input', updatePreview);
      if (separatorLinesSelect) separatorLinesSelect.addEventListener('input', updatePreview);

      // Обновить предпросмотр при переходе на шаг 3 или при открытии модалки (если уже на шаге 3)
      // Это можно привязать к событию showStep, но для простоты примера оставим так.
      // Лучше: обновить предпросмотр, когда `showStep` показывает шаг 3.
      modalElement.addEventListener('shown.bs.modal', function () {
        if (currentStep === 3) {
          updatePreview();
        }
      });
      // Также, можно вызывать updatePreview при каждом изменении шага, если это нужно.
    }
  }

  // --- Инициализация всех модальных окон при загрузке страницы ---
  document.querySelectorAll('.modal').forEach(modalElement => {
    // Каждый раз, когда модальное окно открывается, инициализируем его логику шагов
    // Это гарантирует, что оно всегда начинается с первого шага
    modalElement.addEventListener('show.bs.modal', function () {
      initializeModalSteps(modalElement);
    });
  });

});