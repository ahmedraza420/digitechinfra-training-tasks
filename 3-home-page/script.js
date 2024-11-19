const carousel = document.querySelector(".custom-carousel");
const carouselBtns = document.querySelectorAll('.test-carousel-btn');
const cardWidth = document.querySelector('.card-custom').offsetWidth;
const carouselCards = [...carousel.children]; // cloning cards for infinite scroll


let isDragging = false, startX, currentScrollPos, isHovering = false;


function dragging(e) {
    if (!isDragging) return;
    carousel.scrollLeft = currentScrollPos - (e.pageX - startX);
}

document.addEventListener('mousemove', dragging);
carousel.addEventListener('mousedown', (e) => {
    isDragging = true
    startX = e.pageX;    
    currentScrollPos = carousel.scrollLeft;
});
document.addEventListener('mouseup', () => {isDragging = false});

carouselBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        carousel.scrollLeft += btn.id == 'left' ? -cardWidth * 2 : cardWidth * 2;
    });
});


//infinite scroll

let cardsInView = Math.round(carousel.offsetWidth / cardWidth); // number of cards visible

carouselCards.slice(-cardsInView).reverse().forEach(card => {
    carousel.insertAdjacentHTML('afterbegin', card.outerHTML);
});

carouselCards.slice(0, cardsInView).forEach(card => {
    carousel.insertAdjacentHTML('beforeend', card.outerHTML);
});

carousel.addEventListener('scroll', () => {
    if (carousel.scrollLeft === 0) {
        carousel.classList.add('no-smooth');
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove('no-smooth');
    }
    else if(carousel.scrollLeft === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add('no-smooth');
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove('no-smooth');
      }
});

//autoplay
carousel.addEventListener('mouseenter', () => isHovering = true);
carousel.addEventListener('mouseleave', () => isHovering = false);

setInterval(() => {
    if(!isHovering) carousel.scrollLeft += cardsInView * cardWidth
}, 3000)