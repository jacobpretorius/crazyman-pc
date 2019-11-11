// VERBS
// --------------

// FETCH - Increment PC and load it to RAM
// 0000

// LDA MemLoc - Load contents of memloc to A register
// 0001

// LDB MemLoc - Load contents of memloc to B register
// 0011

// ADD MemLOC - Add the contents of Memloc to register A
// 0010

// OUT - Print the contents of register A to the console
// 1110

// HALT - Stops the CPU
// 1111

// We use the base 10 number as lookup index for the verbs
const CL_OPERATIONS = [
  // Fetch
  {
    0: [0,1,1,1,0,0,0,0,0,0,0], // Incr PC
    1: [0,0,0,0,0,1,0,0,0,0,1], // Load new PC to RAM MAR
  },

  // LDA
  {
    2: [0,0,0,0,0,0,0,0,0,0,0], // 
    3: [0,0,0,0,0,0,0,0,0,0,0], // 
    4: [0,0,0,0,0,0,0,0,0,0,0], // 
  },

  {},
  [],
  [],
  [],
  [],
];

export default CL_OPERATIONS;
