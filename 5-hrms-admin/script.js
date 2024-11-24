const navbarBtn = document.querySelector('#navbarToggler');
const sidebar = document.querySelector("#sidebar");
const overlay = document.querySelector('.overlay');
const root = document.querySelector(':root');
const navBtns = document.querySelectorAll(".nav-btn");
const sidebarDesc = document.querySelectorAll('.sidebar-desc'); // those elements that should be hidden in collapsed sidebar
const brandLogo = document.querySelector('#brandLogo');
const subMenus = document.querySelectorAll('.sub-menu');
const dropdowns = document.querySelectorAll('.dropdown');
const main = document.querySelector("#main"); 
// const rootStyles = getComputedStyle(root);

const submenuItems = sidebar.querySelectorAll('.sub-menu li');

submenuItems.forEach(item => {
    item.addEventListener('mouseover', () => {
        item.querySelector('.fa-circle').classList.remove('fa-regular');
        item.querySelector('.fa-circle').classList.add('fa-solid');
    });
    item.addEventListener('mouseout', () => {
        item.querySelector('.fa-circle').classList.remove('fa-solid');
        item.querySelector('.fa-circle').classList.add('fa-regular');
    });
});


// console.log(getComputedStyle(root).getPropertyValue('--bg-custom'));
// console.log(sidebarDesc);


navbarBtn.addEventListener('click', () => {
        // sidebar.classList.toggle('collapsed');
        rootComputed = getComputedStyle(root);
        const widthCol = rootComputed.getPropertyValue('--sidebar-collapsed-width');
        const widthExp = rootComputed.getPropertyValue('--sidebar-expanded-width');
        const width = rootComputed.getPropertyValue('--sidebar-width');
        if (width == widthExp) {
            root.style.setProperty('--sidebar-width', widthCol);
            brandLogo.src = './images/favicon.ico';
            sidebar.classList.add('collapsed');
        }
        else {
            root.style.setProperty('--sidebar-width', widthExp);
            brandLogo.src = './images/signin_logo.webp';
            sidebar.classList.remove('collapsed');
        }        
});


dropdowns.forEach(dropdown => {
    dropdown.querySelector('.nav-btn').addEventListener('click', () => {
        if (dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
            main.style.minHeight = `${sidebar.offsetHeight}px`;
        }
        else {
            dropdowns.forEach(dropdown => dropdown.classList.remove('show'));
            dropdown.classList.add('show');
            main.style.minHeight = `${sidebar.offsetHeight}px`;
            // console.log(sidebar.offsetHeight);
        }
    });
});