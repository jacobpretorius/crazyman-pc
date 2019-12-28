function getVerb(programRegister) {
  let bus = JSON.stringify(
              [...programRegister].slice(4, programRegister.length)
                .reverse());

  // FYI: These values are standard binary format, not display flipped
  if (bus === JSON.stringify([false, false, false, true])) {
    return 'LDA';
  }

  if (bus === JSON.stringify([false, false, true, true])) {
    return 'LDB';
  }

  if (bus === JSON.stringify([false, false, true, false])) {
    return 'ADD';
  }

  if (bus === JSON.stringify([true, true, true, false])) {
    return 'OUT';
  }

  if (bus === JSON.stringify([true, true, true, true])) {
    return 'HLT';
  }

  return 'NOP';
}

export { getVerb };
