import { NestFactory } from '@nestjs/core';
import { TrainModule } from './train.module';

async function bootstrap() {
	const app = await NestFactory.create(TrainModule);
	await app.listen(process.env.port ?? 3000);
}
bootstrap();

/////////////////////////////////////////
function printNumbers() {
	let num = 1;

	const timer = setInterval(() => {
		console.log(num);

		if (num === 5) clearInterval(timer);

		num++;
	}, 1000);
}

printNumbers();
//////////////////////////////////////////////////////
// TASK_ZM
function reverseInteger(num) {
	return Number(
		num
			.toString()
			.split('')
			.map((item, index, arr) => arr[arr.length - 1 - index])
			.join(''),
	);
}

console.log(reverseInteger(123456789));
console.log(reverseInteger(987654321));
///////////////////////////////////////////////////
// TASK_ZL
function stringToKebab(string) {
	string = string.toLowerCase();

	let result = '';

	for (let i = 0; i < string.length; i++) {
		if (string[i] === ' ') result += '-';
		else result += string[i];
	}

	return result;
}

console.log(stringToKebab('I love Kebab'));
///////////////////////////////////////////////
// TASK_ZN
function rotateArray(array, n) {
	const len = array.length;

	return array.reduce((acc, _, i) => {
		acc.push(array[(i + n) % len]);
		return acc;
	}, []);
}



console.log(rotateArray([1, 2, 3, 4, 5, 6], 3));
