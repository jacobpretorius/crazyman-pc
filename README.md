# Crazyman-CPU

The idea here is to build a bitwise CPU simulation essentially modelled on the fantastic breadboard cpu video series by [Ben Eater on Youtube](https://www.youtube.com/watch?v=HyznrdDSSGM&list=PLowKtXNTBypGqImE405J2565dvjafglHU). 

Long term we could take that CPU simulation to the next level by adding in control logic/lookup logic from this 6502 NES (and therefore CPU) simulation by [Onelonecoder on Youtube](https://www.youtube.com/watch?v=8XmxKPJDGU0). 

Basically all the difficult CPU simulation problems has been done for us and we need to duplicate their efforts in JS/Vue/Vuex.

You can see it running here https://crazyman-cpu.netlify.com/

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

PS: The stylelint/prettier linting is well broken. Please PR and help me out they really don't like scss and Tailwind being combined even though I do for learning reasons.