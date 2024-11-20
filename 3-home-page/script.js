const carousel = document.querySelector(".custom-carousel");
const carouselBtns = document.querySelectorAll('.test-carousel-btn');
const cardWidth = document.querySelector('.card-custom').offsetWidth;
const carouselCards = [...carousel.children]; // cloning cards for infinite scroll


let isDragging = false, startX, currentScrollPos, isHovering = false;
let cardsInView = Math.round(carousel.offsetWidth / cardWidth); // number of cards visible


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
document.addEventListener('mouseup', () => { isDragging = false });

carouselBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        cardsInView = Math.round(carousel.offsetWidth / cardWidth);
        carousel.scrollLeft += btn.id == 'right' ? cardWidth * cardsInView : -cardWidth * cardsInView;
    });
});


//infinite scroll

// if you open the page on a screen larger than md breakpoint, 
// making the size smaller will produce buggy result, 
// and vice versa if opened in screen smaller than md.
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
    else if (carousel.scrollLeft === carousel.scrollWidth - carousel.offsetWidth) {
        // console.log(carousel.scrollLeft, carousel.scrollWidth - carousel.offsetWidth);
        carousel.classList.add('no-smooth');
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove('no-smooth');
    }
});

//autoplay
carousel.addEventListener('mouseenter', () => isHovering = true);
carousel.addEventListener('mouseleave', () => isHovering = false);
carouselBtns.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        isHovering = true;
    })
    btn.addEventListener('mouseleave', () => {
        isHovering = false;
    })
});


setInterval(() => {
    if (!isHovering) carousel.scrollLeft += cardsInView * cardWidth
}, 3000)