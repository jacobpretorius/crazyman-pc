// All of our control lines will go in here
const controlLineModel = {
  // CLOCK
  halt: false, // Stop the clock
  pcReset: false, // Clear everything

  // PROGRAM COUNTER
  pcEnabled: true, // Increment PC on CLOCKHI
  pcWriteCounterToBus: false, // Write PC to bus
  pcReadFromBus: false, // Used to JUMP

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
  aluSubtractionEnabled: false, // false = addition mode
  aluWriteResultToBus: false, // write calc result to bus

  // CONTROL LOGIC
  clReadInstructionRegisterFromBus: false,
  clWriteInstructionRegisterToBus: false,

  // DECIMAL OUTPUT
  doUpdateFromBus: false, // Read DO from bus
};

export default controlLineModel;
