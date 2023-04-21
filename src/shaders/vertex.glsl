#version 300 es
precision mediump float;

in vec3 inPosition;

uniform mat4 viewProjection;
uniform float speed;

out vec3 outPosition;
out vec3 vPosition;

void main() {
    float baseSize = 2.0;
    gl_PointSize = baseSize - (baseSize * ((inPosition.z + 2.0) / 12.0));
    gl_Position = vec4(inPosition.xyz, 1.0) * viewProjection;
    vPosition = vec3(inPosition.xyz);

    outPosition = inPosition;
    outPosition.z -= speed;

    if (outPosition.z < -2.0) {
        outPosition.z = 10.0;
    }
}