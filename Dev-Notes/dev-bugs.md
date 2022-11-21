# Bugs and Fixes while Developing
## npm
### 1. node-sass (gyp) error/not working on OSX (M1 chip) machine
fix: downgrade node to 14.15.0 (or a similar old version)

## primeVue

### 1. primeVue is not installed!
fix: This problem is usually caused by not having primeVue installed in the machine. So in a new or newly cloned primeVue project, before running ``` pnpm install ```, run the following 2 commands first:```npm install primevue@^3 --save``` and ```npm install primeicons --save``` , to make sure primeVue is installed locally.