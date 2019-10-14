import { arrayToBase10, base10ToArray } from '../../utils/BusConversions.js';

function busArrayAddition(arr1, arr2) {
  var arr1AsBase10 = arrayToBase10(arr1);
  var arr2AsBase10 = arrayToBase10(arr2);

  var additionResult = arr1AsBase10 + arr2AsBase10;

  // Use the shortest length to prevent overflow
  var shortestArrLength =
    arr1.length <= arr2.length ? arr1.length : arr2.length;

  return base10ToArray(additionResult, shortestArrLength);
}

export { busArrayAddition };
