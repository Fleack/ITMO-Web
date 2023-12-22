document.addEventListener('DOMContentLoaded', function () {
    const productForm = document.getElementById('productForm');
    const tableContainer = document.getElementById('tableContainer');

    const savedData = JSON.parse(localStorage.getItem('products')) || [];
    restoreTable(savedData);

    // Инициализация Select2 для поля выбора категории товара
    $('#productCategory').select2();

    productForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const productName = document.getElementById('productName').value.trim();
        const productCategory = $('#productCategory').val(); // Используем Select2 для получения значения

        if (productName !== '') {
            const product = { name: productName, category: productCategory };
            savedData.push(product);
            saveToLocalStorage(savedData);

            productForm.reset();
            restoreTable(savedData);
        } else {
            alert('Введите название товара.');
        }
    });

    function saveToLocalStorage(data) {
        localStorage.setItem('products', JSON.stringify(data));
    }

    function restoreTable(data) {
        tableContainer.innerHTML = '';

        const tableHeader = document.createElement('div');
        tableHeader.classList.add('table-header');
        createTableCell(tableHeader, 'Название товара');
        createTableCell(tableHeader, 'Категория товара');
        createTableCell(tableHeader, 'Удалить');
        tableContainer.appendChild(tableHeader);

        for (const product of data) {
            const tableRow = document.createElement('div');
            tableRow.classList.add('table-row');
            createTableCell(tableRow, product.name);
            createTableCell(tableRow, product.category);
            createDeleteButton(tableRow, product);
            tableContainer.appendChild(tableRow);
        }
    }

    function createTableCell(row, content) {
        const cell = document.createElement('div');
        cell.classList.add('table-cell');
        cell.textContent = content;
        row.appendChild(cell);
    }

    function createDeleteButton(row, product) {
        const deleteButton = document.createElement('div');
        deleteButton.classList.add('table-cell');
        deleteButton.innerHTML = `<button class="delete-button" onclick="deleteProduct(this)">✖</button>`;
        deleteButton.querySelector('button').data = product;
        row.appendChild(deleteButton);
    }

    window.deleteProduct = function(button) {
        const productToDelete = button.parentElement.parentElement;
        const productNameToDelete = productToDelete.children[0].textContent.trim();
        const savedData = JSON.parse(localStorage.getItem('products')) || [];

        const updatedData = savedData.filter(product => product.name !== productNameToDelete);

        localStorage.setItem('products', JSON.stringify(updatedData));
        restoreTable(updatedData);
    };
});
