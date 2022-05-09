const triangleVertices = new Float32Array([
    //x,y,z
    -0.5, -0.5, 0.0, 
    0.5, -0.5, 0.0, 
    0.0, 0.5, 0.0, 
]);

const r = 0.25;

const box= new Float32Array([
    //x,y,z,     r, g, b
    -r, r, r, ...red,
    -r, -r, r, ...red,
    r, -r, r, ...red, 
    r, r, r, ...red,
    -r, r, r, ...red,
    r, -r, r, ...red,

    r, r, r, ...green,
    r, -r, r, ...green,
    r, r, -r, ...green,
    r, -r, r, ...green,
    r, r, -r, ...green,
    r, -r, -r, ...green,

    -r, r, -r, ...violet,
    -r, -r, -r, ...violet,
    r, -r, -r, ...violet,
    r, r, -r, ...violet,
    -r, r, -r, ...violet,
    r, -r, -r, ...violet,

    -r, r, r, ...yellow,
    -r, -r, r, ...yellow,
    -r, r, -r, ...yellow,
    -r, -r, r, ...yellow,
    -r, r, -r, ...yellow,
    -r, -r, -r, ...yellow,

    -r, -r, r, ...blue,
    r, -r, r, ...blue,
    -r, -r, -r, ...blue,
    -r, -r, -r, ...blue,
    r, -r, -r, ...blue,
    r, -r, r, ...blue,

    -r, r, r, ...cyan,
    r, r, r, ...cyan,
    -r, r, -r, ...cyan,
    -r, r, -r, ...cyan,
    r, r, -r, ...cyan,
    r, r, r, ...cyan,
]);    