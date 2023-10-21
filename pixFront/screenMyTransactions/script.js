document.addEventListener("DOMContentLoaded", function () {
  let text = "PIX Transaction";
  let h1 = document.querySelector(".container-all h1");

  function displayTextLetterByLetter(index) {
      if (index <= text.length) {
        h1.innerText = text.slice(0, index);
        setTimeout(() => displayTextLetterByLetter(index + 1), 100);
        createTable();
      } else {
        h1.innerText = text;
      }
  }

  displayTextLetterByLetter(0);


});

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const transactionType = urlParams.get("transactionType");
  const qnt = urlParams.get("qnt");

  const h1Element = document.querySelector("header h1");
  h1Element.textContent = `Transaction Details for User ID: ${id}`;


  function createTable(data) {
    const tableContainer = document.querySelector('.table-container');

    const table = document.createElement('table');

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    const idHeader = document.createElement('th');
    idHeader.textContent = 'ID';
    const quantityHeader = document.createElement('th');
    quantityHeader.textContent = 'Quantity';
    const typeHeader = document.createElement('th');
    typeHeader.textContent = 'Type';

    headerRow.appendChild(idHeader);
    headerRow.appendChild(quantityHeader);
    headerRow.appendChild(typeHeader);

    thead.appendChild(headerRow);
    table.appendChild(thead);
    table.classList.add('styled-table')

    const tbody = document.createElement('tbody');

    data.forEach(item => {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = item.id;

        const quantityCell = document.createElement('td');
        quantityCell.textContent = item.quantity;

        const typeCell = document.createElement('td');
        typeCell.textContent = item.type;

        row.appendChild(idCell);
        row.appendChild(quantityCell);
        row.appendChild(typeCell);

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    tableContainer.appendChild(table);
  }

  const data = [  ];

  if (id) {
    data.push({ id: id, quantity: qnt, type: transactionType});
    createTable(data);
    //only works with one try to fix it later
  } else {
    data.push({quantity: "nothing to see here"});
    createTable(data);
  }
    


  const tds = document.querySelectorAll('td');

  tds.forEach(td => {
    td.addEventListener('click', () => {
      const row = td.parentElement;

      if (row.classList.contains('highlighted')) {
        row.classList.remove('highlighted');
      } else {
        row.classList.add('highlighted');
      }
    });
  });




});
