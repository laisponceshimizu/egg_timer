let timer;
let timeLeft = 0;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const alarm = document.getElementById('alarm');
const eggImage = document.getElementById('eggImage');
const softBtn = document.getElementById('softBtn');
const mediumBtn = document.getElementById('mediumBtn');
const hardBtn = document.getElementById('hardBtn');

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');

    if (timeLeft === 0) {
        clearInterval(timer);
        timer = null;
        alarm.currentTime = 0; // Garante que sempre comece do início
        alarm.play();
        eggImage.src = 'egg-cooked.gif'; // Muda imagem do ovo cozido
        startBtn.textContent = 'Iniciar';
    } else {
        timeLeft--;
    }
}

function startTimer(duration) {
    if (duration <= 0) return; // Evita iniciar o timer sem um tempo definido
    clearInterval(timer);
    timeLeft = duration;
    updateTimer();
    timer = setInterval(updateTimer, 1000);
    startBtn.textContent = 'Pausar';
}    

softBtn.addEventListener('click', () => {
    startTimer(300); // 5 minutos para ovo mole
});

mediumBtn.addEventListener('click', () => {
    startTimer(420); // 7 minutos para ovo médio
});

hardBtn.addEventListener('click', () => {
    startTimer(600); // 10 minutos para ovo duro
});

startBtn.addEventListener('click', () => {
    if (timeLeft > 0) {
        if (timer) {  // Se já houver um timer rodando, ele deve ser pausado
            clearInterval(timer);
            timer = null;
            startBtn.textContent = 'Continuar';
        } else {  // Caso contrário, inicia o timer
            timer = setInterval(updateTimer, 1000);
            startBtn.textContent = 'Pausar';
        }
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    timer = null;
    timeLeft = 0;
    minutesDisplay.textContent = '00';
    secondsDisplay.textContent = '00';
    startBtn.textContent = 'Iniciar';
    eggImage.src = 'egg.gif'; // Volta ao GIF de ovo cru
    alarm.pause();
    alarm.currentTime = 0;
});