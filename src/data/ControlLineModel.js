// All of our control lines will go in here
const controlLineModel = {
  halt: false, // Stop the clock
  programCounterEnabled: false, // Increment PC
  programCounterOut: false, // Write PC to bus

  memoryAddressRegisterReadFromBus: false, // Read MAR from bus
  memoryAddressRegisterIncrement: true, // Increment on clockhigh
  writeMemoryContentsToBus: false,
  readMemoryContentsFromBus: false,
};

export default controlLineModel;
