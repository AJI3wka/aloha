window.onload = function() {
    initializeTimer();
};

function initializeTimer() {
    var year = 2017; // год
    var month = 9; // месяц
    var day = 13; // день
    var endDate = new Date(year,month-1,day,23,59);
    var currentDate = new Date();
    var seconds = (endDate-currentDate) / 1000;
    if (seconds > 0) {
        var minutes = seconds/60; // определяем количество минут до истечения таймера
        var hours = minutes/60; // определяем количество часов до истечения таймера
        var days = hours/24; // определяем количество часов до истечения таймера
        days = Math.floor(days); // подсчитываем кол-во оставшихся секунд в текущей минуте
        minutes = (hours - Math.floor(hours)) * 60; // подсчитываем кол-во оставшихся минут в текущем часе
        hours = Math.floor((hours - (days * 24))); // целое количество часов до истечения таймера
        seconds = Math.floor((minutes - Math.floor(minutes)) * 60); // подсчитываем кол-во оставшихся секунд в текущей минуте
        minutes = Math.floor(minutes); // округляем до целого кол-во оставшихся минут в текущем часе

        setTimePage(days,hours,minutes,seconds);

        function secOut() {
            if (seconds === 0) {
                if (minutes === 0) {
                    if (hours === 0) {
                        if(days === 0) {
                            showMessage(timerId);
                        } else {
                            days--;
                            hours = 23;
                            minutes = 59;
                            seconds = 59;
                        }
                    }
                    else {
                        hours--;
                        minutes = 59;
                        seconds = 59;
                    }
                }
                else {
                    minutes--;
                    seconds = 59;
                }
            }
            else {
                seconds--;
            }
            setTimePage(days,hours,minutes,seconds); // обновляем значения таймера на странице
        }
        timerId = setInterval(secOut, 1000) // устанавливаем вызов функции через каждую секунду
    }
    else {
        alert("Установленная дата уже прошла");
    }
}

function setTimePage(d,h,m,s) { // функция выставления таймера на странице
    var days = document.getElementById("timer__days");
    var hours = document.getElementById("timer__hours");
    var minutes = document.getElementById("timer__minutes");
    var seconds = document.getElementById("timer__seconds");
    days.innerHTML = d;
    hours.innerHTML = h;
    minutes.innerHTML = m;
    seconds.innerHTML = s;
}

function showMessage(timerId) { // функция, вызываемая по истечению времени
    alert("Время истекло!");
    clearInterval(timerId); // останавливаем вызов функции через каждую секунду
}