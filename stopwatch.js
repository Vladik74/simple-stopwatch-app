let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;

let displayedMilliSeconds = 0;
let displayedSeconds = 0;
let displayedMinutes = 0;
let displayedHours = 0;

let interval = null;
let counter = 0;
let measures = [new Date(0, 0, 0, 0, 0, 0, 0)];


function getDisplayedTime(hours, minutes, seconds, milliseconds) {
    if (milliseconds < 10) {
        milliseconds = `0${milliseconds}`
    }

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    if (hours < 10) {
        hours = `0${hours}`;
    }

    return [hours, minutes, seconds, milliseconds]
}

function getFormatDisplayTime(hours, minutes, seconds, milliseconds) {
    return `${hours}:${minutes}:${seconds}:${milliseconds}`
}

function stopWatch() {
    document.getElementById('split').hidden = false;
    milliseconds += 10;
    if (milliseconds % 1000 === 0) {
        milliseconds = 0;
        seconds++;
        if (seconds % 60 === 0) {
            seconds = 0;
            minutes++;
            if (minutes % 60 === 0) {
                minutes = 0;
                hours++;
            }
        }
    }

    [displayedHours, displayedMinutes, displayedSeconds, displayedMilliSeconds] = getDisplayedTime(hours, minutes, seconds, milliseconds / 10);

    document.getElementById('hours').innerHTML = displayedHours;
    document.getElementById('minutes').innerHTML = displayedMinutes;
    document.getElementById('seconds').innerHTML = displayedSeconds;
    document.getElementById('milliseconds').innerHTML = displayedMilliSeconds;
}

function startStop() {
    if (document.getElementById("start").innerHTML === 'Start') {
        document.getElementById("start").innerHTML = 'Stop';
        interval = window.setInterval(stopWatch, 10);
    } else {
        document.getElementById("start").innerHTML = 'Start';
        window.clearInterval(interval);
    }
}

function reset() {
    document.getElementById('split').hidden = true;
    window.clearInterval(interval);
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    counter = 0;
    document.getElementById('hours').innerHTML = '00';
    document.getElementById('minutes').innerHTML = '00';
    document.getElementById('seconds').innerHTML = '00';
    document.getElementById('milliseconds').innerHTML = '00';
    document.getElementById("start").innerHTML = 'Start';
    document.querySelector('tbody').innerHTML = '';
    measures.length = 0;
    measures = [new Date(0, 0, 0, 0, 0, 0, 0)];
}

function split() {
    const body = document.querySelector('tbody');
    counter++;
    measures.push(new Date(0, 0, 0, hours, minutes, seconds, milliseconds));
    const diff = (measures[measures.length - 1] - measures[measures.length - 2]);
    const displayedTime = getDisplayedTime(Math.floor(diff / 3600000), Math.floor(diff / 60000),
        Math.floor(diff / 1000), (diff % 1000) / 10);
    const circleConstructor = '<tr>\n' +
        `      <td>${counter}</td>\n` +
        `      <td>${getFormatDisplayTime(displayedHours, displayedMinutes,
            displayedSeconds, displayedMilliSeconds)}</td>\n` +
        ` <td>+ ${getFormatDisplayTime(displayedTime[0], displayedTime[1], displayedTime[2], displayedTime[3])}</td>\n`
        + '    </tr>'
    body.innerHTML += circleConstructor;
}