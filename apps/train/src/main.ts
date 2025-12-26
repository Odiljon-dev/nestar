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
