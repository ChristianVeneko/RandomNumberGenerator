const generateButton = document.getElementById("generate");
const resulth2 = document.getElementById("result");

generateButton.addEventListener("click", () => {
  //la semilla se crea llamando la funcion getSeedFromHour
  let decimalSeed = getSeedFromHour();
  let seedArray = numberToBinary(decimalSeed);
  let binaryArray = generateRandomBinary(seedArray);

  let randomNumber = binaryArrayToNumber(binaryArray);
  resulth2.textContent = randomNumber;
});

//obtener la semilla para generar el numero aleatorio
function getSeedFromHour() {
  const date = new Date();
  let hour = date.valueOf();
  let hourString = hour.toString();
  hour = hourString.split("");

  //elimina el primer elemento del array hasta que el array sea de 5 elementos
  do {
    hour.shift();
  } while (hour.length > 5);
  hour = hour.map((digit) => parseInt(digit));
  hour = parseInt(hour.join(""));
  return hour;
}

function numberToBinary(num) {
  let number = num;
  let binary = [];

  while (number > 0) {
    let residue = number % 2;
    binary.push(residue);
    number = Math.floor(number / 2);
  }

  binary.reverse();
  return binary;
}

//genera un numero binario aleatorio
function generateRandomBinary(seed) {
  const actualSeed = seed;
  let finalElementIndex = actualSeed.length - 1;
  let i = 0;
  let finalSeed = [];
  let result = 0;
  do {
    finalSeed[i] = actualSeed[finalElementIndex];
    if (actualSeed[finalElementIndex] == actualSeed[finalElementIndex - 1]) {
      result = 0;
    } else {
      result = 1;
    }
    actualSeed.unshift(result);
    actualSeed.pop();
    i++;
  } while (!(finalSeed.length == seed.length));
  return finalSeed;
}

const binaryArrayToNumber = (arr) => {
  let results = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    let result = arr[i] * 2 ** (arr.length - i - 1);
    results.push(result);
  }

  let number = 0;
  for (let i = 0; i < results.length; i++) {
    number = number + results[i];
  }
  return number;
};
