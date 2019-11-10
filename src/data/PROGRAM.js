//VERY WIP


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

const CL_OPERATIONS = [
  {
    // FETCH
    0: [0,1,1,0,0,0,0,0,0,0], // Incr PC
    1: [0,0,0,1,0,0,0,0,0,0], // Load new PC to RAM MAR
    // LDA
    2: [0,0,0,0,0,0,0,0,0,0], // 
  },

  {},
  [],
  [],
  [],
  [],
];

export default CL_OPERATIONS;
