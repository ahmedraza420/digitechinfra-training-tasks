const CalendarElement = document.querySelector('#calendar');
const greetinDate = document.querySelector('#dateAnnounce');

const previousBtn = document.querySelector('#previousMonthBtn');
const nextBtn = document.querySelector('#nextMonthBtn');
const currentMonthDisplay = document.querySelector('#currentMonth');
const calendarDayDisplays = CalendarElement.querySelectorAll('.td-head');



const presentDate = new Date();
const presentMonth = presentDate.getMonth();
const presentYear = presentDate.getFullYear();

const monthName = ['January', 'February', 'march', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dayName = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

greetinDate.innerText = `${dayName[presentDate.getDay()]}, ${presentDate.getDate()} ${monthName[presentDate.getMonth()]} ${presentDate.getFullYear()}`

const day = 86400000;

const fillCalendar = (year, month) => {
    const firstDayOfMonth = new Date(year, month, 1) ;
    const lastDayofMonth = new Date(year, month + 1, 0);
    const lastDayPrev = new Date(year, month, 0).getDate();
    const firstDate = firstDayOfMonth.getDate();
    const firstWeekDay = firstDayOfMonth.getDay();
    const lastDate = lastDayofMonth.getDate();
    const lastWeekDay = firstDayOfMonth.getDay();
    let arr = Array.apply(null, Array(42));

    for (let i = 0; i < firstWeekDay; i++) {
        calendarDayDisplays[i].dataset.current = 'false';
        calendarDayDisplays[i].innerText = lastDayPrev - firstWeekDay + 1 + i;
    }
    for (let i = 0; i < lastDate; i++) {
        calendarDayDisplays[i + firstWeekDay].dataset.current = 'true';
        calendarDayDisplays[i + firstWeekDay].innerText = firstDate + i;
    }
    for (let i = 0; i < 42 - (firstWeekDay + lastDate); i++) {
        calendarDayDisplays[firstWeekDay + lastDate + i].dataset.current = 'false';
        calendarDayDisplays[firstWeekDay + lastDate + i].innerText = i + 1;
    }

    currentMonthDisplay.innerText = `${monthName[month]} ${year}`;
}

let currentMonth = presentMonth;
let currentYear = presentYear;

fillCalendar(currentYear, currentMonth);

previousBtn.addEventListener('click', () => {
    if (currentMonth == 0) {
        currentYear--;
        currentMonth = 11;
    }
    else {
        currentMonth--;
    }
    fillCalendar(currentYear, currentMonth);
});

nextBtn.addEventListener('click', () => {
    if (currentMonth == 11) {
        currentYear++;
        currentMonth = 0;
    }
    else {
        currentMonth++;
    }
    fillCalendar(currentYear, currentMonth);
});