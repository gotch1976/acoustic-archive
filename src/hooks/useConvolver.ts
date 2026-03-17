import { useRef, useState, useCallback, useEffect } from "react";

interface AudioGraph {
  ctx: AudioContext;
  convolver: ConvolverNode;
  dryGain: GainNode;
  wetGain: GainNode;
  inputGain: GainNode;
}

export function useConvolver() {
  const graphRef = useRef<AudioGraph | null>(null);
  const sourceRef = useRef<AudioNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const bufferSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const sampleBufferRef = useRef<AudioBuffer | null>(null);

  const [irLoaded, setIrLoaded] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [samplePlaying, setSamplePlaying] = useState(false);
  const [wetDry, setWetDry] = useState(0.20);
  const [currentIr, setCurrentIr] = useState<string>("");

  const ensureGraph = useCallback((): AudioGraph => {
    if (graphRef.current) return graphRef.current;

    const ctx = new AudioContext();
    const convolver = ctx.createConvolver();
    const dryGain = ctx.createGain();
    const wetGain = ctx.createGain();
    const inputGain = ctx.createGain();

    dryGain.gain.value = 0.80;
    wetGain.gain.value = 0.20;

    inputGain.connect(dryGain);
    inputGain.connect(convolver);
    convolver.connect(wetGain);
    dryGain.connect(ctx.destination);
    wetGain.connect(ctx.destination);

    const graph = { ctx, convolver, dryGain, wetGain, inputGain };
    graphRef.current = graph;
    return graph;
  }, []);

  const disconnectSource = useCallback(() => {
    if (sourceRef.current) {
      try { sourceRef.current.disconnect(); } catch {}
      sourceRef.current = null;
    }
  }, []);

  const loadIR = useCallback(
    async (url: string) => {
      const graph = ensureGraph();
      if (graph.ctx.state === "suspended") await graph.ctx.resume();

      const res = await fetch(url);
      const arrayBuf = await res.arrayBuffer();
      const audioBuf = await graph.ctx.decodeAudioData(arrayBuf);

      graph.convolver.buffer = audioBuf;
      setIrLoaded(true);
      setCurrentIr(url);
    },
    [ensureGraph]
  );

  const startMic = useCallback(async () => {
    const graph = ensureGraph();
    if (graph.ctx.state === "suspended") await graph.ctx.resume();

    // Stop any playing sample
    if (bufferSourceRef.current) {
      try { bufferSourceRef.current.stop(); } catch {}
      bufferSourceRef.current = null;
    }
    disconnectSource();
    setSamplePlaying(false);

    // Stop existing mic
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: false,
        autoGainControl: false,
      },
    });
    streamRef.current = stream;
    const micSource = graph.ctx.createMediaStreamSource(stream);
    micSource.connect(graph.inputGain);
    sourceRef.current = micSource;
    setMicActive(true);
  }, [ensureGraph, disconnectSource]);

  const stopMic = useCallback(() => {
    disconnectSource();
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setMicActive(false);
  }, [disconnectSource]);

  const loadSample = useCallback(
    async (url: string) => {
      const graph = ensureGraph();
      const res = await fetch(url);
      const arrayBuf = await res.arrayBuffer();
      sampleBufferRef.current = await graph.ctx.decodeAudioData(arrayBuf);
    },
    [ensureGraph]
  );

  const playSample = useCallback(async () => {
    const graph = ensureGraph();
    if (graph.ctx.state === "suspended") await graph.ctx.resume();
    if (!sampleBufferRef.current) return;

    // Stop mic
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setMicActive(false);

    // Stop previous source
    if (bufferSourceRef.current) {
      try { bufferSourceRef.current.stop(); } catch {}
    }
    disconnectSource();

    const bufSrc = graph.ctx.createBufferSource();
    bufSrc.buffer = sampleBufferRef.current;
    bufSrc.loop = false;
    bufferSourceRef.current = bufSrc;
    bufSrc.connect(graph.inputGain);
    sourceRef.current = bufSrc;
    bufSrc.start();
    setSamplePlaying(true);

    bufSrc.onended = () => {
      setSamplePlaying(false);
    };
  }, [ensureGraph, disconnectSource]);

  const stopSample = useCallback(() => {
    if (bufferSourceRef.current) {
      try { bufferSourceRef.current.stop(); } catch {}
      bufferSourceRef.current = null;
    }
    disconnectSource();
    setSamplePlaying(false);
  }, [disconnectSource]);

  useEffect(() => {
    if (graphRef.current) {
      graphRef.current.dryGain.gain.value = 1 - wetDry;
      graphRef.current.wetGain.gain.value = wetDry;
    }
  }, [wetDry]);

  const cleanup = useCallback(() => {
    if (bufferSourceRef.current) {
      try { bufferSourceRef.current.stop(); } catch {}
      bufferSourceRef.current = null;
    }
    disconnectSource();
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (graphRef.current) {
      graphRef.current.ctx.close();
      graphRef.current = null;
    }
  }, [disconnectSource]);

  return {
    irLoaded,
    micActive,
    samplePlaying,
    wetDry,
    currentIr,
    loadIR,
    startMic,
    stopMic,
    loadSample,
    playSample,
    stopSample,
    setWetDry,
    cleanup,
  };
}
