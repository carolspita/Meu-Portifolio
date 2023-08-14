const carrossel = document.querySelector(".conteudo-quaternario-container");
const arrowsBtns = document.querySelectorAll(".conteudo-quaternario-container i");
const firstCardWidth = carrossel.querySelector(".conteudo-quaternario-container-card").offsetWidth;

let isDragging = false, startX, startScrollLeft;

// Add event listeners for the arrow buttons to the scroll the carrossel left and rigth   
arrowsBtns.forEach(btn =>{
    btn.addEventListener("click", () => {
        carrossel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carrossel.classList.add("dragging");
    //Records the initial cursor and scroll position of the carrossel
    startX = e.pageX;
    startScrollLeft = carrossel.scrollLeft;
}

const dragging = (e) =>{
    if(!isDragging) return; // if isDragging is false return from here
    //Updates the scroll position of the carrossel based on the cursor movement
    carrossel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carrossel.classList.remove("dragging");
}

carrossel.addEventListener("mousedown", dragStart);
carrossel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);