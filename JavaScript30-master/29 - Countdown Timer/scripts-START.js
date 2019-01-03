let countdown;
const timerDisplay = document.querySelector('.display__time-left');

function timer(seconds) {
  const now = Date.now();
  const then = now + seconds * 1000;

  displayTimeLeft(seconds);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if(secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
};

function displayTimeLeft(seconds) {
  // console.log('seconds: ', seconds);
  let minutes = Math.floor(seconds / 60);
  if(minutes < 10) {
    minutes = `0${minutes}`;
  }
  let secs = seconds % 60
  if(secs < 10) {
    secs = `0${secs}`;
  }
  console.log({minutes, secs});
  const display = `${minutes}:${secs}`
  timerDisplay.textContent = display;
};