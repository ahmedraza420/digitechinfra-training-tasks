const navbarBtn = document.querySelector('#navbarToggler');
const sidebar = document.querySelector("#sidebar");
// const sidenav = document.querySelector('.sidenav');
const overlay = document.querySelector('.overlay');
const dropdowns = document.querySelectorAll('.nav-dropdown');

navbarBtn.addEventListener('click', () => {
    if (window.innerWidth > 768) {
        sidebar.classList.toggle('collapsed');
    }
    else {
        sidebar.classList.toggle('collapsed-sm');
        overlay.classList.toggle('visible');
    }
});

overlay.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed-sm');
});

// let isOverDropBtn = false, isOverDropdown = false;

dropdowns.forEach(li => {
    li.addEventListener('mouseover', () => {
        // console.log('hovered');
        // console.log(sidebar.classList.contains('collapsed-sm'));
        if ((window.innerWidth < 768 && sidebar.classList.contains('collapsed-sm')) || sidebar.classList.contains('collapsed')) {
            li.children[0].classList.remove('collapsed');
            li.children[0].setAttribute('aria-expanded', 'true');
            li.children[1].classList.add('show');
        }
    });
    li.addEventListener('mouseout', () => {
        if (window.innerWidth < 768 && sidebar.classList.contains('collapsed-sm') || sidebar.classList.contains('collapsed')) {
            li.children[0].classList.add('collapsed');
            li.children[0].setAttribute('aria-expanded', 'false');
            li.children[1].classList.remove('show');
        }
    });

});