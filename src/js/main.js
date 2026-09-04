import { CountdownTimer } from "./timer";

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Jul 17, 2027"),
});

console.log(document.querySelectorAll("[data-value]"));
timer.startTimer();
