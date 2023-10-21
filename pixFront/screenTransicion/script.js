document.addEventListener("DOMContentLoaded", function () {
  let texto = "PIX Transaction!";
  let h1 = document.querySelector(".container h1");

  function displayTextLetterByLetter(index) {
      if (index <= texto.length) {
          h1.innerText = texto.slice(0, index);
          setTimeout(() => displayTextLetterByLetter(index + 1), 100);
      } else {
          h1.innerText = `${texto} ${nome}`;
      }
  }

  displayTextLetterByLetter(0);

  const transactionForm = document.getElementById("transactionForm");

  transactionForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const id = document.getElementById("id").value;
      const transactionType = document.getElementById("transactionType").value;
      const qnt = document.getElementById("qnt").value;

      window.location.href = `../screenMyTransactions/index.html?id=${id}&transactionType=${transactionType}&qnt=${qnt}`;
  });
});