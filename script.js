const conteudoProjeto = document.querySelector(".conteudo-projeto")
const carrossel = document.querySelector(".carrossel");
const arrowBtns = document.querySelectorAll(".conteudo-projeto i");
const firstCardWidth = carrossel.querySelector(".card").offsetWidth; 
const carrosselChildrens = [...carrossel.children];

let isDragging = false, startX, startScrollLeft, timeoutId;

//Get the number of cards that can fit in the carrossel at once
let cardPerView = Math.round(carrossel.offsetWidth / firstCardWidth);

//insert copies of the last few cards to beginning of carrossel for infinite scrolling
carrosselChildrens.slice(-cardPerView).reverse().forEach (card => {
    carrossel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

//insert copies of the first few cards to end of carrossel for infinite scrolling
carrosselChildrens.slice(0, cardPerView).forEach (card => {
    carrossel.insertAdjacentHTML("beforeend", card.outerHTML);
});

//Add event listeners for the arrow buttons to scroll the carrossel left and rigth
arrowBtns.forEach(btn =>{
    btn.addEventListener("click", () =>{
        carrossel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth
    });
});

const dragStart = (e) =>{
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

const dragStop = () =>{
    isDragging = false;
    carrossel.classList.remove("dragging");
}

const autoPlay = () =>{
    if(window.innerWidth < 800) return; //return if window is smaller tham 800
    //Autoplay the carrossel after every 2500 ms
    timeoutId = setTimeout(() => carrossel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();


const infiniteScroll = () => {
    if(carrossel.scrollLeft === 0) {
        carrossel.classList.add("no-transition");
        carrossel.scrollLeft = carrossel.scrollWidth - (2 * carrossel.offsetWidth);
        carrossel.classList.remove("no-transition");
    } else if(Math.ceil(carrossel.scrollLeft) === carrossel.scrollWidth - carrossel.offsetWidth){
        carrossel.classList.add("no-transition");
        carrossel.scrollLeft = carrossel.offsetWidth;
        carrossel.classList.remove("no-transition");
    } 
    // Clear existing timeout e start autoplay if mouseis not hovering over carrossel.
    clearTimeout(timeoutId);
    if(!conteudoProjeto.matches(":hover")) autoPlay();

}

carrossel.addEventListener("mousedown", dragStart);
carrossel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carrossel.addEventListener("scroll", infiniteScroll);
conteudoProjeto.addEventListener("mouseenter", () =>clearTimeout(timeoutId));
carrossel.addEventListener("scroll", infiniteScroll);