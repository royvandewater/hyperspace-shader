#version 300 es
precision mediump float;

out vec4 outColor;

void main () {
  // outColor = vec4(gl_FragCoord.xyz, 1.0);

  // float alpha = ((gl_FragCoord.z + 2.0) / 10.0);

  float f = 0.8;
  float alpha = f - (f * ((gl_FragCoord.z + 2.0) / 12.0));
  // float alpha = 1.0;
  outColor = vec4(alpha, alpha, alpha, alpha);
}
