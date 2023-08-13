const carrossel = document.querySelector(".conteudo-quaternario-container");

let isDragging = false, startX, startScrollLeft;

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