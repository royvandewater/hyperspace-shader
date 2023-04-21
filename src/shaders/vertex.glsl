#version 300 es
precision mediump float;

in vec3 inPosition;
uniform mat4 viewProjection;
out vec3 outPosition;

void main() {
    gl_PointSize = 3.0 - (3.0 * ((inPosition.z + 2.0) / 12.0));
    gl_Position = vec4(inPosition.xyz, 1.0) * viewProjection;

    outPosition = inPosition;
    // outPosition.z = 1.5;
    outPosition.z -= 0.03;

    if (outPosition.z < -2.0) {
        outPosition.z = 10.0;
    }
}