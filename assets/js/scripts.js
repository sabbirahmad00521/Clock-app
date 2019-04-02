//DIGITAL CLOCK
//==============

//TIME PART
var timeToday = document.getElementById('timeToday');
var dateToday = document.getElementById('dateToday');

function showTime() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var dayNight = 'AM';

    if (hours == 0) {
        hours = 12;
    };

    if (hours > 12) {
        hours = hours - 12;
        dayNight = 'PM';
    };

    if (hours < 10) {
        hours = "0" + hours;
    };

    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    var times = `${hours} : ${minutes} : ${seconds}  ${dayNight}`;
    timeToday.innerText = times;

    setTimeout(showTime, 1000)
}

showTime()

//DATE PART
function showDate() {
    var date = new Date();
    var day = date.getDay()
    var dateOfMonth = date.getDate()
    var month = date.getMonth()
    var year = date.getFullYear()


    var dateOfMonth = (dateOfMonth < 10) ? '0' + dateOfMonth : dateOfMonth;

    switch (day) {
        case 0:
            day = "Sun"
            break;
        case 1:
            day = "Mon";
            break;
        case 2:
            day = "Tue";
            break;
        case 3:
            day = "Wed";
            break;
        case 4:
            day = "Thu";
            break;
        case 5:
            day = "Fri";
            break;
        case 6:
            day = "Sat";
    }

    switch (month) {
        case 0:
            month = "January"
            break;
        case 1:
            month = "February"
            break;
        case 2:
            month = "March"
            break;
        case 3:
            month = "April"
            break;
        case 4:
            month = "May"
            break;
        case 5:
            month = "June"
            break;
        case 6:
            month = "July"
            break;
        case 7:
            month = "August"
            break;
        case 8:
            month = "September"
            break;
        case 9:
            month = "October"
            break;
        case 10:
            month = "November"
            break;
        case 11:
            month = "December"
            break;
    }

    dateToday.innerHTML = dateOfMonth + '-' + month + '-' + year + " " + day;

    setTimeout(1000, showDate)

}
showDate()


//Analogue CLOCK
//==============

const secondHand = document.querySelector('.second-hand');
const minuteHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

function analogueClock() {
    const date = new Date();

    const second = date.getSeconds();
    const secondDegree = ((second / 60) * 360) + 90;
    secondHand.style.transform = `translate(0%, -50%) rotate(${secondDegree}deg)`;

    const minute = date.getMinutes();
    const minuteDegree = ((minute / 60) * 360) + ((second / 60) * 6) + 90;
    minuteHand.style.transform = `translate(0%, -50%) rotate(${minuteDegree}deg)`;

    const hour = date.getHours();
    const hourDegree = ((hour / 12) * 360) + ((minute / 60) * 6) + 90;
    hourHand.style.transform = `translate(0%, -50%) rotate(${hourDegree}deg)`;
}

setInterval(analogueClock, 1000);
analogueClock()


//Active class add in bottom nav
//==============================


var nav = document.querySelector("nav");
var btns = nav.querySelectorAll("nav button");

for (var i = 0; i < btns.length; i++) {

    btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace("active", "");
        this.className += "active";
    });
}

//Active section hide and show
//============================

function section_visibility(id) {

    var idName = document.getElementById(id); // clikced button's value (function name as id)

    var activeSection = document.getElementsByClassName("active"); // select button which has active class
    var onclickData = activeSection[0].getAttribute('onclick'); // grap active button's onlick data
    var onclickFunction = onclickData.match(/'\s*(.*?)\s*'/); // grab  value between quote with quote
    var onclickValue = onclickFunction[1]; // grab  value between quote without quote
    var activeID = document.getElementById(onclickValue); // make that value as id

    if (idName.style.display == 'block') {
        idName.style.display = 'none';
        activeID.style.display = 'block';
    } else {
        idName.style.display = 'block';

        if (activeID == idName) {
            activeID.style.display = 'block';
        } else {
            activeID.style.display = 'none';
        }
    }

}


//Coundown timer
//==============
let countdownTime;
const displayCountdownRemain = document.querySelector('.countdown-remain');
const displayCountdownStart = document.querySelector('.countdown-start');
const displayCountdownLength = document.querySelector('.countdown-length');
const displayCountdownEnd = document.querySelector('.countdown-end');
const alarmTone = document.querySelector('.alarm-tone');
const presetButtonData = document.querySelectorAll('.preset-timer [data-minute]');
var fill = document.querySelector('.fill');
var volume = document.querySelector('.countdown-btn .mute');
var reloadCountdownbtn = document.querySelector('.countdown-btn .reload');
var stopCountdownbtn = document.querySelector('.countdown-btn .stop');
var countdownSecond;



//this function is the main function of countdown
function countdownTimer(seconds) {
    countdownSecond = seconds;
    clearInterval(countdownTime);
    alarmTone.pause();
    const nowTime = Date.now();
    const totalTime = nowTime + seconds * 1000; // [nowtime value in milisecond, and input value is in second, so second converted into milisecond by multiplying 1000. then it add and make a time which is greater then present time.]
    countdownRemain(seconds)
    countdownLength(seconds)
    countdownstart(nowTime)
    countdownEnd(totalTime)

    countdownTime = setInterval(() => { // here needs a function. because if we call countdown time once per second, then present and value will be increased. so it won't work properly. so need a function.
        var timeLeft = Math.round((totalTime - Date.now()) / 1000);
        countdownRemain(timeLeft)
        barPercentage(seconds, timeLeft)
        if (timeLeft == 0) {
            clearInterval(countdownTime);
            alarmTone.play();
            alarmTone.loop = true;
            return;
        }
    }, 1000)
}

//remaining time, main countdown shower
function countdownRemain(seconds) {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const remainingSeconds = Math.floor(seconds % 60);
    const remainingMinutes = Math.floor(minutes % 60);
    const remaininghours = Math.floor(hours % 24);

    const remainDisplay = `${hours < 10 ? '0' : ''}${hours} : ${remainingMinutes < 10 ? '0' : ''}${remainingMinutes} : ${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    document.title = remainDisplay;
    displayCountdownRemain.innerHTML = '<div id="days"><h2>' + `${days < 10 ? '0' : ''}${days} ` + '</h2><span>Days</span> </div><div><h2>' + `${remaininghours < 10 ? '0' : ''}${remaininghours} ` + '</h2><span>Hours</span> </div><div><h2>' + `${remainingMinutes < 10 ? '0' : ''}${remainingMinutes}` + '</h2><span>Minutes</span></div><div><h2>' + `${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}` + '</h2><span>Second</span></div>';


    if (hours < 24) {
        var daysss = document.getElementById('days');
        daysss.style.display = "none";
        fill.style.width = "100%"; // i don't know how
    }

}

//countdown length
function countdownLength(seconds) {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const remainingMinutes = Math.floor(minutes % 60);
    let hoursMinute;

    if (minutes > 0 && 60 > minutes) {
        hoursMinute = "Minute";
    } else if (minutes > 60) {
        hoursMinute = "Hours";
    } else if (minutes < 1) {
        hoursMinute = "Second";
    }

    displayCountdownLength.textContent = `Countdown for ${hours < 10 ? '0' : ''}${hours} : ${remainingMinutes < 10 ? '0' : ''}${remainingMinutes} ${hoursMinute}`;
}

// coountdown starting time shower
function countdownstart(startTime) {
    const countdownStartTime = new Date(startTime);
    let hours = countdownStartTime.getHours();
    let minutes = countdownStartTime.getMinutes();
    let dayNight = "AM";

    if (hours == 0) {
        hours = 12
    }
    if (hours > 12) {
        hours = hours - 12;
        dayNight = 'PM';
    }

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;

    displayCountdownStart.textContent = `Time has been starting ${hours} : ${minutes} : ${dayNight}`
}

//when countdown will end
function countdownEnd(totalSecond) {
    const endTime = new Date(totalSecond);
    let hours = endTime.getHours();
    let minutes = endTime.getMinutes();
    let dayNight = "AM";

    if (hours == 0) {
        hours = 12;
    }
    if (hours > 12) {
        hours = hours - 12;
        dayNight = "PM";
    }
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    hours = (hours < 10) ? '0' + hours : hours;


    displayCountdownEnd.textContent = `Be back at ${hours} : ${minutes} : ${dayNight}`
}

//preset buttons and timer
const presetButton = document.querySelectorAll('.preset-timer button')

function presetTimer() {
    presetButton.forEach(singleButton => singleButton.classList.remove('active'));
    const minute = parseInt((this.dataset.minute) * 60);
    countdownTimer(minute);
    this.classList.add('active')
}
presetButtonData.forEach(sinlgepresetButton => sinlgepresetButton.addEventListener('click', presetTimer))


//bar percentage shower
function barPercentage(second, timeLeft) {
    const barWidth = document.querySelector('.percentage-bar').clientWidth;
    var fillWidth = timeLeft * barWidth / second;
    fill.style.width = fillWidth + "px";
}

//alerm mute and unmute
function alermVolume() {
    if (alarmTone.volume == 1) {
        alarmTone.volume = 0;
        volume.classList.replace('fa-volume-up', 'fa-volume-mute');
    } else {
        alarmTone.volume = 1;
        volume.classList.replace('fa-volume-mute', 'fa-volume-up');
    }
}
volume.addEventListener('click', alermVolume)

// restart stopwatch
function reloadCountdown() {
    if (countdownSecond > 0) {
        countdownTimer(countdownSecond)
    }

}
reloadCountdownbtn.addEventListener('click', reloadCountdown)


// restart stopwatch
function stopCountdown() {
    clearInterval(countdownTime)
    document.title = '00:00:00';
    displayCountdownRemain.innerHTML = '<div><h2>' + '00' + '</h2><span>Hours</span> </div><div><h2>' + '00' + '</h2><span>Minutes</span></div><div><h2>' + '00' + '</h2><span>Second</span></div>';
    displayCountdownLength.textContent = ``;
    displayCountdownStart.textContent = '';
    displayCountdownEnd.textContent = '';
    fill.style.width = "100%";
    presetButton.forEach(singleButton => singleButton.classList.remove('active'));
    customCountdownButton.forEach(singleButton => singleButton.classList.remove('active'));
}
stopCountdownbtn.addEventListener('click', stopCountdown)



// custom pannel open and close

const timeCountdownOpener = document.querySelector('.custom-countdown .custom-time-open-close');
const dateCountdownOpener = document.querySelector('.custom-countdown .custom-date-open-close');
const customTime = document.querySelector('.countdown-time-input');
const customDate = document.querySelector('.countdown-date-input');
const overlay = document.querySelector('.overlay');
const customCountdownPanel = document.querySelector('.custom-countdown');
const customCountdownTitle = document.querySelector('.countdown-title');
const customCountdownButton = document.querySelectorAll('.custom-countdown i');

timeCountdownOpener.addEventListener('click', function () {
    overlay.classList.add('active');
    customCountdownPanel.classList.add('panel-open');
    customDate.classList.remove('opacity-visibility');
    customTime.classList.add('opacity-visibility');

})

dateCountdownOpener.addEventListener('click', function () {
    overlay.classList.add('active');
    customCountdownPanel.classList.add('panel-open');
    customDate.classList.add('opacity-visibility');
    customTime.classList.remove('opacity-visibility');
})

overlay.addEventListener('click', () => {
    overlay.classList.remove('active');
    customCountdownPanel.classList.remove('panel-open');
    customCountdownButton.forEach(singleButton => singleButton.classList.remove('active'));
})

// custom countdown button opener active color change
function customCountdownbutton() {
    customCountdownButton.forEach(singleButton => singleButton.classList.remove('active'));
    this.classList.add('active')
}
customCountdownButton.forEach(singleCustombutton => singleCustombutton.addEventListener('click', customCountdownbutton))


//calender min value today
function calenderMinToday() {
    let today = new Date(),
        day = today.getDate(),
        month = today.getMonth() + 1, //January is 0
        year = today.getFullYear();
    if (day < 10) {
        day = '0' + day
    }
    if (month < 10) {
        month = '0' + month
    }
    today = year + '-' + month + '-' + day;

    document.getElementById("countdownDate").setAttribute("min", today);
    //    document.getElementById("countdownDate").setAttribute("value", today);
}
calenderMinToday()

//custom pannel time function


document.customCountdown.addEventListener('submit', function (e) {
    e.preventDefault();
    const day = this.customDays.value;
    const hour = this.customHours.value;
    const minute = this.customMinutes.value;
    const title = this.customTitle.value;
    const dayToSecond = ((day * 24) * 60) * 60;
    const hoursToSecond = (hour * 60) * 60;
    const minuteToSecond = minute * 60;
    const totalSecond = dayToSecond + hoursToSecond + minuteToSecond;
    if (totalSecond > 0) {
        countdownTimer(totalSecond)
        overlay.classList.remove('active');
        customCountdownPanel.classList.remove('panel-open');
        customCountdownTitle.textContent = title;
        presetButton.forEach(singleButton => singleButton.classList.remove('active'));
    }

    this.reset();
})

//custom pannel date function

document.customdateCountdown.addEventListener('submit', function (e) {

    e.preventDefault();
    const selectedDate = this.countdownDate.value;
    const selectedTime = this.countdownTime.value;
    const title = this.customTitle.value;

    const selectedDateConvert = new Date(selectedDate); // selected date (Sun Mar 31 2019 06:00:00 GMT+0600)
    const selectedTimeSplit = selectedTime.split(':')
    const selectedTimeInSecond = (((selectedTimeSplit[0]) * 60 * 60) + ((selectedTimeSplit[1]) * 60)); // selected time in second from 12:00am of day

    const todayDateAndTime = new Date(); // present date (Sun Mar 31 2019 08:10:00 GMT+0600)
    const runningTime = (todayDateAndTime.getHours() * 60 * 60) + (todayDateAndTime.getMinutes() * 60); // selected time in second from 12:00am on today

    const sixHoursMinus = 6 * 60 * 60 * 1000;
    const msBetweenDates = (((selectedDateConvert - sixHoursMinus) - (todayDateAndTime)) / 1000) + selectedTimeInSecond; // selected time - countdown time in second

    var selecteddatejust = selectedDateConvert.getMonth() + ' ' + selectedDateConvert.getDate() + ' ' + selectedDateConvert.getFullYear(); //dd mm yyyy of selected date
    var todayeddatejust = todayDateAndTime.getMonth() + ' ' + todayDateAndTime.getDate() + ' ' + todayDateAndTime.getFullYear(); //dd mm yyyy of present date

    if (selecteddatejust == todayeddatejust && selectedTimeInSecond > runningTime) {
        countdownTimer(msBetweenDates)
    } else if (selecteddatejust > todayeddatejust) {
        countdownTimer(msBetweenDates)
    }

    if (msBetweenDates > 0) {
        countdownTimer(msBetweenDates)
        overlay.classList.remove('active');
        customCountdownPanel.classList.remove('panel-open');
        customCountdownTitle.textContent = title;
        presetButton.forEach(singleButton => singleButton.classList.remove('active'));
    }

    customCountdownTitle.textContent = title;
    this.reset();
})


//Stopwatch code

var stopwatchDisplay = document.querySelector('.stopwatch-display')
var stopwatchStart = document.querySelector('.stopwatch-start')
var stopwatchResetBtn = document.querySelector('.stopwatch-restart')
var stopwatchStartToggle = document.querySelector('.stopwatch-btn .textToggle')
var stopwatchMilisecond = 0;
var stopwatchsecond = 0;
var stopwatchminute = 0;
var stopwatchhour = 0;
let interval = null;
let status = "stopped";


function stopwatch() {


    stopwatchMilisecond++;
    if (stopwatchMilisecond == 100) {
        stopwatchMilisecond = 0;
        stopwatchsecond++;

    }
    if (stopwatchsecond == 60) {
        stopwatchsecond = 0;
        stopwatchminute++;

    }
    if (stopwatchminute == 60) {
        stopwatchminute = 0;
        stopwatchhour++;

    }
    stopwatchDisplay.innerHTML = `<span> ${stopwatchhour < 10 ? '0' : ''}${stopwatchhour} </span><span> ${stopwatchminute < 10 ? '0' : ''}${stopwatchminute} </span><span>${stopwatchsecond < 10 ? '0' : ''}${stopwatchsecond}<span>${stopwatchMilisecond < 10 ? '0' : ''}${stopwatchMilisecond} </span> </span> `;

}



function startStop() {

    if (status === "stopped") {

        interval = window.setInterval(stopwatch, 10);
        stopwatchStart.classList.replace('fa-play-circle', 'fa-pause-circle')
        stopwatchStartToggle.innerHTML = 'Pause'
        status = "started";

    } else {

        window.clearInterval(interval);
        stopwatchStart.classList.replace('fa-pause-circle', 'fa-play-circle')
        stopwatchStartToggle.innerHTML = 'Start'
        status = "stopped";

    }

}

function stopwatchReset() {
    window.clearInterval(interval);
    stopwatchsecond = 0;
    stopwatchminute = 0;
    stopwatchhour = 0;
    stopwatchDisplay.innerHTML = `<span> 00</span><span>00</span><span>00 </span>`;
    stopwatchStart.classList.replace('fa-pause-circle', 'fa-play-circle');
    stopwatchStartToggle.innerHTML = 'Start'
    status = "stopped";
}

stopwatchStart.addEventListener('click', startStop);
stopwatchResetBtn.addEventListener('click', stopwatchReset);


// date calculator 

var units = document.querySelector('.date-analysis .units');
var dates = document.querySelector('.date-analysis .dates');

document.dateCalculator.addEventListener('submit', function (e) {
    e.preventDefault();

    const startDate = new Date(this.fromDate.value)
    const endDate = new Date(this.toDate.value);

    let dateMinus;
    if (startDate > endDate) {
        dateMinus = startDate - endDate;
    } else if (startDate < endDate) {
        dateMinus = endDate - startDate;
    } else {
        dateMinus = 0;
    }

    bothDate(startDate, endDate)
    dateCounter(dateMinus, startDate, endDate)

    this.reset()
})


function dateCounter(timeInMS, startDate, endDate) {
    var startDate = new Date(startDate);
    var startDateOfMonth = startDate.getDate()
    var endDate = new Date(endDate);
    var endDateOfMonth = endDate.getDate()

    //get last day of a month
    var StartMonthHighstDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();
    var EndMonthHighstDate = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0).getDate();

    var monthPlusDays;
    if (startDate < endDate) {
        monthPlusDays = (StartMonthHighstDate - startDateOfMonth) + (EndMonthHighstDate - (EndMonthHighstDate - endDateOfMonth));
    } else if (startDate > endDate) {
        monthPlusDays = (StartMonthHighstDate - (StartMonthHighstDate - startDateOfMonth)) + (EndMonthHighstDate - endDateOfMonth);
    } else {
        monthPlusDays = 0;
    }

    const miliSecond = timeInMS;
    const second = miliSecond / 1000;
    const minute = second / 60;
    const hour = minute / 60;
    const day = hour / 24;
    const week = Math.floor(day / 7);
    const weekPlusDays = day % 7;
    const month = Math.floor(day / 30.4375);
    const monthplusMonth = Math.floor(month % 12);
    const year = Math.floor(day / 365.25);

    units.innerHTML = `<div class='year'>${year} Years, ${monthplusMonth} Month, ${monthPlusDays} Days</div><div class='ms'>${miliSecond} MiliSecond</div><div class='second'>${second} Second</div><div class='minute'>${minute} Minutes</div><div class='hour'>${hour} Hours</div><div class='day'>${day} Days</div><div class='week'>${week} Weeks ${weekPlusDays} Days </div><div class='month'>${month} Month ${monthPlusDays} Days</div>`;
}


function bothDate(startDate, endDate) {

    var startDate = new Date(startDate);
    var startDay = startDate.getDay()
    var startDateOfMonth = startDate.getDate()
    var startMonth = startDate.getMonth()
    var startYear = startDate.getFullYear()

    var endDate = new Date(endDate);
    var endDay = endDate.getDay()
    var endDateOfMonth = endDate.getDate()
    var endMonth = endDate.getMonth()
    var endYear = endDate.getFullYear()

    var startDateOfMonth = (startDateOfMonth < 10) ? '0' + startDateOfMonth : startDateOfMonth;

    switch (startDay) {
        case 0:
            startDay = "Sunday"
            break;
        case 1:
            startDay = "Monday";
            break;
        case 2:
            startDay = "Tuesday";
            break;
        case 3:
            startDay = "Wednesday";
            break;
        case 4:
            startDay = "Thursday";
            break;
        case 5:
            startDay = "Friday";
            break;
        case 6:
            startDay = "Saturday";
    }

    switch (startMonth) {
        case 0:
            startMonth = "January"
            break;
        case 1:
            startMonth = "February"
            break;
        case 2:
            startMonth = "March"
            break;
        case 3:
            startMonth = "April"
            break;
        case 4:
            startMonth = "May"
            break;
        case 5:
            startMonth = "June"
            break;
        case 6:
            startMonth = "July"
            break;
        case 7:
            startMonth = "August"
            break;
        case 8:
            startMonth = "September"
            break;
        case 9:
            startMonth = "October"
            break;
        case 10:
            startMonth = "November"
            break;
        case 11:
            startMonth = "December"
            break;
    }


    var endDateOfMonth = (endDateOfMonth < 10) ? '0' + endDateOfMonth : endDateOfMonth;

    switch (endDay) {
        case 0:
            endDay = "Sunday"
            break;
        case 1:
            endDay = "Monday";
            break;
        case 2:
            endDay = "Tuesday";
            break;
        case 3:
            endDay = "Wednesday";
            break;
        case 4:
            endDay = "Thursday";
            break;
        case 5:
            endDay = "Friday";
            break;
        case 6:
            endDay = "Saturday";
    }

    switch (endMonth) {
        case 0:
            endMonth = "January"
            break;
        case 1:
            endMonth = "February"
            break;
        case 2:
            endMonth = "March"
            break;
        case 3:
            endMonth = "April"
            break;
        case 4:
            endMonth = "May"
            break;
        case 5:
            endMonth = "June"
            break;
        case 6:
            endMonth = "July"
            break;
        case 7:
            endMonth = "August"
            break;
        case 8:
            endMonth = "September"
            break;
        case 9:
            endMonth = "October"
            break;
        case 10:
            endMonth = "November"
            break;
        case 11:
            endMonth = "December"
            break;
    }

    dates.innerHTML = `<div class='starting-date'>${startDay}, ${startDateOfMonth} ${startMonth} ${startYear}</div><div class='to'>To</div><div class='ending-date'>${endDay}, ${endDateOfMonth} ${endMonth} ${endYear}</div>`;

}
