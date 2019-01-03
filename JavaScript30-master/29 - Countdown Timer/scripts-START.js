let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;

  displayTimeLeft(seconds);
  displayEndTime(then);

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
  const display = `${minutes}:${secs}`;
  document.title = display;
  timerDisplay.textContent = display;
};

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hours = end.getHours();
  const mins = end.getMinutes();
  endTime.textContent = `Be Back at ${hours > 12 ? hours - 12 : hours}:${mins < 10 ? '0' : ''}${mins}`;
};

function startTimer(e) {
  const seconds = +this.dataset.time;
  console.log('seconds: ', seconds);
  timer(seconds);
};

buttons.forEach(btn => btn.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  this.reset();
  timer(mins * 60);
});