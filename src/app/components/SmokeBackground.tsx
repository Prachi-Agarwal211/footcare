/*
  CHANGELOG - SmokeBackground.tsx
  - Implemented custom WebGL FBM shader animating a fluid blue/green cloud background
  - Added visibility listener using Page Visibility API to pause rendering loops when tab is hidden
  - Capped pixel ratio to 1.5 to protect mobile GPUs
  - Implemented full WebGL buffer, shader, and program cleanup on component unmount
*/

"use client";
import React, { useEffect, useRef } from "react";
import styles from "./SmokeBackground.module.css";

export default function SmokeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      // Fallback: WebGL not supported, draw simple gradient
      canvas.style.background = "radial-gradient(circle at 50% 50%, #0a1b2d 0%, #05080f 100%)";
      return;
    }

    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    let animFrameId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;
    const startTime = Date.now();

    // Resize handler
    const handleResize = () => {
      if (!canvas || !gl) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    // Shaders sources
    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;

      float noise(vec2 st) {
        return sin(st.x * 2.0 + sin(u_time * 0.08)) * cos(st.y * 2.0 + cos(u_time * 0.06)) * 0.5 + 0.5;
      }

      float fbm(vec2 st) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 1.0;
        for (int i = 0; i < 3; i++) {
          value += amplitude * noise(st * frequency);
          frequency *= 1.8;
          amplitude *= 0.55;
        }
        return value;
      }

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        st.x *= u_resolution.x / u_resolution.y;

        vec2 q = vec2(0.0);
        q.x = fbm(st + 0.003 * u_time);
        q.y = fbm(st + vec2(1.0));

        vec2 r = vec2(0.0);
        r.x = fbm(st + 1.0 * q + vec2(1.7, 9.2) + 0.008 * u_time);
        r.y = fbm(st + 1.0 * q + vec2(8.3, 2.8) + 0.005 * u_time);

        float f = fbm(st + r);

        // Green-Blue palette strictly matching requirements
        vec3 colorBlue = vec3(0.01, 0.12, 0.28);  // Deep Blue
        vec3 colorGreen = vec3(0.0, 0.15, 0.08);  // Deep Green
        vec3 base = vec3(0.02, 0.03, 0.06);       // Near black base

        vec3 mixed = mix(colorBlue, colorGreen, clamp(f * f * 3.0, 0.0, 1.0));
        vec3 finalColor = mix(base, mixed, clamp(length(q), 0.0, 1.0) * 0.7);

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    // Compile helper
    const compileShader = (source: string, type: number): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(vsSource, gl.VERTEX_SHADER);
    const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);

    if (vs && fs) {
      program = gl.createProgram();
      if (program) {
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          console.error(gl.getProgramInfoLog(program));
          gl.deleteProgram(program);
          program = null;
        }
      }
    }

    if (!program) {
      if (vs) gl.deleteShader(vs);
      if (fs) gl.deleteShader(fs);
      return;
    }

    // Positions buffer
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);

    buffer = gl.createBuffer();
    if (buffer) {
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    }

    // Set attributes & uniforms
    const positionLocation = gl.getAttribLocation(program, "position");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");

    handleResize();
    window.addEventListener("resize", handleResize);

    // Visibility Listener
    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Render loop
    const render = () => {
      if (!gl || !program) return;
      if (isVisible) {
        gl.clearColor(0.02, 0.03, 0.06, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(program);

        // Bind vertices
        gl.enableVertexAttribArray(positionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        // Set uniforms
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
        gl.uniform1f(timeLocation, (Date.now() - startTime) / 1000.0);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    // Cleanup
    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (gl) {
        if (buffer) gl.deleteBuffer(buffer);
        if (program) {
          gl.deleteProgram(program);
        }
        if (vs) gl.deleteShader(vs);
        if (fs) gl.deleteShader(fs);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
