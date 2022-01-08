function timeCounter(stausBarItem) {
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  let displayHours = "00";
  let displayMinutes = "00";
  let displaySeconds = "00";
  let timeSpent = "00:00:00";
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

  setInterval(IncrementTime, 1000);
}

module.exports = {
  timeCounter,
};
