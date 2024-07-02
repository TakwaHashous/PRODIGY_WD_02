
const stopwatchDisplay = document.querySelector('.display');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapList = document.getElementById('lap-list');

let startTime = 0;
let elapsedTime = 0;
let intervalId;
let lapTimes = [];

function startTimer() {
  if (!startTime) {
    startTime = Date.now(); 
  }
  intervalId = setInterval(updateTime, 10); 
  startBtn.disabled = true; 
  stopBtn.disabled = false; 
  lapBtn.disabled = false; 
}

function stopTimer() {
  clearInterval(intervalId); 
  intervalId = null; 
  stopBtn.disabled = true; 
  lapBtn.disabled = true; 
}

function resetTimer() {
  clearInterval(intervalId); 
  intervalId = null; 
  startTime = 0; 
  elapsedTime = 0; 
  stopwatchDisplay.textContent = '00:00:00.000'; 
  lapTimes = []; 
  lapList.innerHTML = ''; 
  startBtn.disabled = false; 
  stopBtn.disabled = true; 
  lapBtn.disabled = true; 
}

function recordLap() {
  if (startTime) { 
    const currentLapTime = elapsedTime;
    const lapItem = document.createElement('li');
    lapItem.classList.add('lap-item');
    const lapNumber = lapTimes.length + 1;
    lapItem.textContent = `Lap ${lapNumber}: ${formatTime(currentLapTime)}`; 
    lapList.appendChild(lapItem);
    lapTimes.push(currentLapTime); 
  }
}

function updateTime() {
  const now = Date.now();
  elapsedTime = now - startTime;
  const milliseconds = elapsedTime % 1000;
  const seconds = Math.floor((elapsedTime / 1000) % 60);
  const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
  const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);

  stopwatchDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

function formatTime(timeInMilliseconds) {
  const milliseconds = timeInMilliseconds % 1000;
  const seconds = Math.floor((timeInMilliseconds / 1000) % 60);
  const minutes = Math.floor((timeInMilliseconds / (1000 * 60)) % 60);
  const hours = Math.floor((timeInMilliseconds / (1000 * 60 * 60)) % 24);

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

// Event listeners for button clicks
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);

