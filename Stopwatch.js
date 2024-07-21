
let startTime = 0;
let currentTime = 0;
let lapTimes = [];
let intervalId = null;


const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapList = document.getElementById('lap-list');

startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', addLap);

function startStopwatch() {
    startTime = new Date().getTime();
    intervalId = setInterval(updateTime, 1000);
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;
    lapBtn.disabled = false;
}

function pauseStopwatch() {
    clearInterval(intervalId);
    pauseBtn.disabled = true;
    startBtn.disabled = false;
}

function resetStopwatch() {
    clearInterval(intervalId); 
    startTime = 0;
    currentTime = 0;
    lapTimes = [];
    timeDisplay.textContent = '00:00:00';
    lapList.innerHTML = '';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;
}

function addLap() {
    const lapTime = currentTime;
    lapTimes.push(lapTime);
    const lapListItem = document.createElement('li');
    lapListItem.textContent = `Lap ${lapTimes.length}: ${formatTime(lapTime)}`;
    lapList.appendChild(lapListItem);
}

function updateTime() {
    currentTime = new Date().getTime() - startTime;
    timeDisplay.textContent = formatTime(currentTime);
}

function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}