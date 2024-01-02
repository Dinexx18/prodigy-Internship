let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapCounter = 1;

function startStop() {
    if (isRunning) {
        clearInterval(timer);
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 10);
    }
    isRunning = !isRunning;
}

function pauseResume() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    } else {
        startStop();
    }
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    updateDisplay();
    lapCounter = 1;
    document.getElementById("lapList").innerHTML = "";
}

function lap() {
    if (isRunning) {
        const lapTime = Date.now() - startTime;
        const formattedTime = formatTime(lapTime);
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapCounter}: ${formattedTime}`;
        document.getElementById("lapList").appendChild(lapItem);
        lapCounter++;
    }
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
}

function updateDisplay() {
    const formattedTime = formatTime(elapsedTime);
    document.getElementById("stopwatch").textContent = formattedTime;
}

function formatTime(time) {
    const date = new Date(time);
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const milliseconds = date.getMilliseconds().toString().padStart(3, '0').slice(0, 2);
    return `${minutes}:${seconds}:${milliseconds}`;
}
