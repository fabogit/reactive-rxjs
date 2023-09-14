import { Observable } from "rxjs";

const numbers: Observable<number> = new Observable((obs) => {
  let count = 1;
  // Emit next value
  obs.next(10);

  // Emit 1-100 integers 4 times
  const timer = setInterval(() => {
    if (count < 5) {
      count++;
    } else {
      obs.complete();
    }
    obs.next(Math.floor(Math.random() * (1 - 100)) + 100);
  }, 1000);
  return () => {
    clearInterval(timer);
    console.log("Clear");
  };
});

const sub = numbers.subscribe({
  next(value) {
    console.log(`Value: ${value}`);
  },
  error(err) {
    console.error(`Error`, err);
  },
  complete() {
    console.info(`Complete`);
  },
});

// unsubscribe after 5sec
setInterval(() => {
  sub.unsubscribe();
  console.log("Timed out");
}, 8000);
