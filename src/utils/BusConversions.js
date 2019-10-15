function arrayToBase10(array) {
  // Safely get the full bus values
  var str = '';
  for (let i = 0; i < array.length; i++) {
    if (array[i]) {
      if (array[i] === true) {
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

function base10ToArray(value, expectedArrSize) {
  // Convert result to base 2 and reverse for our bus format
  var valueBase2 = value
    .toString(2)
    .split('')
    .reverse();

  var resultArr = [];

  // safely build the result bus array
  for (let j = 0; j < expectedArrSize; j++) {
    if (valueBase2[j]) {
      resultArr[j] = valueBase2[j] === '1' ? true : false;
    } else {
      resultArr[j] = false;
    }
  }

  // NB: We always reverse the result because we want bit 0 to be 1(base2)
  return resultArr.reverse();
}

export { arrayToBase10, base10ToArray, };
