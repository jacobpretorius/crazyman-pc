// All of our control lines will go in here
const controlLineModel = {
  // CLOCK
  halt: false, // Stop the clock

  // PROGRAM COUNTER
  programCounterEnabled: false, // Increment PC
  pcWriteCounterToBus: false, // Write PC to bus

  // RAM
  ramMemoryAddressRegisterReadFromBus: false, // Read MAR from bus
  ramMemoryAddressRegisterIncrement: true, // Increment on clockhigh
  ramWriteMemoryContentsToBus: false, // TODO
  ramReadMemoryContentsFromBus: false, // TODO

  // ALU
  aluEnabled: false,
  aluSubtractionEnabled: false, // false = addition mode
  aluWriteResultToBus: false, // write calc result to bus

};

export default controlLineModel;
