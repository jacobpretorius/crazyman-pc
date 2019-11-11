// All of our control lines will go in here
const controlLineModel = {
  // CLOCK
  halt: false, // Stop the clock

  // PROGRAM COUNTER
  programCounterEnabled: true, // Increment PC on CLOCKHI
  pcWriteCounterToBus: false, // Write PC to bus

  // REGISTERS
  regAWriteToBus: false,
  regAReadContentsFromBus: false,
  regBWriteToBus: false,
  regBReadContentsFromBus: false,

  // RAM
  ramMemoryAddressRegisterReadFromBus: false, // Read MAR from bus
  ramWriteMemoryContentsToBus: false,
  ramReadMemoryContentsFromBus: false,

  // ALU
  aluEnabled: false,
  aluSubtractionEnabled: false, // false = addition mode
  aluWriteResultToBus: false, // write calc result to bus

  // CONTROL LOGIC
  clReadInstructionRegisterFromBus: false,
  clWriteInstructionRegisterToBus: false,
};

export default controlLineModel;
