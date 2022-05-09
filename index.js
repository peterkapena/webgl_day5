const gl = document.querySelector("canvas").getContext("webgl");

if (!gl) {
  throw new Error("WebGL not available/supported");
}

gl.clearColor(0, 0, 0, 0.25);
gl.clear(gl.COLOR_BUFFER_BIT);

const vertexShaderSrc = `
attribute vec3 pos;
attribute vec4 colours;
varying vec4 vcolours;
uniform float angle;
uniform float y;
uniform float x;
uniform mat4 model;

  void main(){
    //Along the z axis
    // gl_Position.x = cos(angle) * pos.x - sin(angle) * pos.y;
    // gl_Position.y = sin(angle) * pos.x + cos(angle) * pos.y;
    // gl_Position.z = pos.z;

    //Along the x axis
    // gl_Position.x = cos(0.051) * pos.x - sin(0.051) * pos.y;//pos.x;
    // gl_Position.y = cos(angle) * pos.y - sin(angle) * pos.z;
    // gl_Position.z = sin(angle) * pos.y + cos(angle) * pos.z;

    //Along the y axis
    // gl_Position.x = cos(angle) * pos.x - sin(angle) * pos.z;
    // gl_Position.y = pos.y + y;
    // gl_Position.z = sin(angle) * pos.y + cos(angle) * pos.y;

      // gl_Position.w = 1.0;

      gl_Position = model * vec4(pos, 1.0) + vec4(x, y, 0, 0);
      vcolours = colours;
  }`;

const fragmentShaderSrc = `
precision mediump float;
varying vec4 vcolours;

    void main(){
        gl_FragColor = vec4(vcolours);    // red
    }`;

const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSrc, gl);
const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSrc, gl);

const program = setProgram(gl, vertexShader, fragmentShader);

setBuffer(gl, box);

const positionLocation = gl.getAttribLocation(program, "pos");
gl.enableVertexAttribArray(positionLocation);
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 7 * 4, 0);

const coloursLocation = gl.getAttribLocation(program, "colours");
gl.enableVertexAttribArray(coloursLocation);
gl.vertexAttribPointer(coloursLocation, 3, gl.FLOAT, false, 7 * 4, 3 * 4);

gl.useProgram(program);

let x1 = 0,
  y1 = 0,
  x2 = 0,
  y2 = 0.7;

const incr = 0.025;

let model = createIdentityMat4();

draw();

function draw() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.uniformMatrix4fv(gl.getUniformLocation(program, "model"), false, model);
  gl.uniform1f(gl.getUniformLocation(program, "y"), y1);
  gl.uniform1f(gl.getUniformLocation(program, "x"), x1);

  gl.drawArrays(gl.TRIANGLES, 0, box.length / 7);
  // gl.uniformMatrix4fv(gl.getUniformLocation(program, "model"), false, model);

  gl.uniform1f(gl.getUniformLocation(program, "y"), y2);
  gl.uniform1f(gl.getUniformLocation(program, "x"), x2);
  gl.drawArrays(gl.TRIANGLES, 0, box.length / 7);

  requestAnimationFrame(draw);
}

document.onkeydown = (event) => {
  switch (event.key) {
    case "ArrowDown":
      if (y1 > -0.779) y1 -= incr;
      break;
    case "ArrowUp":
      if (y1 < 0.779) y1 += incr;
      break;
    case "ArrowLeft":
      if (x1 > -0.779) x1 -= incr;
      break;
    case "ArrowRight":
      if (x1 < 0.779) x1 += incr;
      break;
  }
};

const inputSpeed = document.getElementById("inputSpeed");
inputSpeed.value = 45;
document.getElementById("spnSpeed").innerHTML =
  inputSpeed.value * (Math.PI / 180);
  
document.querySelectorAll("button").forEach((element) => {
  element.onclick = () => {
    let radians = Math.PI / 8;
    switch (element.dataset.rotation) {
      case "x":
        model = rotate(model, rotateX(radians));
        break;
      case "y":
        model = rotate(model, rotateY(radians));
        break;
      case "z":
        model = rotate(model, rotateZ(radians));
        break;
    }

    radians = convertToRad(inputSpeed.value);

    switch (element.dataset.spinning) {
      case "x":
        model = rotate(model, rotateX(radians));
        break;
      case "y":
        model = rotate(model, rotateY(radians));
        break;
      case "z":
        model = rotate(model, rotateZ(radians));
        break;
    }
  };
});

inputSpeed.oninput = (event) => {
  document.getElementById("spnSpeed").innerHTML =
    event.target.value * (Math.PI / 180);
  console.log(event.target.value);
};

function convertToRad(degrees) {
  return degrees * (Math.PI / 180);
}
