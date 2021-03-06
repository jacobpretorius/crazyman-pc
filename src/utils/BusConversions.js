function boolArrayToBase10(array) {
  // Safely get the full bus values
  let str = '';
  // Incoming array for base10 value '1' is base2 '100' instead of '001' so we reverse it first
  let flipped = [...array].reverse();
  for (let i = 0; i < flipped.length; i++) {
    if (flipped[i]) {
      if (flipped[i] === true) {
        str = str + '1';
      } else {
        str = str + '0';
      }
    } else {
      str = str + '0';
    }
  }

  // Convert to base 10
  return parseInt(str, 2);
}

function base10ToBoolArray(value, expectedArrSize = 8) {
  // Convert result to base 2 and reverse because we want bit 0 to be 1(base2)
  let valueBase2 = value
    .toString(2)
    .split('')
    .reverse();

  let resultArr = [];

  // safely build the result bus array
  for (let j = 0; j < expectedArrSize; j++) {
    if (valueBase2[j]) {
      resultArr[j] = valueBase2[j] === '1';
    } else {
      resultArr[j] = false;
    }
  }

  return resultArr;
}

export { boolArrayToBase10, base10ToBoolArray };
