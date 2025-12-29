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
