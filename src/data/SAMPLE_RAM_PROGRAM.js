// This is the code that our CPU will run from memory
// Someday this should be created in the browser by some sort of a compiler

// VERBS
// --------------

// FETCH - Increment PC and load it to RAM

// LDA MemLoc - Load contents of memloc to A register
// 0001

// ADD MemLOC - Add the contents of Memloc to register A
// 0010

// OUT - Print the contents of register A to the console
// 1110

// HALT - Stops the CPU
// 1111

// FYI: These values are standard binary format, not display flipped
const SAMPLE_RAM_PROGRAM = [
  // 0- LDA 14
  [false, false, false, true, true, true, true, false],

  // 1- ADD 15
  [false, false, true, true, true, true, true, true],

  // 2- OUT
  [true, true, true, false, false, false, false, false],

  // 3- HLT
  [true, true, true, true, false, false, false, false],

  // 4-13- NOOPS
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],

  // 14- Binary value 30
  [false, true, false, false, true, false, false, false],

  // 15- Binary value 12
  [false, false, true, false, false, false, false, false],
];

export default SAMPLE_RAM_PROGRAM;