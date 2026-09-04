export class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.timerDisplay = document.querySelector(`${selector}`);
    this.targetDate = targetDate;
    this.intervalId = null;
  }
  #formatedTime(time) {
    const ms = time % 1000;
    const sec = Math.floor(time / 1000) % 60;
    const min = Math.floor(time / (1000 * 60)) % 60;
    const hour = Math.floor(time / (1000 * 60 * 60)) % 24;
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    return { days, hour, min, sec, ms };
  }

  #updateDisplay({ days, hour, min, sec }) {
    const elemetsTime = this.timerDisplay.querySelectorAll("[data-value]");
    elemetsTime.forEach((elemetTime) => {
      const value = elemetTime.dataset.value;
      if (value === "days") {
        elemetTime.textContent = days.toString().padStart(2, "0");
      }
      if (value === "hours") {
        elemetTime.textContent = hour.toString().padStart(2, "0");
      }
      if (value === "mins") {
        elemetTime.textContent = min.toString().padStart(2, "0");
      }
      if (value === "secs") {
        elemetTime.textContent = sec.toString().padStart(2, "0");
      }
    });
  }

  startTimer() {
    if (!this.timerDisplay) {
      console.error("Не вірний селектор");
      return;
    }
    const updateTimer = () => {
      const currentTime = Date.now();
      const deltaTime = this.targetDate - currentTime;

      if (deltaTime <= 0) {
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.#updateDisplay({
          days: 0,
          hour: 0,
          min: 0,
          sec: 0,
        });
        return;
      }

      const stringTime = this.#formatedTime(deltaTime);
      this.#updateDisplay(stringTime);
    };
    updateTimer();
    this.intervalId = setInterval(updateTimer, 1000);
  }
}
