// GET ELEMENTS

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// BUILD FUNCTIONS

function togglePlay() {
  if(video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
};

function skip() {
  video.currentTime += +this.dataset.skip;
};

function handleRangeUpdate() {
  video[this.name] = this.value;
};

function handleProgress() {
  let progPercent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${progPercent}%`;
};

function changeTime(e) {
  console.log('moving');
  let time = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = time;
};

// HOOK UP EVENT LISTENERS

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(btn => btn.addEventListener('click', skip));

ranges.forEach(rng => rng.addEventListener('change', handleRangeUpdate));
ranges.forEach(rng => rng.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', changeTime);
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mouseout', () => mousedown = false);
progress.addEventListener('mousemove', (e) => mousedown && changeTime(e));