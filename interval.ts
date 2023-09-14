import { Observable, interval } from "rxjs";

function intervals(speed: number) {
	return new Observable((observer) => {
		let count = 0;
		const timer = setInterval(() => {
			console.log("Timer");

			observer.next(count++);
		}, speed);

		return () => {
			clearInterval(timer);
		};
	});
}

// const sub = interval(1000).subscribe(console.log);
const sub = intervals(1000).subscribe(console.log);


setTimeout(() => {
	sub.unsubscribe();
	console.log("Timed out");
}, 10000);
