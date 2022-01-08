let hours = 0;
let minutes = 0;
let seconds = 0;

let displayHours = "00";
let displayMinutes = "00";
let displaySeconds = "00";
let timeSpent = "00:00:00";

let interval;

//Start the timer at 00:00:00
function StartTimeCounter(stausBarItem) {
  function IncrementTime() {
    seconds++;
    if (seconds > 59) {
      seconds = 0;
      minutes++;

      if (minutes > 59) {
        minutes = 0;
        hours++;
      }
    }

    if (seconds < 10) {
      displaySeconds = `0${seconds}`;
    } else {
      displaySeconds = seconds;
    }

    if (minutes < 10) {
      displayMinutes = `0${minutes}`;
    } else {
      displayMinutes = minutes;
    }
    if (hours < 10) {
      displayHours = `0${hours}`;
    } else {
      displayHours = hours;
    }

    timeSpent = `${displayHours}:${displayMinutes}:${displaySeconds}`;
    stausBarItem.text = `$(watch) ${timeSpent}`;
  }

  if (!interval) {
    interval = setInterval(IncrementTime, 1000);
  }
  stausBarItem.tooltip = "Time elapsed since work session started";
}

//Pause the counter at the last recorded time
function PauseTimeCounter(stausBarItem) {
  clearInterval(interval);
  interval = null;
  timeSpent = `${displayHours}:${displayMinutes}:${displaySeconds}`;
  stausBarItem.text = `$(watch) Timer paused [${timeSpent}]`;
  stausBarItem.tooltip = "Timer paused";
}

//Resume the counter from the last recorded time
function ResumeTimeCounter(stausBarItem) {
  function IncrementTime() {
    seconds++;
    if (seconds > 59) {
      seconds = 0;
      minutes++;

      if (minutes > 59) {
        minutes = 0;
        hours++;
      }
    }

    if (seconds < 10) {
      displaySeconds = `0${seconds}`;
    } else {
      displaySeconds = seconds;
    }

    if (minutes < 10) {
      displayMinutes = `0${minutes}`;
    } else {
      displayMinutes = minutes;
    }
    if (hours < 10) {
      displayHours = `0${hours}`;
    } else {
      displayHours = hours;
    }

    timeSpent = `${displayHours}:${displayMinutes}:${displaySeconds}`;
    stausBarItem.text = `$(watch) ${timeSpent}`;
  }
  if (!interval) {
    interval = setInterval(IncrementTime, 1000);
  }
  stausBarItem.tooltip = "Time elapsed since work session started";
}

//Reset the counter from the last recorded time
function ResetTimeCounter(stausBarItem) {
  clearInterval(interval);
  interval = null;
  hours = 0;
  minutes = 0;
  seconds = 0;
  displayHours = "00";
  displayMinutes = "00";
  displaySeconds = "00";
  timeSpent = "00:00:00";
  stausBarItem.text = `$(watch) ${timeSpent}`;
  stausBarItem.tooltip = "Work session time tracker is not activated";
}

module.exports = {
  StartTimeCounter,
  PauseTimeCounter,
  ResumeTimeCounter,
  ResetTimeCounter,
};
