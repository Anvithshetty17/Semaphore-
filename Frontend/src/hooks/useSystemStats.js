// Lightweight client-side hook to approximate system CPU & memory usage.
// NOTE: Browsers do NOT expose true system-wide CPU usage. We approximate
// by using recent frame times (higher average frame time => higher load).
// Memory stats rely on the non‑standard Chrome-only performance.memory API.
// Gracefully falls back to 'unsupported' when unavailable.

import { useEffect, useRef, useState } from "react";

export function useSystemStats(options = {}) {
  const {
    frameSampleSize = 60, // number of frames kept in rolling window
    updateIntervalMs = 2000, // how often we emit an updated CPU percentage
    memoryPollIntervalMs = 4000,
  } = options;

  const frameTimesRef = useRef([]);
  const lastTimeRef = useRef(typeof performance !== "undefined" ? performance.now() : 0);
  const rafIdRef = useRef();
  const cpuTimerRef = useRef();
  const memTimerRef = useRef();

  const [cpuPercent, setCpuPercent] = useState(null); // interpreted render load %
  const [fps, setFps] = useState(null);
  const [memoryPercent, setMemoryPercent] = useState(null);
  const [usedHeapMB, setUsedHeapMB] = useState(null);
  const [heapLimitMB, setHeapLimitMB] = useState(null);
  const [deviceMemoryGB, setDeviceMemoryGB] = useState(null);

  // Frame loop for CPU approximation
  useEffect(() => {
    if (typeof window === "undefined") return;

    let frameCounter = 0;
    let fpsTimer = (t) => t; // placeholder
    let lastFpsCalc = performance.now();

    // For smoothing average frame time (EMA)
    let emaFrame = null;
    const alpha = 0.85; // higher -> smoother

    const loop = (t) => {
      const dt = t - lastTimeRef.current;
      lastTimeRef.current = t;
      if (dt > 0 && dt < 500) {
        // exponential smoothing
        emaFrame = emaFrame == null ? dt : alpha * emaFrame + (1 - alpha) * dt;
        frameTimesRef.current.push(emaFrame);
        if (frameTimesRef.current.length > frameSampleSize) frameTimesRef.current.shift();
      }
      frameCounter++;
      if (t - lastFpsCalc >= 1000) {
        setFps(frameCounter);
        frameCounter = 0;
        lastFpsCalc = t;
      }
      rafIdRef.current = requestAnimationFrame(loop);
    };
    rafIdRef.current = requestAnimationFrame(loop);

    cpuTimerRef.current = setInterval(() => {
      const samples = frameTimesRef.current;
      if (!samples.length) return;
      const avg = samples.reduce((a, b) => a + b, 0) / samples.length; // smoothed ms
      // Baseline ~16ms for 60fps. We'll treat 16ms as ~10% load (idle) and 55ms+ (~18fps) as 100%.
      const baseline = 16;
      const max = 55;
      let load = ((avg - baseline) / (max - baseline)) * 100;
      load = Math.min(100, Math.max(0, load));
      if (load < 8 && avg > 0) load = load * 0.5 + 8; // floor + dampen
      setCpuPercent(parseFloat(load.toFixed(1)));
    }, updateIntervalMs);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (cpuTimerRef.current) clearInterval(cpuTimerRef.current);
    };
  }, [frameSampleSize, updateIntervalMs]);

  // Memory polling
  useEffect(() => {
    if (typeof window === "undefined") return;
    setDeviceMemoryGB(typeof navigator !== "undefined" ? navigator.deviceMemory || null : null);

    const pollMemory = () => {
      const perf = typeof performance !== "undefined" ? performance : null;
      const mem = perf && perf.memory ? perf.memory : null; // Chrome only
      if (mem) {
        const used = mem.usedJSHeapSize; // bytes
        const limit = mem.jsHeapSizeLimit; // bytes
        if (limit > 0) {
          const percent = (used / limit) * 100;
          setMemoryPercent(parseFloat(percent.toFixed(1)));
          setUsedHeapMB(parseFloat((used / 1024 / 1024).toFixed(1)));
          setHeapLimitMB(parseFloat((limit / 1024 / 1024).toFixed(0)));
        }
      } else {
        setMemoryPercent(null);
      }
    };

    pollMemory();
    memTimerRef.current = setInterval(pollMemory, memoryPollIntervalMs);
    return () => {
      if (memTimerRef.current) clearInterval(memTimerRef.current);
    };
  }, [memoryPollIntervalMs]);

  return {
    cpuPercent, // null if not yet computed (render load approximation)
    fps,
    memoryPercent, // null if unsupported
    usedHeapMB,
    heapLimitMB,
    deviceMemoryGB,
    supported: { memory: memoryPercent !== null, cpu: cpuPercent !== null },
  };
}

export default useSystemStats;
