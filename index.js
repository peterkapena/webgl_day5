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

let x1 = 0;
let y1 = 0.7;

let isSpinning = false;

const incr = 0.025;

let model1 = translate(x1, y1, 0);
let model2 = createIdentityMat4();
let spinner = null;
const inputSpeed = document.getElementById("inputSpeed");
inputSpeed.value = 30;

draw();

function draw() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.uniformMatrix4fv(gl.getUniformLocation(program, "model"), false, model1);
  gl.drawArrays(gl.TRIANGLES, 0, box.length / 7);

  gl.uniformMatrix4fv(gl.getUniformLocation(program, "model"), false, model2);
  gl.uniform1f(gl.getUniformLocation(program, "y"), -0.25);
  gl.uniform1f(gl.getUniformLocation(program, "x"), 0);
  gl.drawArrays(gl.TRIANGLES, 0, box.length / 7);

  requestAnimationFrame(draw);
}

document.onkeydown = (event) => {
  switch (event.key) {
    case "ArrowDown":
      y1 -= incr;
      break;
    case "ArrowUp":
      y1 += incr;
      break;
    case "ArrowLeft":
      x1 -= incr;
      break;
    case "ArrowRight":
      x1 += incr;
      break;
  }
  model1 = translate(x1, y1, 0);
};


document.getElementById("spnSpeed").innerHTML =
  inputSpeed.value * (Math.PI / 180);

document.querySelectorAll("button").forEach((element) => {
  element.onclick = () => {
    if (element.dataset.rotation)
      rotation(element.dataset.rotation, Math.PI / 8);

    if (element.dataset.spinning) spin(element.dataset.spinning);
  };
});

inputSpeed.oninput = (event) => {
  document.getElementById("spnSpeed").innerHTML =
    event.target.value * (Math.PI / 180);
  console.log(event.target.value);
};

function rotation(axis, radians) {
  switch (axis) {
    case "x":
      model2 = rotate(model2, rotateX(radians));
      break;
    case "y":
      model2 = rotate(model2, rotateY(radians));
      break;
    case "z":
      model2 = rotate(model2, rotateZ(radians));
      break;
  }
}

function spin(axis) {
  let radians = convertToRad(inputSpeed.value);
  isSpinning = !isSpinning;
  if (isSpinning) {
    spinner = setInterval(() => {
      radians = convertToRad(inputSpeed.value);
      console.log("spinning");
      switch (axis) {
        case "x":
          model2 = rotate(model2, rotateX(radians));
          break;
        case "y":
          model2 = rotate(model2, rotateY(radians));
          break;
        case "z":
          model2 = rotate(model2, rotateZ(radians));
          break;
      }
    }, 150);
  } else {
    clearInterval(spinner);
  }
}

function convertToRad(degrees) {
  return degrees * (Math.PI / 180);
}
