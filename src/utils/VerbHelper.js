function getVerb(programRegister) {
  let bus = JSON.stringify(
              [...programRegister].slice(4, programRegister.length)
                .reverse());

  // FYI: These values are standard binary format, not display flipped.
  // Least significant bit first.
  // Also see VERBS.md
  switch(bus) {
    // 0001
    case JSON.stringify([false, false, false, true]):
      return 'LDA';

    // 0010
    case JSON.stringify([false, false, true, false]):
      return 'ADD';

    // 0011
    case JSON.stringify([false, false, true, true]):
      return 'SUB';

    // 0100
    case JSON.stringify([false, true, false, false]):
      return 'STA';

    // 0101
    case JSON.stringify([false, true, false, true]):
      return 'LDI';

    // 0110
    case JSON.stringify([false, true, true, false]):
      return 'JMP';

    // 0111
    case JSON.stringify([false, true, true, true]):
      return 'JPC';

    // 1000
    case JSON.stringify([true, false, false, false]):
      return 'JPZ';

    // 1001
    case JSON.stringify([true, false, false, true]):
      return 'LDB';

    // 1110
    case JSON.stringify([true, true, true, false]):
      return 'OUT';

    // 1111
    case JSON.stringify([true, true, true, true]):
      return 'HLT';

    // 0000
    default:
      return 'NOP';
  }
}

function verbToBinaryBitArray(verb) {
  switch(verb) {
    case 'LDA':
      return [false, false, false, true];

    case 'ADD':
      return [false, false, true, false];

    case 'SUB':
      return [false, false, true, true];

    case 'STA':
      return [false, true, false, false];

    case 'LDI':
      return [false, true, false, true];

    case 'JMP':
      return [false, true, true, false];

    case 'JPC':
      return [false, true, true, true];

    case 'JPZ':
      return [true, false, false, false];

    case 'LDB':
      return [true, false, false, true];

    case 'OUT':
      return [true, true, true, false];

    case 'HLT':
      return [true, true, true, true];

    default:
      return [false, false, false, false];
  }
}

export { getVerb, verbToBinaryBitArray };
