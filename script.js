var button = document.getElementById("read_button");

button.addEventListener('click', function() {
    var card = document.querySelector(".conteudo-quaternario-container-card");
    card.classList.toggle("active");
});