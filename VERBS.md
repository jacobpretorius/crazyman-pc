# VERBS
---
VERBS are action words our computer can perform, written in our assembly language.

Format:
*VERB* - Description of what it does
Binary value (shown in display flipped format)

---

NOP - Nothing to do here
0000

FETCH - Increment PC and load it to RAM
automatically done by Control Logic first two steps

LDA MemLoc - Load contents of memloc to A register
0001

LDB MemLoc - Load contents of memloc to B register
0011

ADD - Add the contents of register B to register A
0010

JMP - set PC to execute the next memloc
0110

OUT - Print the contents of register A to the console
1110

HLT - Stops the CPU
1111
