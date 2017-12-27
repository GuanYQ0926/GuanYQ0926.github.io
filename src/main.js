import AFRAME from 'aframe'


const vert_shader = require('./glsl/sky.vert')
const frag_shader = require('./glsl/sky.frag')

AFRAME.registerShader('sky-shaders', {
    schema: {
        luminance: {default: 1, is: 'uniform'},
        mieCoefficient: {default: 0.005, is: 'uniform'},
        mieDirectionalG: {default: 0.8, is: 'uniform'},
        rayleigh: {default: 1, is: 'uniform'},
        sunPosition: {type: 'vec3', default: '0 0 -1', is: 'uniform'},
        turbidity: {default: 2, is: 'uniform'}
    },
    vertexShader: vert_shader,
    fragmentShader: frag_shader,
})
