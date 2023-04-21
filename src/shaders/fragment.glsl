#version 300 es
precision mediump float;

in vec3 vPosition;
out vec4 outColor;

void main () {
  // outColor = vec4(gl_FragCoord.xyz, 1.0);

  // float alpha = ((gl_FragCoord.z + 2.0) / 10.0);

  float dist = vPosition.z + 2.0; // a value between 0 & 12
  float distSquared = dist * dist; // a value between 0 & 144
  float distNormalized = distSquared / 144.0; // a value between 0 & 1

  float alpha = 1.0 - distNormalized;
  outColor = vec4(alpha, alpha, alpha, alpha);
}
