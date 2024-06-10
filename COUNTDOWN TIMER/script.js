document.addEventListener('DOMContentLoaded', () => {
    const countdownForm = document.getElementById('countdown-form');
    const datetimeInput = document.getElementById('datetime');
    const countdownDisplay = document.getElementById('countdown-display');
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    let countdownInterval;

    countdownForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const targetDate = new Date(datetimeInput.value);
        startCountdown(targetDate);
    });

    function startCountdown(targetDate) {
        clearInterval(countdownInterval);

        countdownInterval = setInterval(() => {
            const now = new Date();
            const timeRemaining = targetDate - now;

            if (timeRemaining <= 0) {
                clearInterval(countdownInterval);
                countdownDisplay.innerHTML = '<h2>Countdown Finished!</h2>';
                return;
            }

            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            daysElement.textContent = String(days).padStart(2, '0');
            hoursElement.textContent = String(hours).padStart(2, '0');
            minutesElement.textContent = String(minutes).padStart(2, '0');
            secondsElement.textContent = String(seconds).padStart(2, '0');
        }, 1000);
    }
});
