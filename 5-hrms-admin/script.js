const navbarBtn = document.querySelector('#navbarToggler');
const sidebar = document.querySelector("#sidebar");
const overlay = document.querySelector('.overlay');
const root = document.querySelector(':root');
const navBtns = document.querySelectorAll(".nav-btn");
const sidebarDesc = document.querySelectorAll('.sidebar-desc'); // those elements that should be hidden in collapsed sidebar
const brandLogo = document.querySelector('#brandLogo');
const subMenus = document.querySelectorAll('.sub-menu');
const dropdowns = document.querySelectorAll('.dropdown');
const subDropdowns = document.querySelectorAll(".sub-dropdown");
const main = document.querySelector("#main"); 
const departments = Array.from(document.querySelectorAll('#employeesDepartmentTable tr'));
const designations = Array.from(document.querySelectorAll("#employeesDesignationTable tr"));
const submenuItems = sidebar.querySelectorAll('.sub-menu li');

// header navigations
const headerNavDropdowns = document.querySelectorAll('.nav-dropdown');
// const navUserProfile = document.querySelector('#navUserProfile');
// const navUserLink = navUserProfile.querySelector('.nav-link');
// const navCountriesList = document.querySelector('#navCountriesList');
// const navCountriesLink = navCountriesList.querySelector('.nav-link');
// const navMisc = document.querySelector('#navMisc');
// const navMiscLink = navMisc.querySelector('.nav-link');
// const navUserMenu = navUserProfile.querySelector('ul');


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

navbarBtn.addEventListener('click', () => {
        // sidebar.classList.toggle('collapsed');
        rootComputed = getComputedStyle(root);
        if (window.innerWidth > 768) {
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
                sidebar.classList.remove('collapsed');
                brandLogo.src = './images/signin_logo.webp';
            }        
        }
        else { 
            
            sidebar.classList.toggle('collapsed-sm');
            overlay.classList.toggle('visible');
            overlay.addEventListener('click', () => {
                sidebar.classList.add('collapsed-sm');
                overlay.classList.remove('visible');
            });
        }
});

dropdowns.forEach(dropdown => {
    // console.log(dropdown);
    dropdown.querySelector('.nav-btn').addEventListener('click', () => {
        subDropdowns.forEach(subDropdown => subDropdown.classList.remove('show'));
        if (dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
            main.style.minHeight = `${sidebar.offsetHeight}px`;
        }
        else {
            dropdowns.forEach(dropdown => dropdown.classList.remove('show'));
            // subDropdowns.forEach(subDropdown => subDropdown.classList.remove('show'));
            dropdown.classList.add('show');
            main.style.minHeight = `${sidebar.offsetHeight}px`;
            // console.log(sidebar.offsetHeight);
        }
    });
});
subDropdowns.forEach(subDropdown => {
    subDropdown.addEventListener('click', () => {
        if (subDropdown.classList.contains('show')) {
            // console.log(subDropdowns, subDropdown.classList.contains('show'))
            subDropdown.classList.remove('show');
            main.style.minHeight = `${sidebar.offsetHeight}px`;
        }
        else {
            subDropdowns.forEach(dropdown => subDropdown.classList.remove('show'));
            subDropdown.classList.add('show');
            main.style.minHeight = `${sidebar.offsetHeight}px`;
            // console.log(sidebar.offsetHeight);
        }
    });
});

const designationArray = Array.from(designations).map(designation => {
    return {'backgroundColor' : designation.querySelector('.color-box').style.backgroundColor, 'name' : designation.querySelector('.designation-name').innerText, 'data' : Number(designation.querySelector('.designation-employees-number').innerText)};
});
const departmentsArray = Array.from(departments).map(department => {
    return {'backgroundColor' : department.querySelector('.color-box').style.backgroundColor, 'name' : department.querySelector('.department-name').innerText, 'data' : Number(department.querySelector('.department-employees-number').innerText)};
});


new Chart('designationChart', {
    type: 'pie',
    data: {
        labels: designationArray.map(designation => designation.name),
        datasets: [{
            backgroundColor : designationArray.map(designation => designation.backgroundColor),
            data: designationArray.map(designation => designation.data)
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'bottom',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2);
                    }
                }
            }
        }
    }
})
new Chart('departmentChart', {
    type: 'doughnut',
    data: {
        labels: departmentsArray.map(department => department.name),
        datasets: [{
            backgroundColor : departmentsArray.map(department => department.backgroundColor),
            data: departmentsArray.map(department => department.data)
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'bottom',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2);
                    }
                }
            }
        }
    }
})


// const openMenu = (navItem) => {
//     Array.from(headerNavDropdowns).forEach(navDropdown => {
//         // console.log(headerNavItems.id == navItem.id,typeof headerNavItem.id, typeof navItem.id);
//         if(!navDropdown.id == navItem.id) navDropdown.classList.remove('active')});
//     navItem.classList.toggle('active');
// }

// navUserLink.addEventListener('click', () => { openMenu(navUserProfile)});
// navCountriesLink.addEventListener('click', () => { openMenu(navCountriesList)});
// navMiscLink.addEventListener('click', () => {openMenu(navMisc)});
Array.from(headerNavDropdowns).forEach(headerNavDropdown => {
    headerNavDropdown.querySelector('.nav-link').addEventListener('click', () => {
        Array.from(headerNavDropdowns).forEach(navDropdown => {
            // console.log(headerNavDropdown == navDropdown)
            if (navDropdown != headerNavDropdown) navDropdown.classList.remove('active')});
        headerNavDropdown.classList.toggle('active');
        overlay.classList.toggle('visible');
        if (overlay.classList.contains('visible')) {
            overlay.style.backgroundColor = 'transparent';
            overlay.addEventListener('click', () => {
                overlay.style.backgroundColor = '';
                overlay.classList.remove('visible');
                headerNavDropdown.classList.remove('active');
            }, {once: true});
        }
    });
});
