
document.getElementById("moduleForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("moduleName").value.trim();
    
    const progress = 0

    if (!name) return;

    const container = document.querySelector(".module-list");

    const moduleHTML = `
    <div class="module-card d-flex justify-content-between align-items-center flex-wrap">
        <div class="module-title mb-2 mb-md-0">
            <a class="module-name-link" href="module.html">${name}</a>
        </div>
        <div class="module-info d-flex align-items-center mb-2 mb-md-0 me-md-3">
            <span class="me-3">Карточек: 0</span>
            <div class="progress me-2" style="width: 100px;">
                <div class="progress-bar" role="progressbar" style="width: ${progress}%;" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <span>${progress}%</span>
        </div>
        <div class="dropdown module-actions">
            <button class="btn btn-menu" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="#"><i class="fas fa-share-alt me-2"></i> Поделиться</a></li>
                <li><a class="dropdown-item" href="#"><i class="fas fa-edit me-2"></i> Редактировать</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item text-danger" href="#"><i class="fas fa-trash-alt me-2"></i> Удалить</a></li>
            </ul>
        </div>
    </div>
    `;

    container.insertAdjacentHTML("beforeend", moduleHTML);

    // Очистить форму и закрыть модалку
    document.getElementById("moduleForm").reset();
    const modal = bootstrap.Modal.getInstance(document.getElementById('createModuleModal'));
    modal.hide();
});
