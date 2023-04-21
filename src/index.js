import * as twgl from 'https://cdn.jsdelivr.net/gh/greggman/twgl.js/dist/5.x/twgl-full.module.js'
import { generateStarfield } from './generateStarfield.js'

/**
 * @param {string} url 
 * @returns {Promise<string>}
 */
const fetchText = async (url) => (await fetch(url)).text();

/**
 * 
 * @param {WebGL2RenderingContext} gl 
 */
const _cleanup = (gl) => {
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindBuffer(gl.TRANSFORM_FEEDBACK_BUFFER, null);
  gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, null);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.bindTexture(gl.TEXTURE_2D, null);
  gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);
  gl.bindVertexArray(null);
  gl.disable(gl.RASTERIZER_DISCARD);
}

/**
 * @param {WebGL2RenderingContext} gl 
 */
const genMatrix = (gl) => {
  const fov = 30 * Math.PI / 180;
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.01;
  const zFar = 10;
  const projection = twgl.m4.perspective(fov, aspect, zNear, zFar);
  const eye = [0, 0, -20];
  const target = [0, 0, 6];
  const up = [0, 1, 0];

  const camera = twgl.m4.lookAt(eye, target, up);
  const view = twgl.m4.inverse(camera);
  const viewProjection = twgl.m4.multiply(projection, view);

  return { viewProjection }
}

/**
 * 
 * @param {{gl: WebGL2RenderingContext, programInfo: any, bufferInfo: any}} bundle 
 */
const render = (bundle) => {
  const { gl, programInfo, bufferInfo, transformFeedback } = bundle;

  twgl.resizeCanvasToDisplaySize(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  gl.useProgram(programInfo.program);
  twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);

  const { viewProjection } = genMatrix(gl);
  twgl.setUniforms(programInfo, { viewProjection, speed: window.speed || 0.1 })

  twgl.bindTransformFeedbackInfo(gl, programInfo.transformFeedbackInfo, bufferInfo);
  gl.beginTransformFeedback(gl.POINTS);
  gl.drawArrays(gl.POINTS, 0, bufferInfo.numElements);
  gl.endTransformFeedback();
  [bufferInfo.attribs.inPosition, bufferInfo.attribs.outPosition] = [bufferInfo.attribs.outPosition, bufferInfo.attribs.inPosition];

  requestAnimationFrame(() => render(bundle));
}

const main = async () => {
  const canvas = document.querySelector('#canvas');
  const gl = canvas.getContext('webgl2');

  const vertexShader = await fetchText('./src/shaders/vertex.glsl');
  const fragmentShader = await fetchText('./src/shaders/fragment.glsl');
  const programInfo = twgl.createProgramInfo(gl, [vertexShader, fragmentShader], { transformFeedbackVaryings: ['outPosition'] });
  const starField = generateStarfield(10000);
  const bufferInfo = twgl.createBufferInfoFromArrays(gl, {
    inPosition: starField,
    outPosition: Array(starField.length).fill(0),
  });
  const transformFeedback = twgl.createTransformFeedback(gl, programInfo, bufferInfo);


  render({ gl, programInfo, bufferInfo, transformFeedback })
}

main();