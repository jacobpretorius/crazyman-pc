# VERBS
---
VERBS are action words our computer can perform, written in our assembly language.

Format:
Binary value (shown in "display flipped" format with least significant bit last)
*VERB MemoryLocation* (if it has a MemLoc)
Description of what it does/

---
*FETCH*
Increment PC and load it to RAM - Automatically done by the Control Logic on the first two steps of all execution.

0000
*NOP*
Nothing to do here.

0001
*LDA MemLoc*
Load contents of memory location to A register.

0010
*ADD MemLoc*
Add contents of A register to contents of B register. Store result in A register.

0011
*SUB MemLoc*
Subtract the value in B register from A register. Store result in A register.

0100
*STA MemLoc*
Store the contents of A register at the given memory location.

0101
*LDI Value*
Set the A register directly to the given value.

0110
*JMP MemLoc*
Jump execution to the given memory address.

0111
*JPC MemLoc*
Jump execution to the given memory address if the CARRY flag is set.

1000
*JPZ MemLoc*
Jump execution to the given memory address if the ZERO flag is set.

1001
*LDB MemLoc*
Load contents of memory location to B register.

1110
*OUT*
Print the contents of A register to the display & console.

1111
*HLT*
Stops the CPU.
