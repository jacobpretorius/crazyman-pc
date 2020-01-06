function getVerb(programRegister) {
  let bus = JSON.stringify(
              [...programRegister].slice(4, programRegister.length)
                .reverse());

  // FYI: These values are standard binary format, not display flipped
  // 0001
  if (bus === JSON.stringify([false, false, false, true])) {
    return 'LDA';
  }

  // 0011
  if (bus === JSON.stringify([false, false, true, true])) {
    return 'LDB';
  }

  // 0010
  if (bus === JSON.stringify([false, false, true, false])) {
    return 'ADD';
  }

  // 0110
  if (bus === JSON.stringify([false, true, true, false])) {
    return 'JMP';
  }

  // 1110
  if (bus === JSON.stringify([true, true, true, false])) {
    return 'OUT';
  }

  // 1111
  if (bus === JSON.stringify([true, true, true, true])) {
    return 'HLT';
  }

  return 'NOP';
}

function verbToBinaryBitArray(verb) {
  switch(verb) {
    case 'LDA':
      return [false, false, false, true];

    case 'LDB':
      return [false, false, true, true];

    case 'ADD':
      return [false, false, true, false];

    case 'JMP':
      return [false, true, true, false];

    case 'OUT':
      return [true, true, true, false];

    case 'HLT':
      return [true, true, true, true];

    default:
      return [false, false, false, false];
  }
}

export { getVerb, verbToBinaryBitArray };
