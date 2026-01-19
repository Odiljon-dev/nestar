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
////////////////////////////////////////////////////
// TASK
function areArraysEqual(a, b) {
	let result = true;

	a.map((item) => {
		if (!b.includes(item)) result = false;
	});

	return result;
}

console.log(areArraysEqual([1, 2, 3], [3, 1, 2]));
console.log(areArraysEqual([1, 2, 3], [3, 1, 2, 1]));
console.log(areArraysEqual([1, 2, 3], [4, 1, 2]));
//////////////////////////////////////////////////////
// TASK
function groupAnagrams(str) {
	const map = new Map();

	for (let word of str) {
		const key = word.split('').sort().join('');

		if (!map.has(key)) {
			map.set(key, []);
		}

		map.get(key).push(word);
	}

	return Array.from(map.values());
}

console.log(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']));
////////////////////////////////////////////////////////////////////
function findDuplicates(array) {
	const map = new Map();
	const result = [];

	for (const num of array) {
		map.set(num, (map.get(num) || 0) + 1);
	}

	for (const [key, value] of map) {
		if (value > 1) {
			result.push(key);
		}
	}

	return result;
}

console.log(findDuplicates([1, 2, 3, 4, 5, 4, 3, 4]));
//////////////////////////////////////////////////////
// TASK_ZR
function countNumberAndLetters(strring) {
	let number = 0;
	let letter = 0;

	for (const char of strring) {
		if (!isNaN(char) && char !== ' ') {
			number++;
		} else if (/[a-zA-Z]/.test(char)) {
			letter++;
		}
	}

	return { number, letter };
}

console.log(countNumberAndLetters('string152%¥'));
/////////////////////////////////////////////////////////
// TASK_ZS

function singleNumber(array) {
  const count = {};

  for (let num of array) {
    count[num] = (count[num] || 0) + 1;
  }

  for (let key in count) {
    if (count[key] === 1) {
      return Number(key);
    }
  }
}

console.log(singleNumber([4, 2, 1, 2, 1])); 