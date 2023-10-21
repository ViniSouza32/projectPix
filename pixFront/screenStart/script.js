document.addEventListener("DOMContentLoaded", function () {
    let text = "Welcome to PIX!";
    let h1 = document.querySelector(".container h1");

    function displayTextLetterByLetter(index) {
        if (index <= text.length) {
            h1.innerText = text.slice(0, index);
            setTimeout(() => displayTextLetterByLetter(index + 1), 100);
        } else {
            h1.innerText = text;
        }
    }

    displayTextLetterByLetter(0);
});