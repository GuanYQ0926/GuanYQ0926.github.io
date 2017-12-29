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

AFRAME.registerComponent('sky-view', {
    schema: {
        inclination: {default: 1.5},
        azimuth: {default: 0.25},
        distance: {default: 400000},
        sunspeed: {default: 0.00001}
    },
    init: function() {
        const theta = Math.PI*(this.data.inclination-0.5)
        const phi = 2*Math.PI*(this.data.azimuth-0.5)
        this.el.setAttribute('material', 'sunPosition', {
            x: this.data.distance*Math.cos(phi),
            y: this.data.distance*Math.sin(phi)*Math.sin(theta),
            z: -this.data.distance*Math.sin(phi)*Math.cos(theta)
        })
    },
    tick: function(time, timeDelta) {
        const d = timeDelta*this.data.sunspeed
        this.data.inclination += d
        const theta = Math.PI*(this.data.inclination-0.5)
        const phi = 2*Math.PI*(this.data.azimuth-0.5)
        this.el.setAttribute('material', 'sunPosition', {
            x: this.data.distance*Math.cos(phi),
            y: this.data.distance*Math.sin(phi)*Math.sin(theta),
            z: -this.data.distance*Math.sin(phi)*Math.cos(theta)
        })
    }
})
