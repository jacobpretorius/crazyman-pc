import { base10ToBoolArray, boolArrayToBase10 } from './BusConversions.js';

// I know, I know. These aren't actually bitwise additions/subtractions. They are done in
// plain old base 10. I'll get round to changing them sometime.
// These operations being bitwise are less important to me than having the Ben Eater CPU running. MVP.

function boolArrayAddition(arr1, arr2) {
  let arr1AsBase10 = boolArrayToBase10(arr1);
  let arr2AsBase10 = boolArrayToBase10(arr2);

  let result = arr1AsBase10 + arr2AsBase10;

  let overflow = result > 255;
  let zero = result === 0;

  // Use the shortest length to prevent overflow of leading bits
  let shortestArrLength =
    arr1.length <= arr2.length ? arr1.length : arr2.length;

  return {
    value: base10ToBoolArray(result, shortestArrLength),
    overflow,
    zero,
  };
}

function boolArraySubtraction(arr1, arr2) {
  let arr1AsBase10 = boolArrayToBase10(arr1);
  let arr2AsBase10 = boolArrayToBase10(arr2);

  let result = arr1AsBase10 - arr2AsBase10;

  let overflow = result < 0;
  let zero = result === 0;

  // if (result < 0) {
  //   result = 0;
  // }

  // Use the shortest length to prevent overflow of leading bits
  let shortestArrLength =
    arr1.length <= arr2.length ? arr1.length : arr2.length;

  return {
    value: base10ToBoolArray(result, shortestArrLength),
    overflow,
    zero,
  }  
}

export { boolArrayAddition, boolArraySubtraction };
