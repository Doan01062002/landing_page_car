// Web Audio API Supercar Acoustic Engine for APEX Studio
// Generates authentic high-performance engine acoustic notes (Flat-6 & Twin-Turbo V8)

class EngineAudioSystem {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.oscillators = [];
    this.gainNode = null;
    this.revInterval = null;
    this.stopTimeout = null;
    this.pendingStopOscs = [];
    this.pendingGain = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  start(type = 'flat6') {
    this.init();
    if (!this.ctx) return;

    // Clear any pending stop timeout from previous car fade-out
    if (this.stopTimeout) {
      clearTimeout(this.stopTimeout);
      this.stopTimeout = null;
    }

    // Immediately stop and disconnect pending oscillators from previous stop() so they never leak
    if (this.pendingStopOscs.length > 0) {
      this.pendingStopOscs.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {}
      });
      this.pendingStopOscs = [];
    }
    if (this.pendingGain) {
      try {
        this.pendingGain.disconnect();
      } catch {}
      this.pendingGain = null;
    }

    // Immediately stop existing oscillators if still active
    if (this.oscillators.length > 0) {
      this.oscillators.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {}
      });
      this.oscillators = [];
    }

    if (this.revInterval) {
      clearInterval(this.revInterval);
      this.revInterval = null;
    }

    this.isPlaying = true;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Master volume gain
    this.gainNode = ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.001, now);
    this.gainNode.gain.exponentialRampToValueAtTime(0.12, now + 0.35);
    this.gainNode.connect(ctx.destination);

    // Fundamental Engine Frequencies
    const baseFreq = type === 'v8' ? 65 : 78;

    // 1. Primary Crankshaft Sawtooth Oscillator
    const osc1 = ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(baseFreq, now);

    // 2. Harmonic Cylinder Pulse Oscillator
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(baseFreq * 2, now);

    // 3. Sub-bass Exhaust Rumble Oscillator
    const oscSub = ctx.createOscillator();
    oscSub.type = 'sine';
    oscSub.frequency.setValueAtTime(baseFreq / 2, now);

    // Filter stage: Exhaust resonance
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, now);
    filter.Q.setValueAtTime(4, now);

    // Subtle distortion / saturation for raw racecar growl
    const shaper = ctx.createWaveShaper();
    shaper.curve = this.makeDistortionCurve(15);
    shaper.oversample = '4x';

    osc1.connect(shaper);
    osc2.connect(shaper);
    oscSub.connect(filter);
    shaper.connect(filter);
    filter.connect(this.gainNode);

    osc1.start(now);
    osc2.start(now);
    oscSub.start(now);

    this.oscillators = [osc1, osc2, oscSub];

    // Periodic dynamic revving pattern (idle -> rev surge -> burble)
    this.revInterval = setInterval(() => {
      if (!this.isPlaying || !this.ctx) return;
      const t = this.ctx.currentTime;
      const revTarget = baseFreq * (1.3 + Math.random() * 0.8);
      osc1.frequency.cancelScheduledValues(t);
      osc2.frequency.cancelScheduledValues(t);
      filter.frequency.cancelScheduledValues(t);

      // Anchor current values at t to ensure smooth glitch-free exponential ramps
      const v1 = Math.max(0.001, osc1.frequency.value || baseFreq);
      const v2 = Math.max(0.001, osc2.frequency.value || baseFreq * 2);
      const vf = Math.max(0.001, filter.frequency.value || 450);
      osc1.frequency.setValueAtTime(v1, t);
      osc2.frequency.setValueAtTime(v2, t);
      filter.frequency.setValueAtTime(vf, t);

      // Rev up
      osc1.frequency.exponentialRampToValueAtTime(revTarget, t + 0.4);
      osc2.frequency.exponentialRampToValueAtTime(revTarget * 2, t + 0.4);
      filter.frequency.exponentialRampToValueAtTime(800 + Math.random() * 400, t + 0.4);

      // Settle down to idle with subtle burble
      osc1.frequency.exponentialRampToValueAtTime(baseFreq, t + 1.2);
      osc2.frequency.exponentialRampToValueAtTime(baseFreq * 2, t + 1.2);
      filter.frequency.exponentialRampToValueAtTime(450, t + 1.2);
    }, 2800);
  }

  suspend() {
    if (this.ctx && this.ctx.state === 'running') {
      this.ctx.suspend().catch(() => {});
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  stop(immediate = false) {
    if (!this.isPlaying && this.oscillators.length === 0 && this.pendingStopOscs.length === 0) return;
    this.isPlaying = false;

    if (this.revInterval) {
      clearInterval(this.revInterval);
      this.revInterval = null;
    }

    if (this.stopTimeout) {
      clearTimeout(this.stopTimeout);
      this.stopTimeout = null;
    }

    // Terminate any previous pending oscillators first
    if (this.pendingStopOscs.length > 0) {
      this.pendingStopOscs.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {}
      });
      this.pendingStopOscs = [];
    }
    if (this.pendingGain) {
      try {
        this.pendingGain.disconnect();
      } catch {}
      this.pendingGain = null;
    }

    const oscsToStop = this.oscillators;
    this.oscillators = [];
    const prevGain = this.gainNode;
    this.gainNode = null;

    if (immediate || !prevGain || !this.ctx) {
      oscsToStop.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {}
      });
      if (prevGain) {
        try {
          prevGain.disconnect();
        } catch {}
      }
      return;
    }

    // Smooth fade-out with guaranteed cleanup
    this.pendingStopOscs = oscsToStop;
    this.pendingGain = prevGain;

    try {
      const now = this.ctx.currentTime;
      prevGain.gain.cancelScheduledValues(now);
      prevGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
    } catch {}

    this.stopTimeout = setTimeout(() => {
      this.pendingStopOscs.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {}
      });
      this.pendingStopOscs = [];
      if (this.pendingGain) {
        try {
          this.pendingGain.disconnect();
        } catch {}
        this.pendingGain = null;
      }
      this.stopTimeout = null;
    }, 280);
  }

  makeDistortionCurve(amount = 20) {
    const k = amount;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }
}

export const engineAudio = new EngineAudioSystem();
